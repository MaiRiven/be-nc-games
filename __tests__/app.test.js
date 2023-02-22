const data = require('../db/data/test-data/index')
const db = require("../db/connection");
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data))
afterAll(() => db.end())

describe('categories bad paths', () => {
    test('404 responds with path not found', () => {
        return request(app)
        .get('/anybadpath')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Path not found! >:(')
        });
    });
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
            });
        });
    });
});

describe("GET /api/reviews", () => {
    test("200: responds with array of review objects", () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body }) => {
            const { reviews } = body;
            expect(reviews.length).toBe(13);
            reviews.forEach((review) => {
                console.log(review.comment_count);
                expect(review).toHaveProperty('owner', expect.any(String));
                expect(review).toHaveProperty('title', expect.any(String));
                expect(review).toHaveProperty('review_id', expect.any(Number));
                expect(review).toHaveProperty('category', expect.any(String));
                expect(review).toHaveProperty('review_img_url', expect.any(String));
                expect(review.created_at instanceof Date);
                expect(review).toHaveProperty('votes', expect.any(Number));
                expect(review).toHaveProperty('designer', expect.any(String));
                expect(review).toHaveProperty('comment_count', expect.any(String));
            });
        });
    });
});