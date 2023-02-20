const db = require('../db/connection.js');

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((res) => {
        const categoriesRows = res.rows;
        return categoriesRows;
    })
};

module.exports = { fetchCategories };