const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        console.log("=== V2: Starting generateInterViewReportController ===");
        console.log("File received:", req.file ? "Yes" : "No");
        
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const fileName = req.file.originalname.toLowerCase();
        console.log("File details:", {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            fileName: fileName
        });

        // Parse resume based on file type
        let resumeContent = "";
        
        // CHECK IF IT'S A WORD DOCUMENT
        const isWordDoc = fileName.endsWith('.docx') || 
                         fileName.endsWith('.doc') ||
                         req.file.mimetype.includes('word');
        
        console.log("Is Word document?", isWordDoc);
        
        try {
            if (isWordDoc) {
                console.log("PARSING AS WORD DOCUMENT...");
                const result = await mammoth.extractRawText({ buffer: req.file.buffer });
                resumeContent = result.value;
                console.log("WORD DOCUMENT PARSED SUCCESSFULLY, length:", resumeContent.length);
            } else {
                console.log("PARSING AS PDF...");
                const resumeData = await pdfParse(req.file.buffer);
                resumeContent = resumeData.text;
                console.log("PDF PARSED SUCCESSFULLY, length:", resumeContent.length);
            }

            if (!resumeContent || resumeContent.trim().length === 0) {
                return res.status(400).json({
                    message: "Could not extract any text from the uploaded file."
                });
            }
        } catch (parseError) {
            console.error("FILE PARSING ERROR:", parseError.message);
            return res.status(400).json({
                message: "Failed to parse file: " + parseError.message
            });
        }
        
        const { selfDescription, jobDescription } = req.body;
        
        if (!jobDescription || jobDescription.trim().length === 0) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        // Generate AI report
        console.log("Calling AI service...");
        let interViewReportByAi;
        try {
            interViewReportByAi = await generateInterviewReport({
                resume: resumeContent,
                selfDescription: selfDescription || "",
                jobDescription
            });
        } catch (aiError) {
            console.error("AI service error:", aiError);
            return res.status(500).json({
                message: "Failed to generate AI report",
                error: aiError.message
            });
        }

        let title = interViewReportByAi.title;
        if (!title || title.trim() === "") {
            const lines = jobDescription.split('\n');
            const firstLine = lines[0].trim();
            const titleMatch = jobDescription.match(/^(?:Job Title|Position|Role):?\s*(.+)$/im);
            title = titleMatch ? titleMatch[1].trim() : firstLine || "Interview Preparation Report";
        }

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
        
        let interviewReport;
        try {
            interviewReport = await interviewReportModel.create(interviewReportData);
            console.log("Report created with ID:", interviewReport._id);
        } catch (dbError) {
            console.error("Database error:", dbError);
            return res.status(500).json({
                message: "Failed to save report",
                error: dbError.message
            });
        }

        console.log("=== V2: Successfully generated report ===");
        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });
    } catch (error) {
        console.error("=== V2: Unhandled error ===");
        console.error(error);
        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({ 
            _id: interviewId, 
            user: req.user.id 
        })

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

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params
        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        const { resume, jobDescription, selfDescription } = interviewReport
        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (error) {
        res.status(500).json({ message: "Failed to generate resume PDF", error: error.message })
    }
}

module.exports = { 
    generateInterViewReportController, 
    getInterviewReportByIdController, 
    getAllInterviewReportsController, 
    generateResumePdfController 
}