

// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// // Function to validate AI response structure
// function validateAIResponse(response) {
//     // Check if all required fields exist and are arrays
//     if (!response.matchScore || typeof response.matchScore !== 'number') {
//         throw new Error("Invalid matchScore in AI response");
//     }
    
//     if (!Array.isArray(response.technicalQuestions) || response.technicalQuestions.length === 0) {
//         throw new Error("Invalid or empty technicalQuestions in AI response");
//     }
    
//     if (!Array.isArray(response.behavioralQuestions) || response.behavioralQuestions.length === 0) {
//         throw new Error("Invalid or empty behavioralQuestions in AI response");
//     }
    
//     if (!Array.isArray(response.skillGaps) || response.skillGaps.length === 0) {
//         throw new Error("Invalid or empty skillGaps in AI response");
//     }
    
//     if (!Array.isArray(response.preparationPlan) || response.preparationPlan.length === 0) {
//         throw new Error("Invalid or empty preparationPlan in AI response");
//     }
    
//     // Validate each technical question has required fields
//     for (const q of response.technicalQuestions) {
//         if (!q.question || !q.intention || !q.answer) {
//             throw new Error("Technical question missing required fields");
//         }
//     }
    
//     // Validate each behavioral question has required fields
//     for (const q of response.behavioralQuestions) {
//         if (!q.question || !q.intention || !q.answer) {
//             throw new Error("Behavioral question missing required fields");
//         }
//     }
    
//     // Validate each skill gap has required fields
//     for (const gap of response.skillGaps) {
//         if (!gap.skill || !gap.severity || !['low', 'medium', 'high'].includes(gap.severity)) {
//             throw new Error("Skill gap missing required fields or invalid severity");
//         }
//     }
    
//     // Validate each preparation plan day has required fields
//     for (const plan of response.preparationPlan) {
//         if (!plan.day || !plan.focus || !Array.isArray(plan.tasks) || plan.tasks.length === 0) {
//             throw new Error("Preparation plan missing required fields");
//         }
//     }
    
//     return true;
// }

// // Function to transform malformed AI response into proper format
// function transformAIResponse(rawResponse) {
//     try {
//         // If the response is already in correct format, validate and return it
//         if (Array.isArray(rawResponse.technicalQuestions) && 
//             rawResponse.technicalQuestions.length > 0 && 
//             typeof rawResponse.technicalQuestions[0] === 'object') {
//             validateAIResponse(rawResponse);
//             return rawResponse;
//         }
        
//         console.log("Transforming malformed AI response...");
        
//         // Transform technical questions
//         const transformedTechnical = [];
//         if (Array.isArray(rawResponse.technicalQuestions)) {
//             for (let i = 0; i < rawResponse.technicalQuestions.length; i += 3) {
//                 if (rawResponse.technicalQuestions[i + 2]) {
//                     transformedTechnical.push({
//                         question: rawResponse.technicalQuestions[i + 1] || "",
//                         intention: rawResponse.technicalQuestions[i + 2] || "",
//                         answer: rawResponse.technicalQuestions[i + 3] || ""
//                     });
//                 }
//             }
//         }
        
//         // Transform behavioral questions
//         const transformedBehavioral = [];
//         if (Array.isArray(rawResponse.behavioralQuestions)) {
//             for (let i = 0; i < rawResponse.behavioralQuestions.length; i += 3) {
//                 if (rawResponse.behavioralQuestions[i + 2]) {
//                     transformedBehavioral.push({
//                         question: rawResponse.behavioralQuestions[i + 1] || "",
//                         intention: rawResponse.behavioralQuestions[i + 2] || "",
//                         answer: rawResponse.behavioralQuestions[i + 3] || ""
//                     });
//                 }
//             }
//         }
        
