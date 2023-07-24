const express = require("express");
const router = express.Router();
const db = require("../models");
const ProgramLanguageService = require("../services/ProgramLanguageService");
const programLanguageService = new ProgramLanguageService(db);

router.get("/", async (req, res, next) => {
    try {
        const programLanguage = await programLanguageService.getAll();
        res.status(200).json({
            message: "Successfully fetched all programming languages",
            data: programLanguage,
        });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const programLanguage = await programLanguageService.getOne(req.params.id);
        if (programLanguage === null) {
            return res
                .status(400)
                .json({ message: "Programming language does not exist." });
        }
        res.status(200).json({
            message: "Successfully fetched programming language",
            data: programLanguage,
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const {
            language
        } = req.body;
        const programLanguage = await programLanguageService.create(
            language
        );
        res.status(200).json({
            message: "Successfully created programming language",
            data: programLanguage,
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:id",async (req, res, next) => {
    try {
        const {
            language
        } = req.body;
        const id = req.params.id;
        const programLanguage = await programLanguageService.update(
            id,
            language
        );
        res.status(200).json({
            message: "Successfully updated programming language",
            data: programLanguage,
        });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const programLanguage = await programLanguageService.delete(req.params.id);
        res.status(200).json({
            message: "Successfully deleted programming language",
            data: programLanguage,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
