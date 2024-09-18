// app.js
const express = require('express');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors())

app.use('/items', itemRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
