const request = require('supertest');
const app = require('../app');
require('dotenv').config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('Auth: register and login', () => {
    let token;
    let userId;
    let codeChallengeCategoryId;
    let codeChallengeId;
    let flashcardId;
    let flashcardSetId;

        it('should register a user and return 201', async () => {
        const registerResponse = await request (app)
            .post('/signup')
            .send({
                name: 'test',
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            });

        expect(registerResponse.status).toBe(201);
    });

    it('should register a use and return 200', async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD
            });
        expect(loginResponse.status).toBe(200);

        token = loginResponse.body.token;
        userId = loginResponse.body.id;
    });

    it('should post a new code challenge category and return 200', async () => {
        const codeChallengeCategoryResponse = await request(app)
            .post('/codeChallengeCategories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
                UserId: userId
            });
        expect(codeChallengeCategoryResponse.status).toBe(200);

        codeChallengeCategoryId = codeChallengeCategoryResponse.body.data.id;
    });


    it('should try to create a code challenge and return 200', async () => {
        const codeChallengeResponse = await request(app)
            .post('/codeChallenges')
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'Test Code Challenge Question',
                solution: 'Test Code Challenge Solution',
                hint: 'Test Code Challenge Hint',
                betterSolution: 'Test Code Challenge Better Solution',
                CodeChallengeCategoryId: codeChallengeCategoryId,
                UserId: userId
            });

        expect(codeChallengeResponse.status).toBe(200);

        codeChallengeId = codeChallengeResponse.body.data.id;
    });

    it('should try to create a flashcard set and return 200', async () => {
        const flashcardSetResponse = await request(app)
            .post('/flashcardSets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
                UserId: userId
            });
        expect(flashcardSetResponse.status).toBe(200);

        flashcardSetId = flashcardSetResponse.body.data.id;
    });

    it('should try to post a flashcard and return 200 if a valid token is provided', async () => {
        const flashcardResponse = await request(app)
            .post('/flashcards')
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(flashcardResponse.status).toBe(200);
        flashcardId = flashcardResponse.body.data.id;
    });

    it('should delete the flashcard and return 200 if a valid token is provided', async () => {
        const deleteFlashcardResponse = await request(app)
            .delete(`/flashcards/${flashcardId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(deleteFlashcardResponse.status).toBe(200);
    });

    it('should delete the flashcard set and return 200 if a valid token is provided', async () => {
        const deleteFlashcardSetResponse = await request(app)
            .delete(`/flashcardSets/${flashcardSetId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(deleteFlashcardSetResponse.status).toBe(200);
    });

    it('should delete the code challenge and return 200 if a valid token is provided', async () => {
        const deleteCodeChallengeResponse = await request(app)
            .delete(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(deleteCodeChallengeResponse.status).toBe(200);
    });

    it('should delete the code challenge category and return 200 if a valid token is provided', async () => {
        const deleteCodeChallengeCategoryResponse = await request(app)
            .delete(`/codeChallengeCategories/${codeChallengeCategoryId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(deleteCodeChallengeCategoryResponse.status).toBe(200);
    });

    it('should delete the user and return 200 if a valid token is provided', async () => {
        const deleteUserResponse = await request(app)
            .delete(`/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(deleteUserResponse.status).toBe(200);
    });
});