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

router.post('/getposts', async (req, res) => {
  try {
    const { kakaoId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const group = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group']
    })).group;
    const posts = await models.Post.findAll({ // jsonArray
      include: [{
        model: models.User,
        as: 'author',
        required: true,
      }],
      where: {
        group: group,
      },
      attributes: ['title', [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'contents', 'viewCnt'],
    });
    console.log(posts);
    return res.status(200).json({ posts: posts });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/getonepost', async (req, res) => {
  try {
    const { postId, kakaoId } = req.body;
    const postId2 = Int(postId);
    const kakaoId2 = BigInt(kakaoId);
    const group = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group']
    })).group;
    const post = await models.Post.findOne({
      include: [{
        model: models.User,
        as: 'author',
        required: true,
        attributes: ['id', 'userName'],
      }],
      where: {
        id: postId2,
        group: group
      },
      attributes: ['title', [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'contents', 'viewCnt'],
    });
    if (post === null) {
      return res.status(300).send("해당 글이 없습니다!");
    }
    return res.status(200).json({ post: post });
  } catch (e){
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/createpost', async (req, res) => {
  try {
    const { title, contents, kakaoId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const authorId = thatUser.id;
    const group = thatUser.group;
    const tag = "";
    const viewCnt = 0;
    const thatPost = await models.Post.create(
      {
        authorId: authorId,
        title: title,
        contents: contents,
        tag: tag,
        group: group,
        viewCnt: viewCnt
      }
    );
    return res.status(200).json({ post: thatPost });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/updatepost', async (req, res) => {
  try {
    const { postId, title, contents, kakaoId } = req.body;
    const postId2 = Int(postId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const group = thatUser.group;
    const userId = thatUser.id;
    const thatPost = await models.Post.update(
      {
        title: title,
        contents: contents,
        modifiedAt: new Date(),
      },
      {
        where: {
          id: postId2,
          authorId: userId,
          group: group
        }
      },
    );
    if (thatPost === null) {
      return res.status(300).send("해당하는 글이 없거나 다른 유저가 수정을 시도했습니다.");
    }
    return res.status(200).json({ post: thatPost });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/deletepost', async (req, res) => {
  try {
    const { postId, kakaoId } = req.body;
    const postId2 = Int(postId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const userId = thatUser.id;
    const group = thatUser.group;
    const delCnt = await models.Post.destroy(
      {
        where: {
          id: postId2,
          authorId: userId,
          group: group
        }
      },
    );
    if (delCnt === 0) {
      return res.status(300).send("해당하는 글이 없거나 다른 유저가 삭제를 시도했습니다.");
    }
    return res.status(200).json({ delCnt: delCnt });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});


router.get('/', async (req, res) => {
  // 테스트
  try {
    const kakaoId = 2905119779;
    const group = (await models.User.findOne({
      where: {
        kakaoId: kakaoId,
      },
      attributes: ['group']
    })).group;
    console.log(group);
    res.status(200).send(`${group}`);
  }
  catch (e) {
    res.status(500).send('이게뭐야');
  }
  // ------------------
});

module.exports = router;
