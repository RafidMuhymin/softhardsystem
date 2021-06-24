/* eslint-disable import/no-anonymous-default-export */
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = process.env.DB_STRING;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default function (req, res) {
  client.connect((err) => {
    const collection = client
      .db(`${process.env.DB_NAME}`)
      .collection(`${process.env.DB_COL_1}`);

    if (req.method === "GET") {
      collection
        .find({ postTitle: req.headers.posttitle })
        .toArray((err, documents) => {
          console.log(err);
          res.send(documents);
        });
    } else if (req.method === "POST") {
      collection
        .insertOne(JSON.parse(req.body))
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (req.method === "PUT") {
      const comment = JSON.parse(req.body);
      const commentID = comment._id;
      delete comment._id;

      collection
        .replaceOne(
          { _id: ObjectId(commentID) },
          {
            ...comment,
          }
        )
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    err ? console.log(err) : console.log("no err");
  });
}