//         // Transform skill gaps
//         const transformedSkillGaps = [];
//         if (Array.isArray(rawResponse.skillGaps)) {
//             for (let i = 0; i < rawResponse.skillGaps.length; i += 2) {
//                 if (rawResponse.skillGaps[i + 1]) {
//                     transformedSkillGaps.push({
//                         skill: rawResponse.skillGaps[i] || "",
//                         severity: (rawResponse.skillGaps[i + 1] || "medium").toLowerCase()
//                     });
//                 }
//             }
//         }
        
//         // Transform preparation plan
//         const transformedPlan = [];
//         if (Array.isArray(rawResponse.preparationPlan)) {
//             rawResponse.preparationPlan.forEach((item, index) => {
//                 if (typeof item === 'string') {
//                     transformedPlan.push({
//                         day: index + 1,
//                         focus: item.split(':')[0] || `Day ${index + 1}`,
//                         tasks: [item]
//                     });
//                 } else if (typeof item === 'object') {
//                     transformedPlan.push(item);
//                 }
//             });
//         }
        
//         const transformedResponse = {
//             matchScore: rawResponse.matchScore || 0,
//             title: rawResponse.title || "",
//             technicalQuestions: transformedTechnical,
//             behavioralQuestions: transformedBehavioral,
//             skillGaps: transformedSkillGaps,
//             preparationPlan: transformedPlan
//         };
        
//         // Validate transformed response
//         validateAIResponse(transformedResponse);
//         return transformedResponse;
        
//     } catch (error) {
//         console.error("Error transforming response:", error);
//         throw new Error(`Failed to transform AI response: ${error.message}`);
//     }
// }

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     console.log("AI Service: Generating report...");
    
//     const prompt = `Generate an interview report for a candidate with the following details:
// Resume: ${resume || "Not provided"}
// Self Description: ${selfDescription || "Not provided"}
// Job Description: ${jobDescription}

// IMPORTANT: Return the response as a JSON object with EXACTLY this structure:
// {
//   "matchScore": 75,
//   "title": "Job Title Here",
//   "technicalQuestions": [
//     {
//       "question": "Question text here",
//       "intention": "Why this question is asked",
//       "answer": "How to answer this question"
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Question text here",
//       "intention": "Why this question is asked",
//       "answer": "How to answer this question"
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "Skill name",
//       "severity": "high"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "Focus area",
//       "tasks": ["Task 1", "Task 2"]
//     }
//   ]
// }

// Make sure each question is an object with question, intention, and answer fields. Do not flatten the arrays.
// Provide at least 5 technical questions and 5 behavioral questions.`

//     // Correct model names for Google GenAI API
//    const modelsToTry = [
//     "gemini-2.5-flash",
//     "gemini-2.0-flash",
//     "gemini-1.5-flash"
// ]
    
//     let lastError = null;
    
//     for (const model of modelsToTry) {
//         try {
//             console.log(`Trying model: ${model}`);
//             const response = await ai.models.generateContent({
//                 model: model,
//                 contents: prompt,
//                 config: {
//                     responseMimeType: "application/json",
//                     temperature: 0.7,
//                     maxOutputTokens: 8192,
//                 }
//             });
            
//             const parsedResponse = JSON.parse(response.text);
//             console.log(`Success with model: ${model}`);
            
//             // Transform and validate the response
//             const transformedResponse = transformAIResponse(parsedResponse);
            
//             console.log("AI response validated successfully");
//             return transformedResponse;
            
//         } catch (error) {
//             console.log(`Model ${model} failed:`, error.message);
//             lastError = error;
//             // Continue to next model
//         }
//     }
    
//     // If all models fail, throw error
//     throw new Error(`All AI models failed to generate valid report. Last error: ${lastError?.message}`);
// }

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", 
//         margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         },
//         printBackground: true
//     })

//     await browser.close()
//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {
//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: zodToJsonSchema(resumePdfSchema),
//                 temperature: 0.7,
//                 maxOutputTokens: 8192,
//             }
//         });

