const express = require('express');
const logger = require('morgan');
const rethinkdb = require('rethinkdbdash');

const r = rethinkdb();
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(logger('dev'));
app.use('/assets', express.static('src/static'))

app.get('/', async (req, res) => {
  const databases = [];
  const dbNames = await r.dbList();
  for (let i = 0; i < dbNames.length; i++) {
    console.log('test1');
    const dbName = dbNames[i];
    console.log('name', dbName);
    const dbTables = await r.db(dbName).tableList();
    console.log('test2');
    databases.push({
      name: dbName,
      tables: dbTables
    })
  }
  console.log('test3');
  res.render('index', {
    databases
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`rethink-explorer listening on port ${port}`)
);
