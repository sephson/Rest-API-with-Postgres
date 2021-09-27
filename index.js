require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/restaurants/reviews", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM reviews JOIN restaurants ON reviews.restaurants_id = restaurants.id"
    );
    res.status(200).json({
      status: "success",
      length: result.rows.length,
      reviews: result.rows,
    });
  } catch (error) {
    res.status(500).json({ status: "failed" });
  }
});

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    res.status(200).json({
      status: "success",
      length: result.rows.length,
      restaurants: result.rows,
    });
  } catch (error) {
    res.status(500).json({ status: "failed" });
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "sucess",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      `INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "sucess",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE restaurants SET name = $1, location = $2, price_range=$3 WHERE id = $4 RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "sucess",
      data: {
        restaurant: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM restaurants WHERE id=$1`, [req.params.id]);
    res.status(200).json({ status: "deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/v1/restaurants/:id/addreview", async (req, res) => {
  try {
    const result = await db.query(
      `INSERT INTO reviews (restaurants_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *`,
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(200).json({ status: "review added", result });
  } catch (e) {
    console.log(e);
  }
});

//all reviews

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
