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
    const posts = await models.Post.findAll({ // jsonArray
      include: [{
        model: models.User,
        as: 'author',
        required: true,
      }],
      where: {
        group: 0,
      },
      attributes: ['title', [Sequelize.literal('author.id'), 'authorId'], [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'contents', 'viewCnt'],
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
    const { postId } = req.body;
    const postId2 = parseInt(postId);
    const post = await models.Post.findOne({
      include: [{
        model: models.User,
        as: 'author',
        required: true,
        attributes: ['id', 'userName'],
      }],
      where: {
        id: postId2,
        group: 0,
      },
      attributes: ['title', [Sequelize.literal('author.id'), 'authorId'], [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'contents', 'viewCnt'],
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
    const { kakaoId, title, contents } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['id']
    }));
    const authorId = thatUser.id;
    const group = 0;
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
    const { kakaoId, postId, title, contents } = req.body;
    const postId2 = parseInt(postId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['id']
    }));
    const userId = thatUser.id;
    const thatPost = await models.Post.update(
      {
        title: title,
        contents: contents,
        updatedAt: new Date(),
      },
      {
        where: {
          id: postId2,
          authorId: userId,
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
    const { kakaoId, postId } = req.body;
    const postId2 = parseInt(postId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['id']
    }));
    const userId = thatUser.id;
    const delCnt = await models.Post.destroy(
      {
        where: {
          id: postId2,
          authorId: userId,
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
  // try {
  //   const kakaoId = 2905119779;
  //   const kakaoId2 = BigInt(kakaoId);
  //   const thatUser = (await models.User.findOne({
  //     where: {
  //       kakaoId: kakaoId2,
  //     },
  //     attributes: ['id', 'userName']
  //   }));
  //   const authorId = thatUser.id;
  //   console.log(thatUser.userName);
  //   const newPost = await models.Post.create(
  //     {
  //       authorId: authorId,
  //       title: 'title',
  //       contents: 'contents',
  //       tag: 'tag',
  //       group: 1,
  //       viewCnt: 0
  //     }
  //   );
  //   console.log(newPost.dataValues);
  //   const thatPost = await models.Post.destroy(
  //     {
  //       where: {
  //         id: newPost.dataValues.id,
  //         authorId: 1,
  //       }
  //     },
  //   );
  //   console.log(thatPost);
  //   res.status(200).send(`호호 ${thatPost}`);
  // }
  // catch (e) {
  //   res.status(500).send('이게뭐야');
  // }
  // ------------------
  res.status(200).send('post_all router');
});

module.exports = router;
