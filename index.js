require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_, res) => {
  res.json(
    {
      success: true,
      message: 'Welcome to the main endpoint of Yuan Hidroponik'
    }
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
})
