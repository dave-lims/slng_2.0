/* TODO: Change require() for import/export */
/* TODO: learn about express, axios, cors */
/* TODO: learn about nodemon / install? */

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send(express.static('public'));
// }

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});