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
    let user = [];

    await admin
      .firestore()
      .collection("user")
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach(async (doc) => {
          await user.push({ id: doc.id, data: doc.data() });
        });
        console.log(user);
      });

    // const user = [];
    // itemSnapshot.forEach((doc) => {
    //   user.push(
    //     {
    //       id: doc.id,
    //       data: doc.data(),
    //     }
    //     // id: doc.id,
    //   );
    // });
    res.send(user);
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

app.get("/test", (req, res) => {
  res.send("test server");
  console.log("tsst");
});

app.post("/create", async (req, res) => {
  const { title, status, number, price } = req.body;
  const data = {
    title: title,
    status: status,
    number: number,
    price: price,
  };
  console.log(data);
  try {
    let doc = await admin.firestore().collection("user").doc().create(data);
    if (await doc.get("/user/id").exists()) {
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

app.put("/update", async (req, res) => {
  const { id, title, number, price, status } = req.body;
  console.log(id, title, number, price, status);
  try {
    await admin.firestore().collection("user").doc(id).update({
      title: title,
      status: status,
      number: number,
      price: price,
    });
    return res.send("update success");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    await admin.firestore().collection("user").doc(id).delete();
    res.send("item deleted");
  } catch (error) {
    console.log("item error");
  }
});