//         const jsonContent = JSON.parse(response.text);
        
//         if (!jsonContent.html) {
//             throw new Error("AI response missing html field");
//         }
        
//         const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
//         return pdfBuffer;
//     } catch (error) {
//         console.error("Resume PDF generation error:", error);
//         throw new Error(`Failed to generate resume PDF: ${error.message}`);
//     }
// }

// module.exports = { generateInterviewReport, generateResumePdf }











const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const html_to_pdf = require("html-pdf-node")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// ---------------------------------------------------------------------------
// Retry helper — waits `delayMs` before resolving
// ---------------------------------------------------------------------------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Validation — uses typeof check for matchScore so 0 is valid
// ---------------------------------------------------------------------------
function validateAIResponse(response) {
    if (typeof response.matchScore !== "number") {
        throw new Error("Invalid matchScore in AI response")
    }

    if (!Array.isArray(response.technicalQuestions) || response.technicalQuestions.length === 0) {
        throw new Error("Invalid or empty technicalQuestions in AI response")
    }

    if (!Array.isArray(response.behavioralQuestions) || response.behavioralQuestions.length === 0) {
        throw new Error("Invalid or empty behavioralQuestions in AI response")
    }

    if (!Array.isArray(response.skillGaps) || response.skillGaps.length === 0) {
        throw new Error("Invalid or empty skillGaps in AI response")
    }

    if (!Array.isArray(response.preparationPlan) || response.preparationPlan.length === 0) {
        throw new Error("Invalid or empty preparationPlan in AI response")
    }

    for (const q of response.technicalQuestions) {
        if (!q.question || !q.intention || !q.answer) {
            throw new Error("Technical question missing required fields")
        }
    }

    for (const q of response.behavioralQuestions) {
        if (!q.question || !q.intention || !q.answer) {
            throw new Error("Behavioral question missing required fields")
        }
    }

    for (const gap of response.skillGaps) {
        if (!gap.skill || !["low", "medium", "high"].includes(gap.severity)) {
            throw new Error("Skill gap missing required fields or invalid severity")
        }
    }

    for (const plan of response.preparationPlan) {
        if (!plan.day || !plan.focus || !Array.isArray(plan.tasks) || plan.tasks.length === 0) {
            throw new Error("Preparation plan missing required fields")
        }
    }

    return true
}

// ---------------------------------------------------------------------------
// Transform — handles flattened / malformed AI responses
// BUG FIX: original code started at i+1 and used i+3 for answer (off-by-one).
//          Correct offsets for a flat [question, intention, answer, ...] array
//          are i+0, i+1, i+2.
// ---------------------------------------------------------------------------
function transformAIResponse(rawResponse) {
    try {
        // Happy path — already well-structured
        if (
            Array.isArray(rawResponse.technicalQuestions) &&
            rawResponse.technicalQuestions.length > 0 &&
            typeof rawResponse.technicalQuestions[0] === "object"
        ) {
            validateAIResponse(rawResponse)
            return rawResponse
        }

        console.log("Transforming malformed AI response...")

        const transformQuestions = (arr) => {
            const result = []
            if (!Array.isArray(arr)) return result
            for (let i = 0; i + 2 < arr.length; i += 3) {   // FIX: i+0, i+1, i+2
                result.push({
                    question: arr[i]     || "",
                    intention: arr[i + 1] || "",
                    answer:    arr[i + 2] || "",
                })
            }
            return result
        }

        const transformSkillGaps = (arr) => {
            const result = []
            if (!Array.isArray(arr)) return result
            for (let i = 0; i + 1 < arr.length; i += 2) {
                result.push({
                    skill:    arr[i]     || "",
                    severity: (arr[i + 1] || "medium").toLowerCase(),
                })
            }
            return result
        }

        const transformPlan = (arr) => {
            if (!Array.isArray(arr)) return []
            return arr.map((item, index) => {
                if (typeof item === "string") {
                    return {
                        day:   index + 1,
                        focus: item.split(":")[0] || `Day ${index + 1}`,
                        tasks: [item],
                    }
                }
                return item   // already an object
            })
        }

        const transformedResponse = {
            matchScore:          rawResponse.matchScore ?? 0,  // FIX: ?? keeps 0 valid
            title:               rawResponse.title || "",
            technicalQuestions:  transformQuestions(rawResponse.technicalQuestions),
            behavioralQuestions: transformQuestions(rawResponse.behavioralQuestions),
            skillGaps:           transformSkillGaps(rawResponse.skillGaps),
            preparationPlan:     transformPlan(rawResponse.preparationPlan),
        }

        validateAIResponse(transformedResponse)
        return transformedResponse

    } catch (error) {
        console.error("Error transforming response:", error)
        throw new Error(`Failed to transform AI response: ${error.message}`)
    }
}

