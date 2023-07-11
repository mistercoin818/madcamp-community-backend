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

const { User } = require('../../models/user');

router.post('/', async (req, res) => {
  try {
    const { kakaoId, userName, nickname, school, studentId, group, profileImg } = req.body;
  } catch(e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
})

module.exports = router;
