let jsonFile;
let totalMoney;
let goalValue;
let isGoalReached;
let transactionsArray = [];

const getData = async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
  jsonFile = data;
  totalMoney = jsonFile.totalMoney;
  goalValue = jsonFile.goalValue;
  isGoalReached = jsonFile.isGoalReached;
  transactionsArray = jsonFile.transactionsList;
  changeMoneyScore();
  setGoal();
  formTransactionDIV();
  console.log(transactionsArray);
};

function changeMoneyScore() {
  let yourMoneyScore = document.getElementById("yourMoneyScore");
  let sentence = `Your money : ${totalMoney}`;
  yourMoneyScore.textContent = sentence;
}

function addMoney() {
  const errorNegative = document.getElementById("errorNegativeNumber");
  const errorNotNumber = document.getElementById("errorNotNumber");
  const moneyInput = document.getElementById("addMoneyInput");
  const addedMoney = moneyInput.value;
  const moneyToBeAdded = parseInt(addedMoney);
  if (isNaN(moneyToBeAdded)) {
    moneyInput.value = "";
    errorNotNumber.style.display = "flex";
    return setTimeout(function () {
      errorNotNumber.style.display = "none";
    }, 2000);
  }
  if (moneyToBeAdded <= 0) {
    moneyInput.value = "";
    errorNegative.style.display = "flex";
    return setTimeout(function () {
      errorNegative.style.display = "none";
    }, 2000);
  }
  totalMoney += moneyToBeAdded;
  console.log(totalMoney);
  moneyInput.value = "";
  // updateJSONFile();
  formArray(moneyToBeAdded);
  if (totalMoney < goalValue || !isGoalReached) {
    checkGoal();
  }
  return totalMoney;
}

function getGoal() {
  goalValue = prompt("Add Your Goal");
  return goalValue;
}

function setGoal() {
  let userGoal = document.getElementById("yourGoal");
  if (goalValue == 0 || goalValue == undefined) {
    goalValue = parseInt(getGoal());
  }
  let sentence = `Your goal : ${goalValue}`;
  userGoal.textContent = sentence;
}

function checkGoal() {
  if (totalMoney >= goalValue) {
    setTimeout(function () {
      alert("congrats");
    }, 500);
    isGoalReached = true;
  }
}

class Transactions {
  constructor(sum) {
    this.transactionSum = sum;
    this.date = new Date();
  }
}

function formArray(addedMoney) {
  transactionsArray.push(
    JSON.parse(JSON.stringify(new Transactions(addedMoney)))
  );
  console.log(transactionsArray);
}

function formTransactionDIV() {
  const transactionDIV = document.getElementById("transaction_1_Box");
  const transactionText = document.getElementById("transaction_1_Text");
  // for (let i = 0; i < transactionsArray.length; i++) {
  //   transactionText.value = transactionsArray[i];
  // }
  getTransaction = JSON.parse(JSON.stringify(transactionsArray[0]));
  formatDate = new Date(getTransaction.date);
  transactionText.innerHTML = `Transaction sum: ${
    getTransaction.transactionSum
  } </br>
  Date: ${formatDate.toLocaleString()}`;
}

/// add that transaction be shown on the screen

// async function updateJSONFile() {
//   jsonFile.totalMoney = totalMoney;
//   const jsonString = JSON.stringify(jsonFile);

//   const response = await fetch("/data.json", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: jsonString,
//   });

//   if (response.ok) {
//     console.log("JSON file updated successfully.");
//   } else {
//     console.error("Error updating JSON file:", response.status);
//   }
// }
