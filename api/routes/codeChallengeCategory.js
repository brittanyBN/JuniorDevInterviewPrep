const express = require('express');
const router = express.Router();
const db = require("../models");
const CodeChallengeCategoryService = require("../services/CodeChallengeCategoryService")
const codeChallengeCategoryService = new CodeChallengeCategoryService(db);
const UserService = require("../services/UserService");
const userService = new UserService(db);
const authentication = require('../middleware/authentication');

router.get("/", async (req, res, next) => {
 try {
    const codeChallengeCategories = await codeChallengeCategoryService.getAll();
    res.status(200).json({
        "message": "Successfully fetched all code challenge categories",
        "data": codeChallengeCategories
    });
 } catch (err) {
    next(err);
 }
});

router.get("/:id", async (req, res, next) => {
 try {
    const codeChallengeCategory = await codeChallengeCategoryService.getOne(req.params.id);
    if (codeChallengeCategory === null) {
        return res.status(400).json({ message: 'Code challenge category does not exist.' });
    }
    res.status(200).json({
        "message": "Successfully fetched code challenge category",
        "data": codeChallengeCategory
    });
 } catch (err) {
    next(err);
 }
});

router.post("/", authentication , async (req, res, next) => {
 try {
    const name = req.body.name;
    const userId = req.body.userId;
    const validateUser = await userService.get(userId);
    if(validateUser === null) {
        return res.status(400).json({ message: 'User does not exist.' });
    }
    if(name === null) {
        return res.status(400).json({ message: 'Name is required.' });
    }
    const codeChallengeCategory = await codeChallengeCategoryService.create(name, userId);
    res.status(200).json({
        "message": "Successfully created code challenge category",
        "data": codeChallengeCategory
    });
 } catch (err) {
    next(err);
 }
});

router.put("/:id", authentication, async (req, res, next) => {
 try {
    if(codeChallengeCategory === null) {
        return res.status(400).json({ message: 'Code challenge category does not exist.' });
    }
    if(req.body.userId === null) {
        return res.status(400).json({ message: 'A valid User ID is required.' });
    }
     const codeChallengeCategory = await codeChallengeCategoryService.update(req.params.id, req.body.name, req.body.userId);
     res.status(200).json({
        "message": "Successfully updated code challenge category",
        "data": codeChallengeCategory
    });
 } catch (err) {
    next(err);
 }
});

router.delete("/:id", authentication, async (req, res, next) => {
 try {
    const codeChallengeCategory = await codeChallengeCategoryService.delete(req.params.id);
    if(codeChallengeCategory === null) {
        return res.status(400).json({ message: 'Code challenge category does not exist.' });
    }
    res.status(200).json({
        "message": "Successfully deleted code challenge category",
        "data": codeChallengeCategory
    });
 } catch (err) {
    next(err);
 }
});

module.exports = router;