const express = require('express');

const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const router = express.Router();

// db 연결 ----------
const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// -----------------

router.post('/getuserinfo', async (req, res) => {
  try {
    const { kakaoId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
    });
    if (thatUser === null) {
      return res.status(300).send('해당 유저가 없습니다.');
    } else {
      return res.status(200).json({user: thatUser});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/updateinfo', async (req, res) => {
  try {
    const { kakaoId, nickname, instaAcct, instaPub, githubAcct, githubPub, linkedinAcct, linkedinPub, } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const instaPub2 = Boolean(instaPub);
    const githubPub2 = Boolean(githubPub);
    const linkedinPub2 = Boolean(linkedinPub);
    const thatUser = await models.Post.update(
      {
        nickname: nickname,
        instaAcct: instaAcct,
        instaPub: instaPub2,
        githubAcct: githubAcct,
        githubPub: githubPub2,
        linkedinAcct: linkedinAcct,
        linkedinPub: linkedinPub2,
      },
      {
        where: {
          kakaoId: kakaoId2,
        }
      },
    );
    if (thatUser === null) {
      return res.status(300).send("해당하는 유저가 없습니다.");
    }
    return res.status(200).json({user: thatUser});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  // 테스트 --------------------
  // try {
  //   const kakaoId = '2905119779'
  //   const booll = Boolean('true');
  //   console.log(booll);
  //   const kakaoId2 = BigInt(kakaoId);
  //   const thatUser = await models.User.findOne({
  //     where: {
  //       kakaoId: kakaoId2,
  //     },
  //   });
  //   return res.status(200).send(thatUser);
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({ error: e });
  // }
  // --------------------------

  res.status(200).send('profile router');
})





module.exports = router;