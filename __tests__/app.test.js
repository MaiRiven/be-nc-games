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
});

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
    test('responses are ordered by date', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeSortedBy('created_at', {descending: false});
          });
      });
});

describe('GET /api/reviews/:review_id', () => {
    test('responds with the correct review object', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
            review_id: 1,
            title: 'Agricola',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_img_url:
              'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
            review_body: 'Farmyard fun!',
            category: 'euro game',
            created_at: expect.any(String),
            votes: 1
          });
        });
    });
    test('responds with a 404 error if review_id is not found', () => {
      return request(app)
        .get('/api/reviews/99')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Review not found!');
        });
    });
    test('responds with a 400 error if review_id is not a number', () => {
      return request(app)
        .get('/api/reviews/not-a-number')
        .expect(400)
        .then(({ body }) => {
            console.log("tests");
            expect(body.msg).toBe('Invalid input');
        });
    });
});