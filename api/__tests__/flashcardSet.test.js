const request = require('supertest');
const app = require('../app');

describe('Flashcard Sets: GET, POST, PUT, DELETE', () => {
    let token;
    let flashcardSetId;
    let userId;
    const page = 1;
    const size = 1;

    beforeAll(async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: 'test'
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


    it('should try to create a flashcard set and return 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/flashcardSets')
            .send({
                name: 'Test Flashcard Set',
                UserId: userId
            });

        expect(response.status).toBe(401);
    });

    it('should try to create a flashcard set and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .post('/flashcardSets')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to create a flashcard set and return 201 if a valid token is provided', async () => {
        const response = await request(app)
            .post('/flashcardSets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Flashcard Set',
                UserId: userId
            });

        expect(response.status).toBe(200);
        flashcardSetId = response.body.data.id;
    });

    it('should try to get all flashcard sets and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/set/${userId}?page=${page}&size=${size}`);

        expect(response.status).toBe(401);
    });

    it('should try to get all flashcard sets and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/set/${userId}?page=${page}&size=${size}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get all flashcard sets and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/set/${userId}?page=${page}&size=${size}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to get a flashcard set by id and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/list/${flashcardSetId}`);

        expect(response.status).toBe(401);
    });

    it('should try to get a flashcard set by id and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/list/${flashcardSetId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get a flashcard set by id and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get(`/flashcardSets/list/${flashcardSetId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to update a flashcard set and return 401 if no token is provided', async () => {
        const response = await request(app)
            .put(`/flashcardSets/${flashcardSetId}`)
            .send({
                name: 'Test Flashcard Set',
                UserId: userId
            });

        expect(response.status).toBe(401);
    });

    it('should try to update a flashcard set and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .put(`/flashcardSets/${flashcardSetId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to update a flashcard set and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .put(`/flashcardSets/${flashcardSetId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Flashcard Set',
                UserId: userId
            });

        expect(response.status).toBe(200);
    });

    it('should try to delete a flashcard set and return 401 if no token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcardSets/${flashcardSetId}`);

        expect(response.status).toBe(401);
    });

    it('should try to delete a flashcard set and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcardSets/${flashcardSetId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to delete a flashcard set and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .delete(`/flashcardSets/${flashcardSetId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

});