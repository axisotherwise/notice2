import { db } from "../database/index.js"

const indexRender = async (req, res) => {
  const sql = `
    SELECT * FROM sections
  `;
  const result = await db.query(sql);
  res.status(200).json(result[1]);
}

export {
  indexRender,
}