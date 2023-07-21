const express = require("express");
const router = express.Router();
const db = require("../models");
const CodeChallengeService = require("../services/CodeChallengeService");
const codeChallengeService = new CodeChallengeService(db);
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");
const Joi = require("joi");
const codeChallengeSchema = require("../schemas/codeChallenge.schema");
const CodeChallengeCategoryService = require("../services/CodeChallengeCategoryService");
// const {executeCode} = require("../utils/executeCode");
const {executeJava} = require("../utils/executeJava");
const {executeCSharp} = require("../utils/executeCSharp");
const {executeJavascript} = require("../utils/executeJavascript");
const codeChallengeCategoryService = new CodeChallengeCategoryService(db);

router.get("/", authentication, async (req, res, next) => {
  try {
    const codeChallenges = await codeChallengeService.getAll();
    res.status(200).json({
      message: "Successfully fetched all code challenges",
      data: codeChallenges,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", authentication, async (req, res, next) => {
  try {
    const codeChallenge = await codeChallengeService.getOne(req.params.id);
    if (codeChallenge === null) {
      return res
        .status(400)
        .json({ message: "Code challenge does not exist." });
    }
    res.status(200).json({
      message: "Successfully fetched code challenge",
      data: codeChallenge,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", authorization, authentication, async (req, res, next) => {
  try {
    const {
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId,
    } = req.body;
    await codeChallengeSchema.validateAsync({
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId,
    });
    const category = await codeChallengeCategoryService.getOne(
      CodeChallengeCategoryId
    );
    if (category === null) {
      return res
        .status(400)
        .json({ message: "Code challenge category does not exist." });
    }
    const codeChallenge = await codeChallengeService.create(
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId
    );
    res.status(200).json({
      message: "Successfully created code challenge",
      data: codeChallenge,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/executeJavaScript", executeJavascript);
router.post("/executeJava", executeJava);
router.post("/executeCSharp", executeCSharp);
// router.post("language/:selectedLanguage", executeCode);

router.put("/:id", authorization, authentication, async (req, res, next) => {
  try {
    const {
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId,
    } = req.body;
    const id = req.params.id;
    await codeChallengeSchema.validateAsync({
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId,
    });
    const category = await codeChallengeCategoryService.getOne(
      CodeChallengeCategoryId
    );
    if (category === null) {
      return res
        .status(400)
        .json({ message: "Code challenge category does not exist." });
    }
    const codeChallenge = await codeChallengeService.update(
      id,
      question,
      solution,
      hint,
      betterSolution,
      CodeChallengeCategoryId
    );
    res.status(200).json({
      message: "Successfully updated code challenge",
      data: codeChallenge,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authorization, authentication, async (req, res, next) => {
  try {
    const codeChallenge = await codeChallengeService.delete(req.params.id);
    res.status(200).json({
      message: "Successfully deleted code challenge",
      data: codeChallenge,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
