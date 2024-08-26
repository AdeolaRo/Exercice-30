
class Student {
    constructor(nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    creerStudent() {
        return `${this.prenom} ${this.nom}`;
    }
}

let newStudent = new Student("CHITOU", "Abdel");
newStudent.creerStudent();

class StudentNote {
    constructor(student, subject, note) {
        this.student = student;
        this.subject = subject;
        this.note = parseFloat(note);
    }

    creerStudentNote() {
        return `${this.student.prenom} ${this.student.nom} ${this.subject} ${this.note}`;
    }
}


const students = [];
const subjects = [];
const grades = [];


document.getElementById('add-student-visibility').addEventListener('click', () => {
    document.getElementById('add-student-form').classList.toggle('hidden');
});

document.getElementById('add-lessonfield-visibility').addEventListener('click', () => {
    document.getElementById('add-lessonfield-form').classList.toggle('hidden');
});

document.getElementById('add-grade-visibility').addEventListener('click', () => {
    document.getElementById('add-grade-form').classList.toggle('hidden');
});


document.getElementById('btnajoutstudent').addEventListener('click', () => {
    const lastname = document.getElementById('student-lastname').value;
    const firstname = document.getElementById('student-firstname').value;

    if (lastname && firstname) {
        const student = new Student(lastname, firstname);
        students.push(student);
        addStudent(student);
        resetForm('add-student-form');
    }
});

function addStudent(student) {
    const studentChoice = document.getElementById('student-choice');
    const gradeStudent = document.getElementById('grade-student');
    const option = document.createElement('option');
    option.text = student.creerStudent();
    studentChoice.add(option);
    gradeStudent.add(option.cloneNode(true));  
}


document.getElementById('btnajoutmatiere').addEventListener('click', () => {
    const subject = document.getElementById('lesson-field').value;

    if (subject) {
        subjects.push(subject);
        addSubject(subject);
        resetForm('add-lessonfield-form');
    }
});

function addSubject(subject) {
    const subjectChoice = document.getElementById('lessonfield-choice');
    const gradeField = document.getElementById('grade-field');
    const option = document.createElement('option');
    option.text = subject;
    subjectChoice.add(option);
    gradeField.add(option.cloneNode(true));  
}


document.getElementById('btnajoutnote').addEventListener('click', () => {
    const studentName = document.getElementById('grade-student').value;
    const subject = document.getElementById('grade-field').value;
    const gradeValue = document.getElementById('grade').value;

    const student = students.find(student => student.creerStudent() === studentName);
    if (student && subject && gradeValue) {
        const grade = new StudentNote(student, subject, gradeValue);
        grades.push(grade);
        resetForm('add-grade-form');
    }
});


function calculateAverageGrade() {
    const studentName = document.getElementById('student-choice').value;
    const subject = document.getElementById('lessonfield-choice').value;
    let filteredGrades;

    if (studentName !== "Choisir un élève" && subject !== "Choisir une matière") {
     
        filteredGrades = grades.filter(g => g.student.creerStudent() === studentName && g.subject === subject);
    } else if (studentName !== "Choisir un élève") {
    
        filteredGrades = grades.filter(g => g.student.creerStudent() === studentName);
    } else if (subject !== "Choisir une matière") {
    
        filteredGrades = grades.filter(g => g.subject === subject);
    } else {
             filteredGrades = grades;
    }

    if (filteredGrades.length > 0) {
        const total = filteredGrades.reduce((acc, curr) => acc + curr.note, 0);
        const average = total / filteredGrades.length;
        document.getElementById('average-grade').innerHTML = `Moyenne: ${average.toFixed(2)}`;
    } else {
        document.getElementById('average-grade').innerHTML = '';
    }
}

function updateGradeTable(filteredGrades = grades) {
    const tableBody = document.getElementById('table-data-body');
    tableBody.innerHTML = ''; 

    filteredGrades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.student.nom}</td>
                         <td>${grade.student.prenom}</td>
                         <td>${grade.subject}</td>
                         <td>${grade.note}</td>`;
        tableBody.appendChild(row);
    });

 
    if (filteredGrades.length > 0) {
        document.getElementById('table-data').classList.remove('hidden');
    } else {
        document.getElementById('table-data').classList.add('hidden');
    }
}


document.getElementById('student-choice').addEventListener('change', calculateAverageGrade);
document.getElementById('lessonfield-choice').addEventListener('change', calculateAverageGrade);


function resetForm(formId) {
    document.getElementById(formId).querySelectorAll('input, select').forEach(input => input.value = '');
   
}

