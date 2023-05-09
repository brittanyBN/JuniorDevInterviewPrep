const express = require('express');
const router = express.Router();
const db = require("../models");
const CodeChallengeService = require("../services/CodeChallengeService")
const codeChallengeService = new CodeChallengeService(db);
const authentication = require('../middleware/authentication');

router.get("/", async (req, res, next) => {
 try {
    const codeChallenges = await codeChallengeService.getAll();
    res.status(200).json({
        "message": "Successfully fetched all code challenges",
        "data": codeChallenges
    });
 } catch (err) {
    next(err);
 }
});

router.get("/:id", async (req, res, next) => {
 try {
    const codeChallenge = await codeChallengeService.getOne(req.params.id);
    res.status(200).json({
        "message": "Successfully fetched code challenge",
        "data": codeChallenge
    });
 } catch (err) {
    next(err);
 }
});

router.post("/", authentication, async (req, res, next) => {
    try {
        const { question, solution, hints, progress, userId, codeChallengeCategoryId } = req.body;
        if(question === null) {
            return res.status(400).json({ message: 'Question is required.' });
        }
        if(solution === null) {
            return res.status(400).json({ message: 'Answer is required.' });
        }
        if(hints === null) {
            return res.status(400).json({ message: 'Hints are required.' });
        }
        if(userId === null) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
        if(codeChallengeCategoryId === null) {
            return res.status(400).json({ message: 'Code Challenge Category ID is required.' });
        }
        const codeChallenge = await codeChallengeService.create(question, solution, hints, progress, userId, codeChallengeCategoryId);
        res.status(200).json({
            "message": "Successfully created code challenge",
            "data": codeChallenge
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", authentication, async (req, res, next) => {
    try {
        const codeChallenge = await codeChallengeService.update(req.params.id, req.body.question, req.body.solution, req.body.hints, req.body.progress, req.body.userId);
        res.status(200).json({
        "message": "Successfully updated code challenge",
        "data": codeChallenge
    });
 } catch (err) {
    next(err);
 }
});

router.delete("/:id", authentication, async (req, res, next) => {
 try {
    const codeChallenge = await codeChallengeService.delete(req.params.id);
    res.status(200).json({
        "message": "Successfully deleted code challenge",
        "data": codeChallenge
    });
 } catch (err) {
    next(err);
 }
});

module.exports = router;