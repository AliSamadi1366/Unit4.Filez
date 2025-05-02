import express from "express";
import { getFolderByIdIncludingfiles, getFolders } from "#db/queries/folder";
import { createFileForFolder } from "#db/queries/files";
const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer.");
  const folder = await getFolderByIdIncludingfiles(id);
  if (!folder) return res.status(404).send("Folder not found.");
  return res.status(200).send(folder);
});
router.route("/:id/files").post(async (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id))
    return res.status(400).send("Folder ID must be a positive integer.");
  const folder = await getFolderByIdIncludingfiles(id);
  if (!folder) return res.status(404).send("Folder not found.");
  if (!req.body) res.status(400).send("Request body is required.");
  const { name, size } = req.body;
  if (!name || !size) return res.status(400).send("name or size is missing.");
  const file = await createFileForFolder({
    name,
    size,
    folder_id: id,
  });
  return res.status(201).send(file);
});
