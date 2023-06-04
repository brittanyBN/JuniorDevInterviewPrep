const express = require("express");
const router = express.Router();
const db = require("../models");
const CodeChallengeService = require("../services/CodeChallengeService");
const codeChallengeService = new CodeChallengeService(db);
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const Joi = require("joi");
const codeChallengeSchema = require("../schemas/codeChallenge.schema");
const UserService = require("../services/UserService");
const userService = new UserService(db);
const CodeChallengeCategoryService = require("../services/CodeChallengeCategoryService");
const { executeCode } = require("../utils/executeCode");
const codeChallengeCategoryService = new CodeChallengeCategoryService(db);

router.get("/", async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
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

router.post("/", authentication, async (req, res, next) => {
  try {
    const {
      question,
      solution,
      hint,
      progress,
      betterSolution,
      UserId,
      CodeChallengeCategoryId,
    } = req.body;
    await codeChallengeSchema.validateAsync({
      question,
      solution,
      hint,
      progress,
      betterSolution,
      UserId,
      CodeChallengeCategoryId,
    });
    const user = await userService.get(UserId);
    if (user === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
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
      progress,
      betterSolution,
      UserId,
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

router.post("/execute", executeCode);

router.put("/:id", authentication, async (req, res, next) => {
  try {
    const {
      question,
      solution,
      hint,
      progress,
      betterSolution,
      UserId,
      CodeChallengeCategoryId,
    } = req.body;
    const id = req.params.id;
    await codeChallengeSchema.validateAsync({
      question,
      solution,
      hint,
      progress,
      betterSolution,
      UserId,
      CodeChallengeCategoryId,
    });
    const user = await userService.get(UserId);
    if (user === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
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
      progress,
      betterSolution,
      UserId,
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

router.delete("/:id", authentication, async (req, res, next) => {
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
