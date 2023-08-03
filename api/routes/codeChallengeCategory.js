const express = require("express");
const router = express.Router();
const db = require("../models");
const CodeChallengeCategoryService = require("../services/CodeChallengeCategoryService");
const codeChallengeCategoryService = new CodeChallengeCategoryService(db);
const UserService = require("../services/UserService");
const userService = new UserService(db);
const authorization = require("../middleware/authorization");
const codeChallengeCategorySchema = require("../schemas/codeChallengeCategory.schema");
const { getPagination } = require("../utils/getPagination");

router.get("/", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const pagination = getPagination(page, size);
    const codeChallengeCategories = await codeChallengeCategoryService.getAll(
      pagination
    );
    const totalCount = await codeChallengeCategoryService.countAll();
    pagination.totalPages = Math.ceil(totalCount / pagination.limit);
    res.status(200).json({
      message: "Successfully fetched all code challenge categories",
      data: codeChallengeCategories,
      pagination: pagination,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/language/:programLanguageId", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const pagination = getPagination(page, size);
    const programLanguageId = req.params.programLanguageId;
    const codeChallengeCategories =
      await codeChallengeCategoryService.getByLanguage(
        pagination,
        programLanguageId
      );
    const totalCount = await codeChallengeCategoryService.countAll();
    pagination.totalPages = Math.ceil(totalCount / pagination.limit);
    res.status(200).json({
      message: "Successfully fetched all code challenge categories",
      data: codeChallengeCategories,
      pagination: pagination,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const codeChallengeCategory = await codeChallengeCategoryService.getOne(
      req.params.id
    );
    if (codeChallengeCategory === null) {
      return res
        .status(400)
        .json({ message: "Code challenge category does not exist." });
    }
    res.status(200).json({
      message: "Successfully fetched code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", authorization, async (req, res, next) => {
  try {
    const { name, UserId, ProgramLanguageId } = req.body;
    await codeChallengeCategorySchema.validateAsync({
      name,
      UserId,
      ProgramLanguageId,
    });
    const user = await userService.get(UserId);
    if (user === null) {
      return res.status(400).json({
        data: user,
        message: "User does not exist.",
      });
    }
    const codeChallengeCategory = await codeChallengeCategoryService.create(
      name,
      UserId,
      ProgramLanguageId
    );
    res.status(200).json({
      message: "Successfully created code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authorization, async (req, res, next) => {
  try {
    const { name, UserId, ProgramLanguageId } = req.body;
    const id = req.params.id;
    await codeChallengeCategorySchema.validateAsync({
      name,
      UserId,
      ProgramLanguageId,
    });
    const user = await userService.get(UserId);
    if (user === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const category = await codeChallengeCategoryService.getOne(id);
    if (category === null) {
      return res
        .status(400)
        .json({ message: "Code challenge category does not exist." });
    }
    const codeChallengeCategory = await codeChallengeCategoryService.update(
      id,
      name,
      UserId,
      ProgramLanguageId
    );
    res.status(200).json({
      message: "Successfully updated code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authorization, async (req, res, next) => {
  try {
    const codeChallengeCategory = await codeChallengeCategoryService.delete(
      req.params.id
    );
    if (codeChallengeCategory === null) {
      return res
        .status(400)
        .json({ message: "Code challenge category does not exist." });
    }
    res.status(200).json({
      message: "Successfully deleted code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
