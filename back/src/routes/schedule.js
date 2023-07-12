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

router.post('/getschedules', async (req, res) => {
  try {
    console.log('/getschedules');
    const { kakaoId } = req.body;
    const kakaoId2 = BigInt(kakaoId);
    const group = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group']
    })).group;
    const schedules = await models.Schedule.findAll({ // jsonArray
      include: [{
        model: models.User,
        as: 'author',
        required: true,
      }],
      where: {
        [Op.or]: [
          {
            group: group,
          }, {
            group: 0
          }
        ]
      },
      attributes: ['title', 'contents', [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'dueDate', 'startDate', 'endDate', 'group'],
    });
    console.log(schedules);

    return res.status(200).json({ schedules: schedules });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/getoneschedule', async (req, res) => {
  try {
    const { scheduleId, kakaoId } = req.body;
    const scheduleId2 = parseInt(scheduleId);
    const kakaoId2 = BigInt(kakaoId);
    const group = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group']
    })).group;
    const schedule = await models.Schedule.findOne({
      include: [{
        model: models.User,
        as: 'author',
        required: true,
        attributes: ['id', 'userName'],
      }],
      where: {
        id: scheduleId2,
        [Op.or]: [
          {
            group: group,
          }, {
            group: 0
          }
        ]
      },
      attributes: ['title', [Sequelize.literal('author.userName'), 'authorName'], 'id', 'createdAt', 'updatedAt', 'contents', 'group', 'dueDate', 'startDate', 'endDate'],
    });
    if (schedule === null) {
      return res.status(300).send("해당 일정이 없습니다!");
    }
    const participants = await models.UserSchedule.findAll({
      include: [{
        model: models.User,
        as: 'author',
        required: true,
        attributes: ['id', 'userName', 'kakaoId', 'profileImg', 'group'],
      }],
      where: {
        scheduleId: scheduleId2,
      },
      attributes: [['authorId', 'participantId'], [Sequelize.literal('author.userName'), 'participantName'], [Sequelize.literal('author.group'), 'participantGroup'], [Sequelize.literal('author.kakaoId'), 'participantKakaoId'], [Sequelize.literal('author.profileImg'), 'participantProfileImg']], // DB 스키마가 이상한데, 참여자를 뜻함
    });
    const participants2 = participants.map(i => i.dataValues);
    return res.status(200).json({ schedule: schedule, participants: participants2 });
  } catch (e){
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/createschedule', async (req, res) => {
  try {
    console.log('/createschedule');
    const { kakaoId, group, title, contents, dueDate, startDate } = req.body;
    const group2 = parseInt(group);
    const kakaoId2 = BigInt(kakaoId);
    const dueDate2 = new Date(dueDate);
    const startDate2 = new Date(startDate);
    console.log(dueDate2);
    console.log(startDate2);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const authorId = thatUser.id;
    if (group2 !== 0 && group2 !== thatUser.group) {
      return res.status(400).send('잘못된 그룹 설정입니다.');
    }
    console.log('그룹 검증 통과함');
    const endDate = new Date();
    const thatSchedule = await models.Schedule.create(
      {
        authorId: authorId,
        title: title,
        contents: contents,
        group: group2,
        createdAt: new Date(),
        dueDate: dueDate2,
        startDate: startDate2,
        endDate: endDate,
      }
    );
    console.log(thatSchedule);
    return res.status(200).json({ schedule: thatSchedule });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/updateschedule', async (req, res) => {
  try {
    const { kakaoId, scheduleId, title, contents, dueDate, startDate } = req.body;
    const scheduleId2 = parseInt(scheduleId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const userId = thatUser.id;
    const thatSchedule = await models.Schedule.update(
      {
        title: title,
        contents: contents,
        updatedAt: new Date(),
        dueDate: dueDate,
        startDate: startDate,
      },
      {
        where: {
          id: scheduleId2,
          authorId: userId,
          group: group
        }
      },
    );
    if (thatSchedule === null) {
      return res.status(300).send("해당하는 일정이 없거나 다른 유저가 수정을 시도했습니다.");
    }
    return res.status(200).json({ schedule: thatSchedule });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/attend', async (req, res) => {
  try {
    const { kakaoId, scheduleId } = req.body;
    const scheduleId2 = parseInt(scheduleId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const userId = thatUser.id;
    
    models.UserSchedule.count(
      { where: { authorId: userId, scheduleId: scheduleId2 }}
    ).then(cnt => {
      if (cnt > 0) {
        return res.status(400).send('이미 참여 중인 일정입니다.');
      } else {
        const map = models.UserSchedule.create({
          authorId: userId,
          scheduleId: scheduleId2,
        });
        return res.status(200).json({ map: map });
      }
    });
    
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/attendcancel', async (req, res) => {
  try {
    const { kakaoId, scheduleId } = req.body;
    const scheduleId2 = parseInt(scheduleId);
    const kakaoId2 = BigInt(kakaoId);
    const thatUser = (await models.User.findOne({
      where: {
        kakaoId: kakaoId2,
      },
      attributes: ['group', 'id']
    }));
    const userId = thatUser.id;
    
    models.UserSchedule.count(
      { where: { authorId: userId, scheduleId: scheduleId2 }}
    ).then(cnt => {
      if (cnt < 1) {
        return res.status(400).send('참여 중이지 않은 일정입니다.');
      } else {
        const map = models.UserSchedule.findOne({
          where: {
            authorId: userId,
            scheduleId: scheduleId2,
          },
        });
        models.UserSchedule.destroy({
          where: {
            authorId: userId,
            scheduleId: scheduleId2,
          },
        });
        return res.status(200).json({ map: map });
      }
    });
    
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
})


module.exports = router;