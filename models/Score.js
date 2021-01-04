const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema(
  {
    registerNum: {
      type: Number,
      required: true,
    },

    subjectKnowledge: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    communicationSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    bodyLanguage: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    listeningSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    criticalThinking: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    leadershipSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model('Score', ScoreSchema, 'scores');
module.exports = Score;
