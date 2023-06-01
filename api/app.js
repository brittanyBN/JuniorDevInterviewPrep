const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const codeChallengeRouter = require("./routes/codeChallenge");
const codeChallengeCategoryRouter = require("./routes/codeChallengeCategory");
const flashcardRouter = require("./routes/flashcard");
const flashcardSetRouter = require("./routes/flashcardSet");

require("dotenv").config();
const db = require("./models");
db.sequelize.sync({ force: false });

const app = express();

const corsOptions = {
  origin: process.env.CLIENT,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/home", indexRouter);
app.use("/", authRouter);
app.use("/codeChallenge", codeChallengeRouter);
app.use("/codeChallengeCategory", codeChallengeCategoryRouter);
app.use("/flashcard", flashcardRouter);
app.use("/flashcardSet", flashcardSetRouter);

module.exports = app;