const request = require('supertest');
const app = require('../app');
require('dotenv').config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('Flashcards: GET, POST, PUT, DELETE', () => {
    let token;
    let flashcardId;
    let userId;
    let flashcardSetId;

    beforeAll(async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD
            });

        token = response.body.token;
        userId = response.body.id;

        const flashcardSetResponse = await request(app)
            .post('/flashcardSets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
                UserId: userId
            });

        flashcardSetId = flashcardSetResponse.body.data.id;
    });

    it('should try to post a flashcard and return 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/flashcards')
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(response.status).toBe(401);
    });

    it('should try to post a flashcard and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .post('/flashcards')
            .set('Authorization', 'Bearer invalidtoken')
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            })

        expect(response.status).toBe(401);
    });

    it('should try to post a flashcard and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .post('/flashcards')
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(response.status).toBe(200);
        flashcardId = response.body.data.id;
        console.log(flashcardId);
    });

    it('should try to get all flashcards and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get('/flashcards');

        expect(response.status).toBe(401);
    });

    it('should try to get all flashcards and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get('/flashcards')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get all flashcards and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get('/flashcards')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to get a flashcard by id and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get(`/flashcards/${flashcardId}`);

        expect(response.status).toBe(401);
    });

    it('should try to get a flashcard by id and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcards/${flashcardId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get a flashcard by id and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcards/${flashcardId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to update a flashcard and return 401 if no token is provided', async () => {
        const response = await request(app)
            .put(`/flashcards/${flashcardId}`)
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(response.status).toBe(401);
    });

    it('should try to update a flashcard and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .put(`/flashcards/${flashcardId}`)
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(response.status).toBe(401);
    });

    it('should try to update a flashcard and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .put(`/flashcards/${flashcardId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'test',
                answer: 'test',
                UserId: userId,
                FlashcardSetId: flashcardSetId
            });

        expect(response.status).toBe(200);
    });

    it('should try to delete a flashcard and return 401 if no token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcards/${flashcardId}`);

        expect(response.status).toBe(401);
    });

    it('should try to delete a flashcard and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcards/${flashcardId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to delete a flashcard and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcards/${flashcardId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

});
