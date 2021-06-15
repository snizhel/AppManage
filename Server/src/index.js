const config = require("./config");
const app = require("./server");
const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
const { query } = require("express");
const databaseURL = "https://slab-100df.firebaseio.com/";
const db = admin.firestore;
function init() {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL,
    });
    console.log("database is connected!");
  } catch (err) {
    console.log("connect to server failed!");
  }
  try {
    app.listen(config.PORT, config.HOST, () => {
      console.log(`server is running on ${config.HOST}:${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
init();

app.get("/user", async (req, res) => {
  try {
    const itemSnapshot = await admin.firestore().collection("user").get();
    const user = [];
    itemSnapshot.forEach((doc) => {
      user.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.json(user);
  } catch (e) {
    message = "Error";
  }
});

app.get("/user/id", async (req, res) => {
  try {
    let { id } = req.query;
    console.log(id);
    let temp = await admin.firestore().collection("user").doc(id).get();
    res.send(temp.data());
  } catch (Error) {
    message = "err";
  }
});

app.post("/", async (req, res) => {
  const { id, title, status, number, price, img } = req.body;
  const data = {
    id: id,
    title: title,
    status: status,
    number: number,
    price: price,
    img: img,
  };
  try {
    let doc = await admin
      .firestore()
      .doc("user/" + data.id)
      .create(data);
    if ((await doc.get()).exists) {
      return res.status(200).send;
    } else {
      doc.set(data);
      res.send("items created");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.put("/", async (req, res, next) => {
  const { id, title, number, price, status, img } = req.body;
  const data = {
    id: id,
    title: title,
    status: status,
    number: number,
    price: price,
    img: img,
  };
  async () => {
    try {
      await admin
        .firestore()
        .collection("user")
        .doc(id.toString())
        .update(data);
      return res.send("update success");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };
});

app.delete("/", async (req, res) => {
  const { id } = req.query;
  let temp = await admin.firestore().collection("user").doc(id).delete();
  res.send("item deleted");
});
