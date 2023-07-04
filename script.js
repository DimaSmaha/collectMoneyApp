let jsonFile;
let totalMoney;
const getData = async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
  jsonFile = data;
  totalMoney = jsonFile.totalMoney;
  changeMoneyScore();
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
  return totalMoney;
}

function getGoal() {
  const getGoal = prompt("Add Your Goal");
  return getGoal;
}

function setGoal() {
  const userGoal = document.getElementById("yourGoal");
  const goalSum = parseInt(getGoal());
  let sentence = `Your goal : ${goalSum}`;
  userGoal.textContent = sentence;
}

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
