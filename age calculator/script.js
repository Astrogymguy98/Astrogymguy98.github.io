// Set max date to today (so users can't select a future date)
document.getElementById("birthdate").max = new Date()
  .toISOString()
  .split("T")[0];

// Get DOM elements
const calculateBtn = document.getElementById("calculate-btn");
const birthdateInput = document.getElementById("birthdate");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error-message");
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

// Add event listener to the calculate button
calculateBtn.addEventListener("click", calculateAge);

// Function to calculate age
function calculateAge() {
  // Get the birthdate value from the input
  const birthdateValue = birthdateInput.value;

  // If no date is selected, show error and return
  if (!birthdateValue) {
    errorDiv.classList.add("show");
    resultDiv.classList.remove("show");
    return;
  }

  // Hide error if previously shown
  errorDiv.classList.remove("show");

  // Convert birthdate string to Date object
  const birthdate = new Date(birthdateValue);
  // Get current date
  const today = new Date();

  // Check if birthdate is valid (not in the future)
  if (birthdate > today) {
    errorDiv.classList.add("show");
    resultDiv.classList.remove("show");
    return;
  }

  // Calculate age in years, months, and days
  let years = today.getFullYear() - birthdate.getFullYear();
  let months = today.getMonth() - birthdate.getMonth();
  let days = today.getDate() - birthdate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    months--;
    // Get the number of days in the previous month
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Update the result elements
  yearsElement.textContent = years;
  monthsElement.textContent = months;
  daysElement.textContent = days;

  // Show the result
  resultDiv.classList.add("show");
}
