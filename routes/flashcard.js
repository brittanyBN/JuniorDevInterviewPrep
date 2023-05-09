const express = require('express');
const router = express.Router();
const db = require("../models");
const FlashcardService = require("../services/FlashcardService")
const flashcardService = new FlashcardService(db);
const authentication = require('../middleware/authentication');

router.get("/", authentication, async (req, res, next) => {
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
        const { question, answer, userId, flashcardSetId } = req.body;
        if(question === null) {
            return res.status(400).json({ message: 'Question is required.' });
        }
        if(answer === null) {
            return res.status(400).json({ message: 'Answer is required.' });
        }
        if(userId === null) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
        if(flashcardSetId === null) {
            return res.status(400).json({ message: 'Flashcard Set ID is required.' });
        }
        const flashcard = await flashcardService.create(question, answer, userId, flashcardSetId);
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
        const { question, answer, UserId, FlashcardSetId } = req.body;
        const flashcard = await flashcardService.update(req.params.id, req.body);
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