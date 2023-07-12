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

router.post('/getcomments', async (req, res) => {
  try {
    console.log('/getcomments');
    const { kakaoId, postId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const postId2 = parseInt(postId);

    const user = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group']
    }));
    const userGroup = user.group;
    const post = (await models.Post.findOne({
      where: {
        id: postId2,
      },
      attributes: ['group']
    }));
    const postGroup = post.group;

    if (postGroup !== 0 && postGroup !== userGroup) {
      return res.status(400).send('잘못된 접근입니다.');
    }
    const comments = await models.Comment.findAll({ // jsonArray
      include: [{
        model: models.User,
        as: 'author',
        required: true,
      }],
      where: {
        postId: postId2,
      },
      attributes: ['id', 'title', 'authorId', [Sequelize.literal('author.userName'), 'authorName'], [Sequelize.literal('author.kakaoId'), 'authorKaKaoId'], [Sequelize.literal('author.profileImg'), 'authorProfileImg'], 'id', 'createdAt', 'contents', 'updatedAt', 'postId'],
    });
    console.log(comments);
    return res.status(200).json({ comments: comments });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error : e });
  }
});

router.post('/createcomment', async (req, res) => {
  try {
    console.log('/createcomment');
    const { kakaoId, postId, contents } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const postId2 = parseInt(postId);

    const user = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const userGroup = user.group;
    const userId = user.id;
    const post = (await models.Post.findOne({
      where: {
        id: postId2,
      },
      attributes: ['group']
    }));
    const postGroup = post.group;

    if (postGroup !== 0 && postGroup !== userGroup) {
      return res.status(400).send('잘못된 접근입니다.');
    }

    const thatComment = await models.Comment.create({
      authorId: userId,
      postId: postId2,
      title: '',
      contents: contents,
      group: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(thatComment);
    res.status(200).json({comment: thatComment});
  } catch (e) {
    console.log(e);
    res.status(500).json({error: e});
  }
});

router.post('/updatecomment', async (req, res) => {
  try {
    const { kakaoId, commentId, contents } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const commentId2 = parseInt(commentId);
    console.log(`kakaoId: ${kakaoId}, commentId: ${commentId}, contents: ${contents}`);

    const user = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['id']
    }));
    const userId = user.id;

    const thatComment = await models.Comment.update(
      {
        title: '',
        contents: contents,
        updatedAt: new Date(),
      },
      {
        where: {
          id: commentId2,
          authorId: userId,
        }
      },
    );

    console.log(thatComment);
    return res.status(200).json({ comment: models.Comment.findOne({
      where: {
        id: 1,
      }
    }) });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/deletecomment', async (req, res) => {
  try {
    const { kakaoId, commentId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const commentId2 = parseInt(commentId);

    const user = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['id']
    }));
    const userId = user.id;

    const thatComment = await models.Comment.findOne(
      {
        where: {
          id: commentId2,
          authorId: userId,
        }
      },
    );
    if (thatComment === null) {
      return res.status(400).send('해당 댓글이 없습니다.');
    }

    const delCnt = await models.Comment.destroy(
        {
        where: {
          id: commentId2,
          authorId: userId,
        }
      },
    );
    if (delCnt < 1) {
      return res.status(400).send('해당 댓글이 없습니다.');
    }

    console.log(thatComment);
    return res.status(200).json({ comment: thatComment });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

module.exports = router;
