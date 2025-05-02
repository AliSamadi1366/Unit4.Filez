import db from "#db/client";
export async function getFilesIncludingFolder() {
  const sql = `
SELECT
  files.*,
  folders.name AS folder_name
FROM
  files
  JOIN  folders ON folders.id = files.folder_id;
    `;
  const { rows: files } = await db.query(sql);
  return files;
}
export async function createFiles({ name, size, folder_id }) {
  const sql = `
      INSERT INTO files (name, size, folder_id)
      VALUES($1, $2, $3)
      RETURNING *;
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}
export async function createFileForFolder({ folder_id, name, size }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}
