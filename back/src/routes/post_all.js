const express = require('express');

const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const router = express.Router();

const { User, Post } = require('../../models/user');

router.post('/getposts', async (req, res) => {
  try {
    return res.status(200).json({success: true});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  res.send('post_all router');
});

module.exports = router;
