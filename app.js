let cors = require("cors")
let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")

let indexRouter = require("./routes/index")
let usersRouter = require("./routes/users")

let app = express()
const stories = require("./routes/stories")
const comments = require("./routes/comments")

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use("/", indexRouter)
app.use("/users", usersRouter)

app.get("/stories", stories.findAll)
app.get("/stories/:id", stories.findOne)
app.get("/mystories/:username", stories.findMyStory)
app.get("/stories/find/:keyword", stories.fuzzySearch)
app.get("/comments/:id", comments.findCommentWithStory)

app.put("/stories/:id/upvote", stories.incrementUpvotes)
app.put("/stories/:id/downvote", stories.incrementDownvotes) // the same test as up-vote
app.put("/stories/:id/addComment", comments.addComment)

app.post("/stories", stories.addStory)
app.post("/edit/:id", stories.editStory) // not test
app.post("/reg", indexRouter.register_user)
app.post("/login", indexRouter.login_user)

app.delete("/stories/:id", stories.deleteStory)
app.delete("/comments/:story/:id", comments.deleteComment) // not test

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"))
}
module.exports = app
