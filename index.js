require('.env').config();
const express = require('express');

const app = express();
const port = 3000;
const router = require('./router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get(`/${process.env.LOADER_IO}`, (req, res) => (
	res.status(200).send(process.env.LOADER_IO)
))
app.use('/products', router);
app.use('/test', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
