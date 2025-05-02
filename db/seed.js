import db from "#db/client";
import { createFiles } from "./queries/files.js";
import { createFolders } from "./queries/folder.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderNames = [`Document`, `Images`, `Videos`];
  for (const n of folderNames) {
    const folder = await createFolders(n);
    for (let i = 0; i < 5; i++) {
      await createFiles({
        name: faker.system.fileName(),
        size: faker.number.int({ min: 100, max: 1000 }),
        folder_id: folder.id,
      });
    }
  }
}
