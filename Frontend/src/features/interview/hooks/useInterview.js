import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            const newReport = response.interviewReport
            setReport(newReport)
            // Add the new report to the beginning of reports list
            setReports(prevReports => [newReport, ...prevReports])
            return newReport
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (id) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(id)
            const fetchedReport = response.interviewReport
            setReport(fetchedReport)
            return fetchedReport
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            const allReports = response.interviewReports
            setReports(allReports)
            return allReports
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch reports only when on home page (no interviewId)
    useEffect(() => {
        if (!interviewId) {
            getReports()
        }
    }, [interviewId])

    // Fetch specific report when interviewId changes
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports, 
        getResumePdf 
    }
}