// ---------------------------------------------------------------------------
// Core single-call helper — throws on any failure
// ---------------------------------------------------------------------------
async function callGemini(model, prompt) {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.4,   // lower = more deterministic scoring, less "safe middle" bias
            maxOutputTokens: 8192,
        },
    })
    const parsed = JSON.parse(response.text)
    return transformAIResponse(parsed)
}

// ---------------------------------------------------------------------------
// generateInterviewReport — retries each model N times before moving on
// ---------------------------------------------------------------------------
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    console.log("AI Service: Generating report...")

    const prompt = `You are an expert technical recruiter. Analyze the candidate's resume and self-description against the job description, then generate a detailed interview preparation report.

---
CANDIDATE RESUME:
${resume || "Not provided"}

CANDIDATE SELF-DESCRIPTION:
${selfDescription || "Not provided"}

JOB DESCRIPTION:
${jobDescription}
---

STEP 1 — MATCH SCORE CALCULATION (be strict and realistic):
Before generating the JSON, internally assess:
- How many of the required technical skills does the candidate have? (40% weight)
- How relevant is the candidate's past experience to this role? (30% weight)
- How well does the candidate's seniority/level match the role? (20% weight)
- How well does the candidate's domain/industry match? (10% weight)

Use this rubric for the final matchScore integer (0-100):
  90-100 → Candidate meets almost ALL requirements with strong, directly relevant experience
  70-89  → Candidate meets MOST requirements but has 1-2 notable gaps
  50-69  → Candidate meets roughly HALF the requirements; several gaps exist
  30-49  → Candidate meets FEW requirements; significant skill or experience gaps
  0-29   → Candidate is poorly matched; core required skills are missing

Be strict. Do NOT default to the middle. A frontend developer applying for an embedded C++ role should score below 20. A perfect match should score above 90.

STEP 2 — Generate the JSON report with this EXACT structure (no extra fields, no example values):
{
  "matchScore": <calculated integer 0-100, NOT a placeholder>,
  "title": "<exact job title extracted from the job description>",
  "technicalQuestions": [
    {
      "question": "<specific technical question tailored to this JD and resume>",
      "intention": "<what the interviewer wants to assess with this question>",
      "answer": "<detailed guidance on how to answer: key points, approach, frameworks>"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "<behavioral question relevant to this role>",
      "intention": "<what the interviewer wants to assess>",
      "answer": "<how to answer using STAR method with relevant examples>"
    }
  ],
  "skillGaps": [
    {
      "skill": "<specific skill the candidate is missing or weak in>",
      "severity": "<'high' if it's a core requirement | 'medium' if important but not critical | 'low' if nice-to-have>"
    }
  ],
  "preparationPlan": [
    {
      "day": <day number starting from 1>,
      "focus": "<main topic for this day>",
      "tasks": ["<specific actionable task>", "<another task>"]
    }
  ]
}

RULES:
- matchScore MUST reflect actual analysis — never use 75 as a default
- Provide exactly 5 technical questions and 5 behavioral questions
- Provide at least 3 skill gaps (or fewer only if the candidate is a near-perfect match)
- Preparation plan should cover 7 days
- All questions must be specific to THIS job and THIS candidate's background
- Do NOT flatten arrays — each item must be an object with the fields shown above`

    // Model priority list — each model is tried up to RETRIES_PER_MODEL times
    // before falling through to the next one.
    const MODELS = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
    ]
    const RETRIES_PER_MODEL = 3          // attempts per model
    const RETRY_DELAY_MS    = 2000       // wait between retries (ms)
    const FALLBACK_DELAY_MS = 1000       // wait before trying next model (ms)

    let lastError = null

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= RETRIES_PER_MODEL; attempt++) {
            try {
                console.log(`[${model}] Attempt ${attempt}/${RETRIES_PER_MODEL}...`)
                const result = await callGemini(model, prompt)
                console.log(`[${model}] Success on attempt ${attempt}`)
                return result
            } catch (error) {
                lastError = error
                console.warn(`[${model}] Attempt ${attempt} failed: ${error.message}`)

                const isLastAttemptForModel = attempt === RETRIES_PER_MODEL
                if (!isLastAttemptForModel) {
                    // Exponential back-off: 2s, 4s, 6s …
                    const delay = RETRY_DELAY_MS * attempt
                    console.log(`Retrying in ${delay}ms...`)
                    await sleep(delay)
                }
            }
        }

        console.log(`All ${RETRIES_PER_MODEL} attempts exhausted for [${model}]. Trying next model...`)
        await sleep(FALLBACK_DELAY_MS)
    }

    throw new Error(`All AI models failed to generate a valid report. Last error: ${lastError?.message}`)
}

