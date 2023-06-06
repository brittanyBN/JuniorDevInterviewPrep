const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Auth: login', () => {
    it('should login a user and return 200', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

});