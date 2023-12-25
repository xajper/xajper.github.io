let grades = [];
  
function addGrade() {
  let subject = document.getElementById("subject").value;
  let grade = parseInt(document.getElementById("grade").value);
  let weight = parseInt(document.getElementById("weight").value);

  let newGrade = {subject: subject, grade: grade, weight: weight};
  grades.push(newGrade);

  let gradesTable = document.getElementById("gradesTable");
  let newRow = gradesTable.insertRow(-1);
  let subjectCell = newRow.insertCell(0);
  let gradeCell = newRow.insertCell(1);
  let weightCell = newRow.insertCell(2);
  subjectCell.innerHTML = subject;
  gradeCell.innerHTML = grade;
  weightCell.innerHTML = weight;

  updateAverage();
}

function updateAverage() {
    let totalGrade = 0;
    let totalWeight = 0;
    let weightedAverage = document.getElementById("weightedAverage").checked;
  
    for (let i = 0; i < grades.length; i++) {
      let grade = grades[i];
      totalGrade += grade.grade * (weightedAverage ? grade.weight : 1);
      totalWeight += (weightedAverage ? grade.weight : 1);
    }
  
    let average = totalGrade / totalWeight;
    document.getElementById("average").innerHTML = average.toFixed(2);
  }


function toggleWeightField() {
    let weightField = document.getElementById("weight");
    let weightedAverageCheckbox = document.getElementById("weightedAverage");

    weightField.disabled = !weightedAverageCheckbox.checked;

    if (!weightedAverageCheckbox.checked) {
      weightField.value = "";
    }
}