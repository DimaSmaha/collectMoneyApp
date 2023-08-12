let sloikID;
sloikID = localStorage.getItem("currentSloikID");
let totalMoney = 0;
let goalValue = 0;
let isGoalReached = false;
let transactionsArray = [];

const getData = async () => {
  // removeCookies();
  // setTestingCookies();
  if (document.cookie.length != 0) {
    getCookiesByID(sloikID);
  }
  if (transactionsArray != null) {
    for (let i = 0; i < transactionsArray.length; i++) {
      totalMoney += transactionsArray[i].transactionSum;
    }
  }
  checkTitleDescriptionAndGoalExistence();
  checkGoalSumExistence();
  changeMoneyScore();
  if (goalValue > 0) {
    setGoal();
  }
  renderTransactions();
  setProgressBar();
  showRandomCommendation();
  console.log(transactionsArray);
  updateCookies(sloikID);
};

function getCookiesByID(sloikNumber) {
  document.getElementById("sloikTitle").textContent = JSON.parse(
    Cookies.get(`sloikTitle_${sloikNumber}`)
  );
  document.getElementById("sloikDescription").textContent = JSON.parse(
    Cookies.get(`sloikDescription_${sloikNumber}`)
  );
  goalValue = JSON.parse(Cookies.get(`goalValue_${sloikNumber}`));
  isGoalReached = JSON.parse(Cookies.get(`isGoalReached_${sloikNumber}`));
  transactionsArray = JSON.parse(
    Cookies.get(`transactionsList_${sloikNumber}`)
  );
  return goalValue, isGoalReached, transactionsArray;
}

function checkTitleDescriptionAndGoalExistence() {
  const sloikTitle = document.getElementById("sloikTitle");
  const sloikDescription = document.getElementById("sloikDescription");
  if (
    sloikTitle.textContent.trim().length == 0 ||
    sloikDescription.textContent.trim().length == 0
  ) {
    showPopup();
  }
}

function checkGoalSumExistence() {
  const goalSumInput = document.getElementById("inputField3");
  if (goalValue != 0 || goalValue == undefined) {
    goalSumInput.remove();
  }
}

function changeMoneyScore() {
  let yourMoneyScore = document.getElementById("yourMoneyScore");
  let sentence = `Your money : ${totalMoney}`;
  yourMoneyScore.textContent = sentence;
}

function getGoal() {
  const goalSumValue = parseInt(document.getElementById("inputField3").value);
  goalValue = goalSumValue;
  return goalValue;
}

function setGoal() {
  let userGoal = document.getElementById("yourGoal");
  if (goalValue == 0 || goalValue == undefined || goalValue == null) {
    goalValue = getGoal();
    updateCookies(sloikID);
  }
  let sentence = `Your goal : ${goalValue}`;
  userGoal.textContent = sentence;
}

function renderTransactions() {
  const transactionBoxes = document.getElementById("transactionBoxes");
  for (let i = 0; i < transactionsArray.length; i++) {
    transactionBoxes.insertAdjacentHTML(
      "afterbegin",
      `<div
        id="transaction_${i}_Box"
        class="transactionBox">
        <p class="transactionText" id="transaction_${i}_Text"></p>
        <button class="editTransactionBtn" 
          id="edit_transaction_${i}" 
          onclick="editTransaction(${i})"><b>Edit</b></button>
        <button class="cancelBtn" 
          id="cancel_transaction_${i}" 
          onclick="deleteTransaction(${i})"><b>X</b></button>
      </div>`
    );
    const transactionText = document.getElementById(`transaction_${i}_Text`);
    getTransaction = JSON.parse(JSON.stringify(transactionsArray[i]));
    formatDate = new Date(getTransaction.date);
    transactionText.innerHTML = `Transaction sum: ${
      getTransaction.transactionSum
    } </br>
    Date: ${formatDate.toLocaleString()}`;
  }
}

function setProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const progressBarText = document.getElementById("progressBarText");
  const progressBarPercentage = (totalMoney / goalValue) * 100;
  if (totalMoney <= goalValue) {
    progressBar.style.width = `${progressBarPercentage}%`;
    progressBarText.textContent = `${Math.round(progressBarPercentage)}%`;
  }
  if (totalMoney >= goalValue) {
    progressBar.style.width = "100%";
    progressBarText.textContent = `${Math.round(progressBarPercentage)}%`;
  }
}

function showRandomCommendation() {
  const commendation = document.getElementById("commendation");
  const commendationText = document.getElementById("commendation_text");
  const commendationsList = [
    "Your dedication to collecting money is commendable.",
    "I admire your perseverance despite the challenges.",
    "I'm impressed by your perseverance despite the challenges.",
    "Patient and determined in saving for the future.",
    "Your commitment to your goals is inspiring.",
    "Inspiring others with your saving habits.",
    "Keep pushing forward - your efforts will pay off.",
    "Your efforts are making a difference, keep going!",
    "Setting a great example of financial wisdom.",
    "You've got this! Stay focused and stay positive.",
  ];
  let getRandomChar = Math.floor(Math.random() * commendationsList.length);
  commendation.style.display = "block";
  commendationText.textContent = commendationsList[getRandomChar];
  if (transactionsArray.length == 0) {
    commendation.style.display = "none";
  }
  if (transactionsArray.length == 1) {
    commendation.style.display = "block";
    commendationText.textContent =
      "Its your first transaction. Great job you have started your journey";
  }
}

function updateCookies(sloikID) {
  const sloikTitle = document.getElementById("sloikTitle");
  const sloikDescription = document.getElementById("sloikDescription");
  Cookies.set(`sloikTitle_${sloikID}`, JSON.stringify(sloikTitle.textContent), {
    expires: 365,
  });
  Cookies.set(
    `sloikDescription_${sloikID}`,
    JSON.stringify(sloikDescription.textContent),
    { expires: 365 }
  );
  Cookies.set(`totalMoney_${sloikID}`, JSON.stringify(totalMoney), {
    expires: 365,
  });
  Cookies.set(`goalValue_${sloikID}`, JSON.stringify(goalValue), {
    expires: 365,
  });
  Cookies.set(`isGoalReached_${sloikID}`, JSON.stringify(isGoalReached), {
    expires: 365,
  });
  Cookies.set(
    `transactionsList_${sloikID}`,
    JSON.stringify(transactionsArray),
    {
      expires: 365,
    }
  );
}

export { getData };
