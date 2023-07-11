const express = require('express');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const router = express.Router();
const SECRET_KEY = process.env.JWT_KEY;
const ISSUER = process.env.JWT_ISSUER;

// db 연결 ----------
const models = require('../../models');
// -----------------

router.post('/', async (req, res) => {
  try {
    const {
      kakaoId,
      userName,
      nickname,
      school,
      studentId,
      group,
      profileImg,
    } = req.body;

    await models.User.create({
      kakaoId: BigInt(kakaoId),
      userName: userName,
      nickname: nickname,
      school: school,
      studentId: Int(studentId),
      group: Int(group),
      profileImg: profileImg,
      instaAcct: '',
      instaPub: false,
      githubAcct: '',
      githubPub: false,
      linkedinAcct: '',
      linkedinPub: false,
    });

    const thatUser = await models.User.findOne({
      where: { kakaoId: BigInt(kakaoId) },
    });

    res.status(200).json({ success: true, id: thatUser.id });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  res.send('join router');
});

module.exports = router;
