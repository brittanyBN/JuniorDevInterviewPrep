const express = require('express');
const router = express.Router();
const db = require("../models");
const FlashcardSetService = require("../services/FlashcardSetService")
const flashcardSetService = new FlashcardSetService(db);
const authentication = require('../middleware/authentication');

router.get("/", authentication, async (req, res, next) => {
    try {
        const flashcardSets = await flashcardSetService.getAll();
        res.status(200).json({
            "message": "Successfully fetched all flashcardSets",
            "data": flashcardSets
        });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authentication, async (req, res, next) => {
    try {
        const flashcardSet = await flashcardSetService.getOne(req.params.id);
        res.status(200).json({
            "message": "Successfully fetched flashcardSet",
            "data": flashcardSet
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", authentication , async (req, res, next) => {
    try {
        const { name, userId } = req.body;
        if(name === null) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if(userId === null) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
        const flashcardSet = await flashcardSetService.create(name, userId);
        res.status(200).json({
            "message": "Successfully created code challenge category",
            "data": flashcardSet
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", authentication, async (req, res, next) => {
    try {
        const flashcardSet = await flashcardSetService.update(req.params.id, req.body.name, req.body.userId);
        res.status(200).json({
            "message": "Successfully updated flashcardSet",
            "data": flashcardSet
        });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", authentication, async (req, res, next) => {
    try {
        const flashcardSet = await flashcardSetService.delete(req.params.id);
        res.status(200).json({
            "message": "Successfully deleted flashcardSet",
            "data": flashcardSet
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;