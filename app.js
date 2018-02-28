// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root',
  database: 'bopo'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM members', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);

  rows.forEach( (row) => {
  console.log(`${row.name} is in ${row.location}`);
  });
});
const member = { Name: 'Winnie', ID: '888', Mail: 'winnie@gmail.com', UserName: 'winnieB'};
con.query('INSERT INTO members SET ?', member, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
