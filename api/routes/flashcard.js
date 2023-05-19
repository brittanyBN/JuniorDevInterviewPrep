const express = require('express');
const router = express.Router();
const db = require("../models");
const FlashcardService = require("../services/FlashcardService")
const flashcardService = new FlashcardService(db);
const authentication = require('../middleware/authentication');
const Joi = require("joi");
const flashcardSchema = require('../schemas/flashcard.schema');
const UserService = require("../services/UserService");
const userService = new UserService(db);
const FlashcardSetService = require("../services/FlashcardSetService");
const flashcardSetService = new FlashcardSetService(db);

router.get("/", async (req, res, next) => {
    try {
        const flashcards = await flashcardService.getAll();
        res.status(200).json({
            "message": "Successfully fetched all flashcards",
            "data": flashcards
        });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authentication, async (req, res, next) => {
    try {
        const flashcard = await flashcardService.getOne(req.params.id);
        if (flashcard === null) {
            return res.status(400).json({ message: 'Flashcard does not exist.' });
        }
        res.status(200).json({
            "message": "Successfully fetched flashcard",
            "data": flashcard
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", authentication, async (req, res, next) => {
    try {
        const { question, answer, UserId, flashcardSetId } = req.body;
        await flashcardSchema.validateAsync({
            question,
            answer,
            UserId,
            flashcardSetId
        });
        const user = await userService.get(UserId);
        if(user === null) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
        const flashcardSet = await flashcardSetService.getOne(flashcardSetId);
        if(flashcardSet === null) {
            return res.status(400).json({ message: 'Flashcard set does not exist.' });
        }
        const flashcard = await flashcardService.create(question, answer, UserId, flashcardSetId);
        res.status(200).json({
            "message": "Successfully created flashcard",
            "data": flashcard
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", authentication, async (req, res, next) => {
    try {
        const id = req.params.id;
        const { question, answer, UserId, flashcardSetId } = req.body;
        await flashcardSchema.validateAsync({
            question,
            answer,
            UserId,
            flashcardSetId
        });
        const getFlashcard = await flashcardService.getOne(id);
        if(getFlashcard === null) {
            return res.status(400).json({ message: 'Flashcard does not exist.' });
        }
        const user = await userService.get(UserId);
        if(user === null) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
        const flashcardSet = await flashcardSetService.getOne(flashcardSetId);
        if(flashcardSet === null) {
            return res.status(400).json({ message: 'Flashcard set does not exist.' });
        }
        const flashcard = await flashcardService.update(id, question, answer, UserId, flashcardSetId);
        res.status(200).json({
            "message": "Successfully updated flashcard",
            "data": flashcard
        });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", authentication, async (req, res, next) => {
    try {
        const flashcard = await flashcardService.delete(req.params.id);
        if(!flashcard) {
            return res.status(400).json({ message: 'Flashcard does not exist.' });
        }
        res.status(200).json({
            "message": "Successfully deleted flashcard",
            "data": flashcard
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;