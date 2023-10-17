let errorText = document.getElementById("error");
let btn = document.getElementById("btn");
let input = document.querySelectorAll(".input");
let form = document.getElementById("form");
let averageGrade = document.getElementById("average-grade");
let tableOutput = document.getElementById("table-output");

function hideError() {
  setTimeout(() => {
    errorText.style.display = "none";
  }, 3000);
}

form.addEventListener("submit", calculateGrade);
let totalScore = 0; // Initialize the total score variable

let formSubmitted = false; // Add a flag to track whether the form has been submitted

function calculateGrade(e) {
  e.preventDefault();

  if (formSubmitted) {
    // If the form has already been submitted, do nothing
    return;
  }

  let hasInvalidScore = false;
  input.forEach((inputEl) => {
    let studentScore = Number(inputEl.value); // Convert input value to a number
    let courseTitle = inputEl.getAttribute("id");
    let studentGrade = computeGrade(studentScore);

    if (studentScore === "") {
      studentScore = 0; // Set the score to 0 if it's an empty string
    } else if (studentScore > 100) {
      hasInvalidScore = true;
      if (hasInvalidScore) {
        errorText.innerHTML = `input greater than 100 cannot be added!!!`;
        errorText.style.display = "block";
        errorText.style.color = "red";
        errorText.style.backgroundColor = "#ffe5e5";
        hideError();
        formSubmitted = true;
        btn.style.display = "block";

        return;
      }
    }

    if (!hasInvalidScore) {
      // Only update the table if all scores are valid
      tableOutput.innerHTML += `
        <div class="table-row">
          <div class="table-cell">
            <p>${courseTitle}</p>
          </div>
          <div class="table-cell">
            <p id="eng-s">${studentScore}</p>
          </div>
          <div class="table-cell">
            <p id="eng-g">${studentGrade}</p>
          </div>
        </div>
      `;

      btn.style.display = "none";

      errorText.style.display = "block";
      errorText.style.color = "green";
      errorText.style.backgroundColor = "#ade4db";
      errorText.innerHTML = "Submitted";
      hideError();

      tableOutput.style.display = "block";

      formSubmitted = true; // Set the flag to true after submitting the form
    }
    totalScore += studentScore; // Add the current student's score to the total
    let average = (totalScore / 8).toFixed(1);
    document.getElementById("average").innerHTML = average; // Display the total score
    calculateAverage(average);

    inputEl.value = "";
  });
}

function computeGrade(score) {
  if (score >= 85) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 55) {
    return "C";
  } else if (score >= 40) {
    return "P";
  } else if (score <= 39) {
    return "F";
  }
}

function calculateAverage(gradeScore) {
  if (gradeScore >= 85) {
    averageGrade.innerHTML = "Distinction";
  } else if (gradeScore >= 70) {
    averageGrade.innerHTML = "Very Good";
  } else if (gradeScore >= 55) {
    averageGrade.innerHTML = "Credit";
  } else if (gradeScore >= 40) {
    averageGrade.innerHTML = "Pass";
  } else if (gradeScore <= 39) {
    averageGrade.innerHTML = "Fail";
  }
}
