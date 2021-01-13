const cardDepartments = document.querySelectorAll('.card-subtitle');
const tableDepartments = document.querySelectorAll('table tbody tr td:nth-child(3)');
const depts = {
  AUT: 'Automobile Engineering',
  BIO: 'Biotechnology',
  CHE: 'Chemical Engineering',
  CIV: 'Civil Engineering',
  CSE: 'Computer Science and Engineering',
  EEE: 'Electrical and Electronics Engineering',
  ECE: 'Electronics and Communications Engineering',
  INT: 'Information Technology',
  MEC: 'Mechanical Engineering',
};

for (let i = 0; i < cardDepartments.length; i++) {
  let department = cardDepartments[i].innerText;
  cardDepartments[i].style.backgroundColor = '#9D44B5';
  cardDepartments[i].innerText = depts[department];
  // tableDepartments[i].innerText = depts[department];
}

// Populate edit modal with data
const editBtns = document.querySelectorAll('.edit-student');

for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener('click', function () {
    const editForm = document.getElementById('edit-student-form');
    editForm.action = `/students/${this.getAttribute('data-id')}`;
    editForm['name'].value = this.getAttribute('data-name') ?? '';
    editForm['registerNum'].value = this.getAttribute('data-registerNum') ?? '';
    editForm['department'].value = this.getAttribute('data-department') ?? '';
    if (this.getAttribute('data-gdCompleted') === 'true') {
      editForm['gdCompleted'].checked = true;
    }

    const subjectKnowledgeScore = this.getAttribute('data-subjectKnowledge');
    if (subjectKnowledgeScore > 0) {
      editForm.subjectKnowledge[subjectKnowledgeScore - 1].checked = true;
    }

    const communicationSkillsScore = this.getAttribute('data-communicationSkills');
    if (communicationSkillsScore > 0) {
      editForm.communicationSkills[communicationSkillsScore - 1].checked = true;
    }

    const bodyLanguageScore = this.getAttribute('data-bodyLanguage');
    if (bodyLanguageScore > 0) {
      editForm.bodyLanguage[bodyLanguageScore - 1].checked = true;
    }

    const listeningSkillsScore = this.getAttribute('data-listeningSkills');
    if (listeningSkillsScore > 0) {
      editForm.listeningSkills[listeningSkillsScore - 1].checked = true;
    }

    const criticalThinkingScore = this.getAttribute('data-criticalThinking');
    if (criticalThinkingScore > 0) {
      editForm.criticalThinking[criticalThinkingScore - 1].checked = true;
    }

    const leadershipSkillsScore = this.getAttribute('data-leadershipSkills');
    if (leadershipSkillsScore > 0) {
      editForm.leadershipSkills[leadershipSkillsScore - 1].checked = true;
    }
  });
}

// Ask for confirmation before deleting a contact
const deleteBtns = document.querySelectorAll('.delete-student');

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', function () {
    const deleteForm = document.getElementById('delete-student-form');
    deleteForm.action = `/students/${this.getAttribute('data-id')}`;
  });
}

const viewType = document.querySelectorAll("input[name='viewType']");
for (let i = 0; i < viewType.length; i++) {
  viewType[i].addEventListener('change', function () {
    if (viewType[i].value === 'table') {
      document.querySelector('table').classList.remove('d-none');
      document.querySelector('#students').classList.add('d-none');
    } else if (viewType[i].value === 'card') {
      document.querySelector('table').classList.add('d-none');
      document.querySelector('#students').classList.remove('d-none');
    }
  });
}
