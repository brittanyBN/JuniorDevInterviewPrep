const express = require("express");
const router = express.Router();
const db = require("../models");
const FlashcardSetService = require("../services/FlashcardSetService");
const flashcardSetService = new FlashcardSetService(db);
const UserService = require("../services/UserService");
const userService = new UserService(db);
const Joi = require("joi");
const flashcardSetSchema = require("../schemas/flashcardSet.schema");
const { getPagination } = require("../utils/getPagination");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

router.get("/set", async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.id
    console.log(userId);
    const pagination = getPagination(page, size);
    const condition = {
      [Op.or]: [{ "$User.role$": "admin" }, { UserId: userId }],
    };
    const flashcardSets = await flashcardSetService.getAll(
        pagination,
        condition
    );

    const totalCount = await flashcardSetService.countAll(condition);
    pagination.totalPages = Math.ceil(totalCount / pagination.limit);

    res.status(200).json({
      message: "Successfully fetched all flashcardSets",
      data: flashcardSets,
      pagination: pagination,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/list/:id", async (req, res, next) => {
  try {
    const flashcardSet = await flashcardSetService.getOne(req.params.id);
    if (flashcardSet === null) {
      return res.status(400).json({ message: "Flashcard set does not exist." });
    }
    res.status(200).json({
      message: "Successfully fetched flashcardSet",
      data: flashcardSet,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, UserId } = req.body;
    await flashcardSetSchema.validateAsync({
      name,
      UserId,
    });
    const validateUser = await userService.get(UserId);
    if (validateUser === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const flashcardSet = await flashcardSetService.create(name, UserId);
    res.status(200).json({
      message: "Successfully created code challenge category",
      data: flashcardSet,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, UserId } = req.body;
    const id = req.params.id;
    await flashcardSetSchema.validateAsync({
      name,
      UserId,
    });
    const flashcardSetCheck = await flashcardSetService.getOne(id);
    if (flashcardSetCheck === null) {
      return res.status(400).json({ message: "Flashcard set does not exist." });
    }
    const validateUser = await userService.get(UserId);
    if (validateUser === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const flashcardSet = await flashcardSetService.update(id, name, UserId);
    res.status(200).json({
      message: "Successfully updated flashcardSet",
      data: flashcardSet,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const flashcardSet = await flashcardSetService.delete(req.params.id);
    if (flashcardSet === null) {
      return res.status(400).json({ message: "Flashcard set does not exist." });
    }
    res.status(200).json({
      message: "Successfully deleted flashcardSet",
      data: flashcardSet,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
