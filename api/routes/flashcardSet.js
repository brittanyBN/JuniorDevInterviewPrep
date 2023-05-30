const express = require("express");
const router = express.Router();
const db = require("../models");
const FlashcardSetService = require("../services/FlashcardSetService");
const flashcardSetService = new FlashcardSetService(db);
const authentication = require("../middleware/authentication");
const UserService = require("../services/UserService");
const userService = new UserService(db);
const Joi = require("joi");
const flashcardSetSchema = require("../schemas/flashcardSet.schema");

router.get("/", async (req, res, next) => {
  try {
    const flashcardSets = await flashcardSetService.getAll();
    res.status(200).json({
      message: "Successfully fetched all flashcardSets",
      data: flashcardSets,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/admin", async (req, res, next) => {
    try {
        const flashcardSets = await flashcardSetService.getAllAdmin();
        res.status(200).json({
        message: "Successfully fetched all flashcardSets",
        data: flashcardSets,
        });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authentication, async (req, res, next) => {
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

router.post("/", authentication, async (req, res, next) => {
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

router.put("/:id", authentication, async (req, res, next) => {
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

// router.post("/saveSet", authentication, async (req, res, next) => {
// const { flashcardId, userId } = req.body;
// try {
//   const flashcardSet = await flashcardSetService.addUsersToFlashcardSet(flashcardId, userId);
//   res.status(200).json({
//     message: "Successfully saved flashcardSet",
//     data: flashcardSet,
//   });
// } catch (err) {
//   next(err);
// }
// });


router.delete("/:id", authentication, async (req, res, next) => {
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
