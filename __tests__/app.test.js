const data = require('../db/data/test-data')
const db = require("../db/connection");
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data))
afterAll(() => db.end())

describe('bad paths', () => {
    test('404 responds with path not found', () => {
        return request(app)
        .get('/anybadpath')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Path not found! >:(')
        })
    })
})
describe("GET /api/categories", () => {
    test("200: responds with array of category objects", () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
            const { categories } = body;
            expect(categories.length).toBe(4);
            categories.forEach((category) => {
                expect(category).toHaveProperty('slug', expect.any(String));
                expect(category).toHaveProperty('description', expect.any(String));
        })
    })
})
})

//happy request
//bad requests
//400, 404


// describe("/api/categories", () =>{
//     test('200: GET responds with category objects with slug and description properties', () => {
//         return request(app)
//         .get("/api/categories")
//         .expect(200)
//         .then(({ body }) => {
//             const { categories } = body;
//             console.log(categories);
//             categories.forEeach((category) => {
//                 expect(response.body.categories)
//             })
//         })
//     })
// });
