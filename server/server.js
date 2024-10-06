/* TODO: learn about express, axios, cors */
/* TODO: learn about nodemon / install? */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send(express.static('public'));
// }

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});