const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { auth } = require("express-openid-connect");

const authRouter = require("./routes/auth");
const codeChallengeRouter = require("./routes/codeChallenge");
const codeChallengeCategoryRouter = require("./routes/codeChallengeCategory");
const flashcardRouter = require("./routes/flashcard");
const flashcardSetRouter = require("./routes/flashcardSet");
const programLanguageRouter = require("./routes/programLanguage");

require("dotenv").config();
const db = require("./models");
db.sequelize.sync({ force: false });

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientSecret: process.env.CLIENT_SECRET,
};

const corsOptions = {
  origin: process.env.CLIENT,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/codeChallenges", codeChallengeRouter);
app.use("/programLanguage", programLanguageRouter);
app.use(
  auth({
    authRequired: false,
    authorizationParams: {
      response_type: "code",
      audience: process.env.AUTH0_AUDIENCE,
      scope: "openid read:flashcardSets",
    },
  })
);
app.use("/codeChallengeCategories", codeChallengeCategoryRouter);
app.use("/flashcards", flashcardRouter);
app.use("/flashcardSets", flashcardSetRouter);

module.exports = app;
