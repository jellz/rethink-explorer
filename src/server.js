const express = require('express');
const logger = require('morgan');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('index', { title: 'test' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`rethink-explorer listening on port ${port}`));