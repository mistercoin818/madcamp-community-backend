const express = require('express');
const app = express();
const dotenv = require('dotenv');

// 환경 변수 설정
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const PORT = process.env.PORT || 8000;
const client = process.env.CLIENT;
const cors = require('cors');

// cors 설정 및 express 관련 설정들
const whitelist = [`${client}`];

//console.log('[REQUEST-CORS] Whitelist: ', whitelist);
//console.log(`아아아아 ${process.env.CLIENT}`);

const corsOptions = {
  origin: (origin, callback) => {
    console.log('[REQUEST-CORS] Request from origin: ', origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not Allowed by CORS'));
  },
  credentials: true,
  AllowCredentials: true, // 쿠키 사용하려면 필요!
};

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 중첩된 객체 받지 않음
app.use(cors(corsOptions));

// 요청
app.get('/', (req, res) => {
  console.log('requested.');
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
