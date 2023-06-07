const request = require('supertest');
const app = require('../app');
require('dotenv').config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('Code Challenges: GET, POST, PUT, DELETE', () => {
    let token;
    let codeChallengeId;
    let codeChallengeCategoryId;
    let userId;

    beforeAll(async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD
            });

        token = response.body.token;
        userId = response.body.id;

        const codeChallengeCategoryResponse = await request(app)
            .post('/codeChallengeCategories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
                UserId: userId
            });

        codeChallengeCategoryId = codeChallengeCategoryResponse.body.data.id;
    });

    it('should try to create a code challenge and return 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/codeChallenges')
            .send({
                question: 'Test Code Challenge Question',
                solution: 'Test Code Challenge Solution',
                hint: 'Test Code Challenge Hint',
                progress: 0,
                betterSolution: 'Test Code Challenge Better Solution',
                CodeChallengeCategoryId: codeChallengeCategoryId,
                UserId: userId
            });

        expect(response.status).toBe(401);
    });

    it('should try to create a code challenge and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .post('/codeChallenges')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to create a code challenge and return 201 if a valid token is provided', async () => {
        const response = await request(app)
            .post('/codeChallenges')
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'Test Code Challenge Question',
                solution: 'Test Code Challenge Solution',
                hint: 'Test Code Challenge Hint',
                progress: 0,
                betterSolution: 'Test Code Challenge Better Solution',
                CodeChallengeCategoryId: codeChallengeCategoryId,
                UserId: userId
            });

        expect(response.status).toBe(200);
        codeChallengeId = response.body.data.id;
    });

    it('should try to get all code challenges and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get('/codeChallenges');

        expect(response.status).toBe(401);
    });

    it('should try to get all code challenges and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get('/codeChallenges')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get all code challenges and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get('/codeChallenges')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to get a code challenge by id and return 401 if no token is provided', async () => {
        const response = await request(app)
            .get(`/codeChallenges/${codeChallengeId}`);

        expect(response.status).toBe(401);
    });

    it('should try to get a code challenge by id and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .get(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to get a code challenge by id and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .get(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should try to update a code challenge and return 401 if no token is provided', async () => {
        const response = await request(app)
            .put(`/codeChallenges/${codeChallengeId}`)
            .send({
                question: 'Test Code Challenge Question',
                solution: 'Test Code Challenge Solution',
                hint: 'Test Code Challenge Hint',
                progress: 0,
                betterSolution: 'Test Code Challenge Better Solution',
                CodeChallengeCategoryId: codeChallengeCategoryId,
                UserId: userId
            });

        expect(response.status).toBe(401);
    });

    it('should try to update a code challenge and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .put(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to update a code challenge and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .put(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                question: 'Test Code Challenge Question',
                solution: 'Test Code Challenge Solution',
                hint: 'Test Code Challenge Hint',
                progress: 0,
                betterSolution: 'Test Code Challenge Better Solution',
                CodeChallengeCategoryId: codeChallengeCategoryId,
                UserId: userId
            });

        expect(response.status).toBe(200);
    });

    it('should try to delete a code challenge and return 401 if no token is provided', async () => {
        const response = await request(app)
            .delete(`/codeChallenges/${codeChallengeId}`);

        expect(response.status).toBe(401);
    });

    it('should try to delete a code challenge and return 401 if an invalid token is provided', async () => {
        const response = await request(app)
            .delete(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
    });

    it('should try to delete a code challenge and return 200 if a valid token is provided', async () => {
        const response = await request(app)
            .delete(`/codeChallenges/${codeChallengeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

});