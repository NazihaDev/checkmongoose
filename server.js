// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 4000;



app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });