const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`,
    });
  }
});

const listALlUsers = async () => {
  let data = [];
  try {
    let listuserresult = await admin.auth().listUsers(1000);
    listuserresult.users.forEach((rec) => {
      data.push(rec.toJSON());
    });
    while (listuserresult.pageToken) {
      listuserresult = await admin.auth().listUsers(1000, listuserresult.pageToken);
      listuserresult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error
  }
};

router.get("/all", async (req, res) => {
  try {
    const userData = await listALlUsers();
    const dataCount = userData.length;
    return res.status(200).send({ success: true, data: userData, dataCount });
  } catch (error) {
    return res.send({
      success: false,
      msg: `Error in listening users: ${error}`,
    });
  }
});

module.exports = router;
