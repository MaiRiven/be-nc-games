const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("categories bad paths", () => {
  test("404 responds with path not found", () => {
    return request(app)
      .get("/anybadpath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found! >:(");
      });
  });
});

describe("GET /api/categories", () => {
  test("200: responds with array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
});

describe("GET /api/reviews", () => {
  test("200: responds with array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews.length).toBe(13);
        reviews.forEach((review) => {
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review.created_at instanceof Date);
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("comment_count", expect.any(String));
        });
      });
  });
  test("responses are ordered by date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("created_at", { descending: false });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("responds with the correct review object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review).toHaveProperty("review_id", expect.any(Number));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review.created_at instanceof Date);
        expect(review).toHaveProperty("votes", expect.any(Number));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_body", expect.any(String));
      });
  });
});
test("responds with a 404 error if review_id is not found", () => {
  return request(app)
    .get("/api/reviews/99")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Review not found!");
    });
});
test("responds with a 400 error if review_id is not a number", () => {
  return request(app)
    .get("/api/reviews/not-a-number")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Invalid input");
    });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: responds with an array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(Array.isArray(comments)).toBe(true);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("review_id", 2);
        });
      });
  });
  test("200: responds with a message if there are no comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test("404: responds with a message if review_id is not found", () => {
    return request(app)
      .get("/api/reviews/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Review not found!");
      });
  });
  test("400: responds with a message if review_id is not a number", () => {
    return request(app)
      .get("/api/reviews/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("responds with an array of comments for the given review_id in most recent order", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("200, returns the updated review object", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((res) => {
        const review = JSON.parse(res.text).review[0];
        expect(review).toMatchObject({
            review_id: 2,
            title: 'Jenga',
            category: 'dexterity',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_body: 'Fiddly fun for all the family',
            review_img_url: 'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 15
          });
      });
  });
  test("200, returns the updated review object when inc_votes is negative", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: -3 })
      .expect(200)
      .then((res) => {
        const review = JSON.parse(res.text).review[0];
        expect(review).toMatchObject({
            review_id: 2,
            title: 'Jenga',
            category: 'dexterity',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_body: 'Fiddly fun for all the family',
            review_img_url: 'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 2
          })
      });
  });
  test("status:404, returns an error message when review_id does not exist", () => {
    return request(app)
      .patch("/api/reviews/999")
      .send({ inc_votes: 10 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review not found");
      });
  });
  test("status:400, returns an error message when review_id is not a num", () => {
    return request(app)
      .patch("/api/reviews/two")
      .send({ inc_votes: 10 })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  //what happens if no inc_votes or mispelled inc_votes
  //400 x2 missing param and mispelled param
});