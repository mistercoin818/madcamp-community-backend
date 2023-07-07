const express = require('express');
const app = express();
const PORT = process.env.port || 8000;

app.get('/', (req, res) => {
  console.log('requested.');
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
