const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PATCH, GET, OPTIONS");
  next();
});

const dbURL =
  "mongodb://stephen:2m9YatjtBL30@ds247499.mlab.com:47499/as-bookings";
const port = 8000;

MongoClient.connect(dbURL, (err, client) => {
  if (err) return console.log(err);

  app.get("/bookings", (req, resp) => {
    client.db()
      .collection("bookings")
      .find()
      .toArray()
      .then(bookings => {
        resp.json(bookings);
      })
      .catch(err => {
        resp.status(500).json(err);
      });
  });

  app.patch("/bookings/:id", (req, resp) => {
    client.db()
      .collection("bookings")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { cancelled: Boolean(req.body.cancelled) } },
        { returnOriginal: false }
      )
      .then(booking => {
        resp.json(booking.value);
      })
      .catch(err => {
        resp.status(500).json(err);
      });
  });

  app.listen(port, () => {
    console.info(`API running on http://localhost:${port}`);
  });
});
