const express = require("express");
const router = express.Router();
const db = require("../models");
const CodeChallengeCategoryService = require("../services/CodeChallengeCategoryService");
const codeChallengeCategoryService = new CodeChallengeCategoryService(db);
const UserService = require("../services/UserService");
const userService = new UserService(db);
const authentication = require("../middleware/authentication");
const Joi = require("joi");
const codeChallengeCategorySchema = require("../schemas/codeChallengeCategory.schema");
const { getPagination } = require("../utils/getPagination");

router.get("/", authentication, async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const pagination = getPagination(page, size);
    const codeChallengeCategories = await codeChallengeCategoryService.getAll(pagination);
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

router.get("/:id", authentication, async (req, res, next) => {
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

router.post("/", authentication, async (req, res, next) => {
  try {
    const { name, UserId } = req.body;
    await codeChallengeCategorySchema.validateAsync({
      name,
      UserId,
    });
    const user = await userService.get(UserId);
    if (user === null) {
      return res.status(400).json({
        data: user,
        message: "User does not exist."
      });
    }
    const codeChallengeCategory = await codeChallengeCategoryService.create(
      name,
      UserId
    );
    console.log("Code Challenge Category: ", codeChallengeCategory);
    res.status(200).json({
      message: "Successfully created code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authentication, async (req, res, next) => {
  try {
    const { name, UserId } = req.body;
    const id = req.params.id;
    await codeChallengeCategorySchema.validateAsync({
      name,
      UserId,
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
      UserId
    );
    res.status(200).json({
      message: "Successfully updated code challenge category",
      data: codeChallengeCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authentication, async (req, res, next) => {
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
