const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

app.use(express.json());
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'new_schema',
});

const getConn = async () => {
  return await pool.getConnection(async (conn) => conn);
};

// 회원 인증 라우트 핸들러
app.post('/authenticate', async (req, res) => {
  const { name, studentId } = req.body;

  try {
    const conn = await getConn();
    const [rows] = await conn.execute(
      'SELECT * FROM user WHERE name = ? AND student_id = ?',
      [name, studentId]
    );
    conn.release();

    if (rows.length > 0) {
      // 회원 인증 성공
      // console.log(rows[0].creation)
      if(rows[0].creation){
        // 계정이 이미 생성된 회원
        res.status(200).send('등록된 회원, 로그인 페이지로 넘어갑니다.');
      }
      else{
        // 회원가입을 해야하는 회원
        res.status(300).send('회원 인증 성공, 회원가입 페이지로 넘어갑니다.');
      }
    } else {
      // 회원 인증 실패
      res.status(400).send('회원 인증 실패');
    }
  } catch (error) {
    // 오류 발생
    console.error(error);
    res.status(500).send('서버 오류');
  }
});

app.listen(8000, function () {
  console.log('listening on 8000');
});
