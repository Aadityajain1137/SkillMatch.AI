const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        console.log("=== Starting generateInterViewReportController ===");
        console.log("Request body:", req.body);
        console.log("File received:", req.file ? "Yes" : "No");
        
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        console.log("File details:", {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        // Parse PDF
        let resumeContent = "";
        try {
            console.log("Parsing PDF...");
            const resumeData = await pdfParse(req.file.buffer);
            resumeContent = resumeData.text;
            console.log("PDF parsed successfully, length:", resumeContent.length);
        } catch (pdfError) {
            console.error("PDF parsing error:", pdfError);
            return res.status(400).json({
                message: "Failed to parse PDF file. Please ensure it's a valid PDF.",
                error: pdfError.message
            });
        }
        
        const { selfDescription, jobDescription } = req.body;
        console.log("selfDescription length:", selfDescription?.length || 0);
        console.log("jobDescription length:", jobDescription?.length || 0);

        // Validate job description
        if (!jobDescription) {
            console.log("Missing job description");
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        // Generate AI report
        console.log("Calling AI service to generate report...");
        let interViewReportByAi;
        try {
            interViewReportByAi = await generateInterviewReport({
                resume: resumeContent,
                selfDescription: selfDescription || "",
                jobDescription
            });
            console.log("AI response received:", JSON.stringify(interViewReportByAi, null, 2));
        } catch (aiError) {
            console.error("AI service error:", aiError);
            return res.status(500).json({
                message: "Failed to generate AI report",
                error: aiError.message
            });
        }

        // Ensure title exists
        let title = interViewReportByAi.title;
        if (!title || title.trim() === "") {
            console.log("Title missing, extracting from job description...");
            // Extract title from job description
            const lines = jobDescription.split('\n');
            const firstLine = lines[0].trim();
            // Look for common title patterns
            const titleMatch = jobDescription.match(/^(?:Job Title|Position|Role):?\s*(.+)$/im);
            title = titleMatch ? titleMatch[1].trim() : firstLine || "Interview Preparation Report";
            console.log("Extracted title:", title);
        }

        // Create interview report
        console.log("Creating interview report in database...");
        const interviewReportData = {
            user: req.user.id,
            resume: resumeContent,
            selfDescription: selfDescription || "",
            jobDescription,
            title: title,
            matchScore: interViewReportByAi.matchScore || 0,
            technicalQuestions: interViewReportByAi.technicalQuestions || [],
            behavioralQuestions: interViewReportByAi.behavioralQuestions || [],
            skillGaps: interViewReportByAi.skillGaps || [],
            preparationPlan: interViewReportByAi.preparationPlan || []
        };
        
        console.log("Report data keys:", Object.keys(interviewReportData));
        
        let interviewReport;
        try {
            interviewReport = await interviewReportModel.create(interviewReportData);
            console.log("Report created successfully with ID:", interviewReport._id);
        } catch (dbError) {
            console.error("Database error:", dbError);
            return res.status(500).json({
                message: "Failed to save report to database",
                error: dbError.message,
                details: dbError.errors
            });
        }

        console.log("=== Successfully generated report ===");
        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });
    } catch (error) {
        console.error("=== Unhandled error in generateInterViewReportController ===");
        console.error(error);
        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message,
            stack: error.stack
        });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch report", error: error.message })
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reports", error: error.message })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }