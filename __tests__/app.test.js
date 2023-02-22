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
            });
        });
    });
});

// describe('GET /api/reviews/:review_id', () => {
//     it('responds with the correct review object', () => {
//       return request(app)
//         .get('/api/reviews/1')
//         .expect(200)
//         .then(({ body }) => {
//           expect(body.review).toMatchObject({
//             review_id: 1,
//             title: 'Agricola',
//             category: 'strategy',
//             designer: 'Uwe Rosenberg',
//             owner: 'mallionaire',
//             review_body:
//               "Farmyard fun!",
//             review_img_url:
//               'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
//             created_at: expect.any(String),
//             votes: 0,
//             comment_count: '1',
//           });
//         });
//     });
//     it('responds with a 404 error if review_id is not found', () => {
//       return request(app)
//         .get('/api/reviews/999')
//         .expect(404)
//         .then(({ body }) => {
//           expect(body.msg).toBe('Review with review_id 999 not found');
//         });
//     });
//     it('responds with a 400 error if review_id is not a number', () => {
//       return request(app)
//         .get('/api/reviews/not-a-number')
//         .expect(400)
//         .then(({ body }) => {
//             expect(body.msg).toBe('Invalid review ID');
//         });
//     });
// });
