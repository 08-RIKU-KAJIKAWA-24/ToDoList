const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your password',
  database: 'to_do_list'
});

app.get('/', (req, res) => {
  connection.query(
    'select * from tasks',
    (error, results) => {
      res.render('top.ejs', {contents:results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'insert into tasks(content) values(?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'delete from tasks where id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/edit/:id', (req, res) => {
  connection.query(
    'select * from tasks where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item:results[0]});
    }
  );
})

app.post('/update/:id', (req, res) => {
  connection.query(
    'update tasks set content = ? where id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});



app.listen(3000);
