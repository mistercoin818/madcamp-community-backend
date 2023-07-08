const express = require('express');
const app = express();
const path = require('path')
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'1234',
  database:'new_schema'
});

const getConn = async()=>{
  return await pool.getConnection(async(conn)=>conn);
}

app.listen(8080, function(){
  console.log('listening on 8080');
});

// app.use(express.json());
// let cors = require('cors');
// app.use(cors());

app.use(express.static(path.join(__dirname, '../../front/build')))

app.get('/product', async(req, res)=>{
  const conn = await getConn();
  const query = 'SELECT school from new_schema.user where name="jinhyeon"';
  let [rows, fields] = await conn.query(query, []);
  conn.release;

  res.send(rows)
})

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../../front/build/index.html'))
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../../front/build/index.html'))
});