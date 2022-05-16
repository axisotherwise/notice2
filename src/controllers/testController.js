import {
  db,
  query,
} from "../database/index.js";

const test = async (req, res) => {
  try {
    // const { name, password, email, gender } = req.query;
    // await db.query("START TRANSACTION");
    // const user = await query.insertUser(name, password);
    // const userId = user.insertId;
    // const userInfo = await query.insertInfo(userId, email, gender);
    // await db.query("COMMIT");
    // res.json(userInfo);
    const [ result ] = await query.searchUser(req.query.name);
    console.log(result);
  } catch (err) {
    console.error(err);
    await db.query("ROLLBACK");
  }
}

export {
  test,
}