// ---------------------------------------------------------------------------
// PDF helpers (unchanged logic, minor clean-up)
// ---------------------------------------------------------------------------
// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//   headless: true,
//   args: ["--no-sandbox", "--disable-setuid-sandbox"],
// });
//     const page = await browser.newPage()
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4",
//         margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
//         printBackground: true,
//     })

//     await browser.close()
//     return pdfBuffer
// }
async function generatePdfFromHtml(htmlContent) {

    let options = {
        format: "A4",
        printBackground: true,
    };

    let file = {
        content: htmlContent,
    };

    const pdfBuffer = await html_to_pdf.generatePdf(file, options);

    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer"),
    })

    const prompt = `Generate resume for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

The response should be a JSON object with a single field "html" which contains the HTML content of the resume.
The resume should be tailored for the given job description and highlight the candidate's strengths and relevant experience.
The HTML content should be well-formatted, structured, and visually appealing.
The content should not sound AI-generated and should read like a real human-written resume.
You can use colors or different font styles but the overall design should be simple and professional.
The content should be ATS friendly and easily parsable without losing important information.
The resume should ideally be 1-2 pages when converted to PDF. Focus on quality over quantity.`

    const RETRIES = 3
    let lastError = null

    for (let attempt = 1; attempt <= RETRIES; attempt++) {
        try {
            console.log(`[Resume PDF] Attempt ${attempt}/${RETRIES}...`)
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: zodToJsonSchema(resumePdfSchema),
                    temperature: 0.7,
                    maxOutputTokens: 8192,
                },
            })

            const jsonContent = JSON.parse(response.text)
            if (!jsonContent.html) throw new Error("AI response missing html field")

            const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
            console.log(`[Resume PDF] Success on attempt ${attempt}`)
            return pdfBuffer

        } catch (error) {
            lastError = error
            console.warn(`[Resume PDF] Attempt ${attempt} failed: ${error.message}`)
            if (attempt < RETRIES) await sleep(2000 * attempt)
        }
    }

    throw new Error(`Failed to generate resume PDF after ${RETRIES} attempts. Last error: ${lastError?.message}`)
}

module.exports = { generateInterviewReport, generateResumePdf }