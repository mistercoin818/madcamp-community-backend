const express = require('express');
const app = express();

// 환경 변수 설정
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const PORT = process.env.PORT || 8000;
const client = process.env.CLIENT;
const cors = require('cors');

// DB 연결
const db = require('../models');
db.sequelize
  .sync()
  .then(() => {
    console.log('DB Connection Success!');
  })
  .catch(console.error);

// 공식 문서가 제안한 연결 테스트 코드
const asyncConnTest = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
asyncConnTest();

// cors 설정 및 express 관련 설정들
const whitelist = [`${client}`];

//console.log('[REQUEST-CORS] Whitelist: ', whitelist);
//console.log(`아아아아 ${process.env.CLIENT}`);

const corsOptions = {
  origin: (origin, callback) => {
    console.log('[REQUEST-CORS] Request from origin: ', origin);
    // if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    if (!origin) callback(null, true);
    else callback(new Error('Not Allowed by CORS'));
  },
  credentials: true,
  AllowCredentials: true, // 쿠키 사용하려면 필요!
};

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 중첩된 객체 받지 않음
app.use(cors(corsOptions));

// 요청
// ------------------------
const { UserAuth } = require('../models');

app.post('/authenticate', async (req, res) => {
  const { name, studentId } = req.body;
  console.log(`req 도착 : name: ${name}, studentId : ${studentId}`);

  try {
    //const conn = await getConn();
    // const [rows] = await conn.execute(
    //   'SELECT * FROM user WHERE name = ? AND student_id = ?',
    //   [name, studentId]
    // );
    const cnt = await UserAuth.count({
      where: {
        KAISTId: studentId,
      }
    })
    //conn.release();
    //console.log(rows);

    if (cnt > 0) {
      // 회원 인증 성공
      // console.log(rows[0].creation)
        // 계정이 이미 생성된 회원
      res.status(200).send('등록된 회원, 로그인 페이지로 넘어갑니다.');
    
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
// ------------------------



app.get('/', (req, res) => {
  console.log('requested.');
  res.send('Hello World!');
});

app.post('/example', (req, res) => {
  console.log('requested.');
  try {
    const ret = true;
    return res.status(200).json({ example: ret });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
