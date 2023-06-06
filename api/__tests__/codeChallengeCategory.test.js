// const request = require('supertest');
// const app = require('../app');
//
// describe('Code Challenge Categories: GET, POST, PUT, DELETE', () => {
//     let token;
//     let codeChallengeCategoryId;
//     let userId;
//
//     beforeAll(async () => {
//         const response = await request(app)
//             .post('/login')
//             .send({
//                 email: 'test@gmail.com',
//                 password: 'test'
//             });
//
//         token = response.body.token;
//         userId = response.body.id;
//     });
//
//     it('should try to get all code challenge categories and return 401 if no token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to get all code challenge categories and return 401 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories')
//             .set('Authorization', 'Bearer invalidtoken');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to get all code challenge categories and return 200 if a valid token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories')
//             .set('Authorization', `Bearer ${token}`);
//
//         expect(response.status).toBe(200);
//     });
//
//     it('should try to get a code challenge category by id and return 401 if no token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to get a code challenge category by id and return 401 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', 'Bearer invalidtoken');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to get a code challenge category by id and return 200 if a valid token is provided', async () => {
//         const response = await request(app)
//             .get('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', `Bearer ${token}`);
//
//         expect(response.status).toBe(200);
//     });
//
//     it('should try to create a code challenge category and return 401 if no token is provided', async () => {
//         const response = await request(app)
//             .post('/codeChallengeCategories')
//             .send({
//                 name: 'test',
//                 UserId: '500e723d-038a-4917-bae8-fd3763f4d293'
//             });
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to create a code challenge category and return 400 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .post('/codeChallengeCategories')
//             .set('Authorization', 'Bearer invalidtoken');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to create a code challenge category and return 201 if a valid token is provided', async () => {
//         const response = await request(app)
//             .post('/codeChallengeCategories')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'test',
//                 UserId: '500e723d-038a-4917-bae8-fd3763f4d293'
//             });
//
//         expect(response.status).toBe(200);
//     });
//
//     it('should try to update a code challenge category and return 401 if no token is provided', async () => {
//         const response = await request(app)
//             .put('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .send({
//                 name: 'test',
//                 UserId: '500e723d-038a-4917-bae8-fd3763f4d293'
//             });
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to update a code challenge category and return 401 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .put('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', 'Bearer invalidtoken');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to update a code challenge category and return 200 if a valid token is provided', async () => {
//         const response = await request(app)
//             .put('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'test',
//                 UserId: '500e723d-038a-4917-bae8-fd3763f4d293'
//             });
//
//         expect(response.status).toBe(200);
//     });
//
//     it('should try to delete a code challenge category and return 401 if no token is provided', async () => {
//         const response = await request(app)
//             .delete('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to delete a code challenge category and return 401 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .delete('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', 'Bearer invalidtoken');
//
//         expect(response.status).toBe(401);
//     });
//
//     it('should try to delete a code challenge category and return 200 if a valid token is provided', async () => {
//         const response = await request(app)
//             .delete('/codeChallengeCategories/58dd1ca2-8319-4869-89c4-6c425d355773')
//             .set('Authorization', `Bearer ${token}`);
//
//         expect(response.status).toBe(200);
//     });
// });
//

// SIMPLE TEST

describe('2 + 2', () => {
    it('should return 4', () => {
        expect(2 + 2).toBe(4);
    });
});