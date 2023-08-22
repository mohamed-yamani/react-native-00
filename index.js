const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./routes/products');
const port = 3000;

dotenv.config()
mongoose.connect(process.env.DB_CONNECT).then(() => console.log('Connected to DB!')).catch(err => console.log(err));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRouter);

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`));

// moyamani1337 / UM6PBooking
// 2lmzR9tiZt8fj7R1