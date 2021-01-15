const Student = require('../models/Student');
const asyncHandler = require('../middleware/async');

const createStudent = asyncHandler(async (req, res, next) => {
  const { registerNum, name, department, gdCompleted } = req.body;

  Student.findOne({ registerNum: registerNum }).then((student) => {
    if (student) {
      req.flash('error', 'This student already exists in the database.');
      return res.redirect('/');
    }
  });

  let scores = {};
  scores['subjectKnowledge'] = req.body.subjectKnowledge ? req.body.subjectKnowledge : 0;
  scores['communicationSkills'] = req.body.communicationSkills ? req.body.communicationSkills : 0;
  scores['bodyLanguage'] = req.body.bodyLanguage ? req.body.bodyLanguage : 0;
  scores['listeningSkills'] = req.body.listeningSkills ? req.body.listeningSkills : 0;
  scores['criticalThinking'] = req.body.criticalThinking ? req.body.criticalThinking : 0;
  scores['leadershipSkills'] = req.body.leadershipSkills ? req.body.leadershipSkills : 0;

  const student = await Student.create({ registerNum, name, department, scores, gdCompleted, member: req.user._id });

  req.flash('success', 'Student Successfully Created');
  res.redirect('/');
});

const updateStudent = asyncHandler(async (req, res, next) => {
  const { registerNum, name, department } = req.body;
  let { gdCompleted } = req.body;

  if (gdCompleted == null) {
    gdCompleted = false;
  }

  let scores = {};
  scores['subjectKnowledge'] = req.body.subjectKnowledge ? req.body.subjectKnowledge : 0;
  scores['communicationSkills'] = req.body.communicationSkills ? req.body.communicationSkills : 0;
  scores['bodyLanguage'] = req.body.bodyLanguage ? req.body.bodyLanguage : 0;
  scores['listeningSkills'] = req.body.listeningSkills ? req.body.listeningSkills : 0;
  scores['criticalThinking'] = req.body.criticalThinking ? req.body.criticalThinking : 0;
  scores['leadershipSkills'] = req.body.leadershipSkills ? req.body.leadershipSkills : 0;

  const student = await Student.findOneAndUpdate(
    { _id: req.params.id },
    { registerNum, name, department, scores, gdCompleted },
    { new: true, runValidators: true }
  );

  req.flash('success', 'Student Successfully Updated');
  res.redirect('/');
});

const deleteStudent = asyncHandler(async (req, res, next) => {
  await Student.findByIdAndDelete(req.params.id);
  req.flash('success', 'Student Successfully Deleted');
  res.redirect('/');
});

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
};
