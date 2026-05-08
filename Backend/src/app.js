const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin: "https://skill-match-r97rw7etb-aaditya-jains-projects-086b948d.vercel.app",
   credentials: true
}));

/* require all the routes here */
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.routes")

app.get("/", (req, res) => {
   res.send("Backend is running successfully");
});
/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app