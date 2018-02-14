const Path = require("path-parser");
const _ = require("lodash");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(", ").map(email => ({
        email
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      console.log("user saved");
      res.status(200).send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/surveys/webhook", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = req.body.map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    });
    const filteredEvents = events.filter(Boolean);
    const uniqueEvents = _.uniqBy(filteredEvents, "email", "surveyId");
    uniqueEvents.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false
            }
          }
        },
        {
          $inc: {
            [choice]: true
          },
          $set: {
            "recipients.$.responded": true
          },
          lastResponded: new Date()
        }
      ).exec();
    });

    res.send({});
  });
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });
};
