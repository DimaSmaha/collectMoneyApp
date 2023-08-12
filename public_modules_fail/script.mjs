let jsonFile;
let totalMoney = 0;
let goalValue = 0;
let isGoalReached = false;
let transactionsArray = [];
// let sloikID;
// sloikID = localStorage.getItem("currentSloikID");

function setTestingCookies() {
  Cookies.set("sloikTitle", JSON.stringify("House"), { expires: 365 });
  Cookies.set("sloikDescription", JSON.stringify("Collecting for a house"), {
    expires: 365,
  });
  Cookies.set("totalMoney", JSON.stringify(876), { expires: 365 });
  Cookies.set("goalValue", JSON.stringify(5000), { expires: 365 });
  Cookies.set("isGoalReached", JSON.stringify(false), { expires: 365 });
  Cookies.set(
    "transactionsList",
    JSON.stringify(
      [
        { transactionSum: 654, date: "2023-07-04T18:03:44.492Z" },
        { transactionSum: 213, date: "2023-07-04T18:04:44.492Z" },
      ],
      { expires: 365 }
    )
  );
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

function removeCookies() {
  Cookies.remove("sloikTitle");
  Cookies.remove("sloikDescription");
  Cookies.remove("totalMoney");
  Cookies.remove("goalValue");
  Cookies.remove("isGoalReached");
  Cookies.remove("transactionsList");
}

// const getData = async () => {
//   // removeCookies();
//   // setTestingCookies();
//   if (document.cookie.length != 0) {
//     getCookiesByID(sloikID);
//   }
//   if (transactionsArray != null) {
//     for (i = 0; i < transactionsArray.length; i++) {
//       totalMoney += transactionsArray[i].transactionSum;
//     }
//   }
//   checkTitleDescriptionAndGoalExistence();
//   checkGoalSumExistence();
//   changeMoneyScore();
//   if (goalValue > 0) {
//     setGoal();
//   }
//   renderTransactions();
//   setProgressBar();
//   showRandomCommendation();
//   console.log(transactionsArray);
//   updateCookies(sloikID);
// };

function recalculateMoneyScore() {
  totalMoney = 0;
  for (i = 0; i < transactionsArray.length; i++) {
    totalMoney += transactionsArray[i].transactionSum;
  }
}

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
  addTransactionDIV();
  setProgressBar();
  checkAchievements();
  showRandomCommendation();
  updateCookies(sloikID);
  return totalMoney;
}

// function getGoal() {
//   const goalSumValue = parseInt(document.getElementById("inputField3").value);
//   goalValue = goalSumValue;
//   return goalValue;
// }

// function setGoal() {
//   let userGoal = document.getElementById("yourGoal");
//   if (goalValue == 0 || goalValue == undefined || goalValue == null) {
//     goalValue = getGoal();
//     updateCookies(sloikID);
//   }
//   let sentence = `Your goal : ${goalValue}`;
//   userGoal.textContent = sentence;
// }

function checkGoal() {
  if (totalMoney >= goalValue) {
    setTimeout(function () {
      alert(
        "Congrats you have reached your goal, you have made a great job. I'm proud of you 💚"
      );
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
  updateCookies(sloikID);
  console.log(transactionsArray);
}

function addTransactionDIV() {
  const getLastElementOfArray = transactionsArray.length - 1;
  console.log(getLastElementOfArray);
  const transactionBoxes = document.getElementById("transactionBoxes");
  transactionBoxes.insertAdjacentHTML(
    "afterbegin",
    `<div
      id="transaction_${getLastElementOfArray}_Box"
      class="transactionBox"
    >
      <p class="transactionText" id="transaction_${getLastElementOfArray}_Text"></p>
      <button class="editTransactionBtn" 
        id="edit_transaction_${getLastElementOfArray}" 
        onclick="editTransaction(${getLastElementOfArray})"><b>Edit</b></button>
      <button class="cancelBtn" 
        id="cancel_transaction_${getLastElementOfArray}" 
        onclick="deleteTransaction(${getLastElementOfArray})"><b>X</b></button>
      </div>`
  );
  const transactionText = document.getElementById(
    `transaction_${getLastElementOfArray}_Text`
  );
  getTransaction = JSON.parse(
    JSON.stringify(transactionsArray[getLastElementOfArray])
  );
  formatDate = new Date(getTransaction.date);
  transactionText.innerHTML = `Transaction sum: ${
    getTransaction.transactionSum
  } </br>
  Date: ${formatDate.toLocaleString()}`;
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

function deleteTransaction(transaction_id) {
  const transactionBox = document.getElementById(
    `transaction_${transaction_id}_Box`
  );
  transactionBox.remove();
  totalMoney -= transactionsArray[transaction_id].transactionSum;
  changeMoneyScore();
  transactionsArray.splice(transaction_id, 1);
  const transactionBoxes = document.getElementById("transactionBoxes");
  transactionBoxes.replaceChildren();
  renderTransactions();
  setProgressBar();
  updateCookies(sloikID);
  console.log(transactionsArray);
}

function editTransaction(transaction_id) {
  const transactionBox = document.getElementById(
    `transaction_${transaction_id}_Box`
  );
  setTransactionBoxChildsDisplay(transaction_id, "none");
  transactionBox.insertAdjacentHTML(
    "afterbegin",
    `<input type="number" id="editMoneyInput_${transaction_id}" placeholder="edit your transaction"/>
    <button class="acceptBtn" 
      id="accept_edit_transaction_${transaction_id}" 
      onclick="acceptEditTransaction(${transaction_id})"><b>V</b></button>
    <button class="cancelBtn" 
      id="decline_edit_transaction_${transaction_id}" 
      onclick="setTransactionBoxChildsDisplay(${transaction_id},'flex'); 
      setTransactionBoxEditElementsDisplay(${transaction_id},'none')"><b>X</b></button>`
  );
}

function setTransactionBoxChildsDisplay(transaction_id, display) {
  const transactionText = document.getElementById(
    `transaction_${transaction_id}_Text`
  );
  const transactionEdit = document.getElementById(
    `edit_transaction_${transaction_id}`
  );
  const transactionCancel = document.getElementById(
    `cancel_transaction_${transaction_id}`
  );

  transactionText.style.display = display;
  transactionEdit.style.display = display;
  transactionCancel.style.display = display;
}

function setTransactionBoxEditElementsDisplay(transaction_id, display) {
  const transactionEditInput = document.getElementById(
    `editMoneyInput_${transaction_id}`
  );
  const transactionEditAccept = document.getElementById(
    `accept_edit_transaction_${transaction_id}`
  );
  const transactionEditDecline = document.getElementById(
    `decline_edit_transaction_${transaction_id}`
  );

  transactionEditInput.style.display = display;
  transactionEditAccept.style.display = display;
  transactionEditDecline.style.display = display;
}

function acceptEditTransaction(transaction_id) {
  const transactionEditInput = document.getElementById(
    `editMoneyInput_${transaction_id}`
  );
  const editedSum = parseInt(transactionEditInput.value);
  if (isNaN(editedSum) == false && editedSum > 0) {
    transactionsArray[transaction_id].transactionSum = editedSum;
    const transactionBoxes = document.getElementById("transactionBoxes");
    transactionBoxes.replaceChildren();
    renderTransactions();
    recalculateMoneyScore();
    changeMoneyScore();
    setProgressBar();
    updateCookies(sloikID);
    if (totalMoney < goalValue || !isGoalReached) {
      checkGoal();
    }
    if (totalMoney < goalValue) {
      isGoalReached = false;
    }
  }
  transactionEditInput.value = "";
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

function editGoal() {
  const goalBox = document.getElementById("goalBox");
  const editGoalBtn = document.getElementById("edit_goal_button");
  editGoalBtn.style.display = "none";
  goalBox.insertAdjacentHTML(
    "beforeend",
    `<input type="number" id="editGoalInput" placeholder="edit your goal"/>
    <button class="acceptBtn" 
      id="accept_edit_goal" 
      onclick="acceptEditGoal()"><b>V</b></button>
    <button class="cancelBtn" 
      id="cancel_edit_goal" 
      onclick="setEditGoalBtnDisplay('flex'); 
      removeEditGoalElementsDisplay()"><b>X</b></button>`
  );
}

function setEditGoalBtnDisplay(display) {
  const editGoalBtn = document.getElementById("edit_goal_button");
  editGoalBtn.style.display = display;
}

function removeEditGoalElementsDisplay() {
  const editGoalInput = document.getElementById("editGoalInput");
  const acceptEditGoal = document.getElementById("accept_edit_goal");
  const cancelEditGoal = document.getElementById("cancel_edit_goal");

  editGoalInput.remove();
  acceptEditGoal.remove();
  cancelEditGoal.remove();
}

function acceptEditGoal() {
  const editGoalInput = document.getElementById("editGoalInput");
  const editedGoal = parseInt(editGoalInput.value);
  if (isNaN(editedGoal) == false && editedGoal > 0) {
    goalValue = editedGoal;
    removeEditGoalElementsDisplay();
    setEditGoalBtnDisplay("flex");
    setProgressBar();
    setGoal();
    updateCookies(sloikID);
  }
  editGoalInput.value = "";
}

let achievementOneComplete = false;
let achievementTwoComplete = false;
function checkAchievements() {
  //Achievement One, the user made 777 transaction
  if (
    transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
    achievementOneComplete == false
  ) {
    const achievementOne = document.getElementById("achievement_1");
    achievementOne.style.display = "block";
    achievementOneComplete = true;
  }
  //Achievement Two, the user made a transaction on the Christmas 12-25
  if (
    transactionsArray[transactionsArray.length - 1].date.includes("-12-25T") &&
    achievementTwoComplete == false
  ) {
    const achievementTwo = document.getElementById("achievement_2");
    achievementTwo.style.display = "block";
    achievementTwoComplete = true;
  }
}

// function checkTitleDescriptionAndGoalExistence() {
//   const sloikTitle = document.getElementById("sloikTitle");
//   const sloikDescription = document.getElementById("sloikDescription");
//   if (
//     sloikTitle.textContent.trim().length == 0 ||
//     sloikDescription.textContent.trim().length == 0
//   ) {
//     showPopup();
//   }
// }

// function checkGoalSumExistence() {
//   const goalSumInput = document.getElementById("inputField3");
//   if (goalValue != 0 || goalValue == undefined) {
//     goalSumInput.remove();
//   }
// }

function submitForm() {
  const sloikTitle = document.getElementById("sloikTitle");
  const sloikDescription = document.getElementById("sloikDescription");
  const titleValue = document.getElementById("inputField1").value;
  const descriptionValue = document.getElementById("inputField2").value;
  const goalSum = document.getElementById("inputField3");
  if (goalSum != null) {
    const goalSumValue = document.getElementById("inputField3").value;
    if (
      titleValue != "" &&
      descriptionValue != "" &&
      isNaN(goalSumValue) == false &&
      goalSumValue > 0
    ) {
      sloikTitle.textContent = titleValue;
      sloikDescription.textContent = descriptionValue;
      setGoal();
      setProgressBar();
      hidePopup();
      updateCookies(sloikID);
    }
  } else {
    sloikTitle.textContent = titleValue;
    sloikDescription.textContent = descriptionValue;
    hidePopup();
  }
}

// function showPopup() {
//   const popup = document.getElementById("popupContainer");
//   popup.style.display = "block";
// }

// function hidePopup() {
//   const popup = document.getElementById("popupContainer");
//   popup.style.display = "none";
// }

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

// let sloikTitle = "";
// let sloikDescription = "";
// function addSloikData() {
//   let titleValue = document.getElementById("inputField1").value;
//   let descriptionValue = document.getElementById("inputField2").value;
//   let goalSumValue = document.getElementById("inputField3").value;
//   let titleInput = document.getElementById("inputField1");
//   let descriptionInput = document.getElementById("inputField2");
//   let goalSumInput = document.getElementById("inputField3");
//   if (
//     titleValue != "" &&
//     descriptionValue != "" &&
//     isNaN(goalSumValue) == false &&
//     goalSumValue > 0
//   ) {
//     sloikTitle = titleValue;
//     sloikDescription = descriptionValue;
//     hidePopup();
//     renderSloik();
//     setupSloikCookies(numberOfChildren);
//     titleInput.value = "";
//     descriptionInput.value = "";
//     goalSumInput.value = "";
//   }
// }

// let numberOfChildren;
// let sloikCounter = 0;
// function renderSloik() {
//   if (Cookies.get("sloiksCounter") != undefined) {
//     sloikCounter = Cookies.get("sloiksCounter");
//   }
//   const sloiksList = document.getElementById("sloiksList");
//   numberOfChildren = sloiksList.children.length;
//   sloikCounter++;
//   Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
//   sloiksList.insertAdjacentHTML(
//     "beforeend",
//     `<div>
//       <nav>
//       <a id="sloik_${numberOfChildren}" class="sloikNavigation"
//       href="/public/sloik.html" onclick="getSloikID(${numberOfChildren});">
//       ${sloikTitle} Sloik</a>
//       </nav>
//     </div>`
//   );
// }

// function renderExistingSloiks() {
//   let sloikCounter = Cookies.get("sloiksCounter");
//   const sloiksList = document.getElementById("sloiksList");
//   for (i = 0; i < sloikCounter; i++) {
//     sloiksList.insertAdjacentHTML(
//       "beforeend",
//       `<div>
//       <nav>
//       <a id="sloik_${i}" class="sloikNavigation"
//       href="/public/sloik.html" onclick="getSloikID(${i});">
//       ${JSON.parse(Cookies.get(`sloikTitle_${i}`))} Sloik</a>
//       </nav>
//     </div>`
//     );
//   }
// }

// function setupSloikCookies(numberOfChildren) {
//   const goalSumValue = document.getElementById("inputField3").value;
//   Cookies.set(`sloikTitle_${numberOfChildren}`, JSON.stringify(sloikTitle), {
//     expires: 365,
//   });
//   Cookies.set(
//     `sloikDescription_${numberOfChildren}`,
//     JSON.stringify(sloikDescription),
//     {
//       expires: 365,
//     }
//   );
//   Cookies.set(`totalMoney_${numberOfChildren}`, JSON.stringify(totalMoney), {
//     expires: 365,
//   });
//   Cookies.set(`goalValue_${numberOfChildren}`, JSON.stringify(goalSumValue), {
//     expires: 365,
//   });
//   Cookies.set(
//     `isGoalReached_${numberOfChildren}`,
//     JSON.stringify(isGoalReached),
//     { expires: 365 }
//   );
//   Cookies.set(
//     `transactionsList_${numberOfChildren}`,
//     JSON.stringify(transactionsArray),
//     { expires: 365 }
//   );
// }

// function getSloikID(sloikNumber) {
//   sloikID = sloikNumber;
//   localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
// }

// function getCookiesByID(sloikNumber) {
//   document.getElementById("sloikTitle").textContent = JSON.parse(
//     Cookies.get(`sloikTitle_${sloikNumber}`)
//   );
//   document.getElementById("sloikDescription").textContent = JSON.parse(
//     Cookies.get(`sloikDescription_${sloikNumber}`)
//   );
//   goalValue = JSON.parse(Cookies.get(`goalValue_${sloikNumber}`));
//   isGoalReached = JSON.parse(Cookies.get(`isGoalReached_${sloikNumber}`));
//   transactionsArray = JSON.parse(
//     Cookies.get(`transactionsList_${sloikNumber}`)
//   );
// }

import {
  renderExistingSloiks,
  addSloikData,
} from "./modules/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/popup.mjs";

window.onload = function () {
  if (document.title == "SloikApp Home") {
    renderExistingSloiks();
  }
};
const addSloikBtn = document.getElementById("add_sloik");
addSloikBtn.onclick = function () {
  showPopup();
};
const submitPopupBtn = document.getElementById("submitBtn");
submitPopupBtn.onclick = function () {
  if (document.title == "SloikApp Home") {
    addSloikData(totalMoney, isGoalReached, transactionsArray);
  }
};

// const getData = async () => {
//   const response = await fetch("/public/data.json");
//   const data = await response.json();
//   jsonFile = data;
//   totalMoney = 0;
//   goalValue = jsonFile.goalValue;
//   isGoalReached = jsonFile.isGoalReached;
//   transactionsArray = jsonFile.transactionsList;
//   if (jsonFile.hasOwnProperty("transactionsList")) {
//     for (i = 0; i < transactionsArray.length; i++) {
//       totalMoney += transactionsArray[i].transactionSum;
//     }
//   }
//   checkTitleDescriptionAndGoalExistence();
//   checkGoalSumExistence();
//   changeMoneyScore();
//   if (goalValue > 0) {
//     setGoal();
//   }
//   renderTransactions();
//   setProgressBar();
//   showRandomCommendation();
//   console.log(transactionsArray);
// };

// function setLocalStorageSloikDescription() {
//   const sloikTitle = document.getElementById("sloikTitle");
//   const sloikDescription = document.getElementById("sloikDescription");
//   localStorage.setItem("sloikTitle", JSON.stringify(sloikTitle.textContent));
//   localStorage.setItem(
//     "sloikDescription",
//     JSON.stringify(sloikDescription.textContent)
//   );
// }

// function setLocalStorageItems() {
//   setLocalStorageSloikDescription();
//   localStorage.setItem("totalMoney", JSON.stringify(totalMoney));
//   localStorage.setItem("goalValue", JSON.stringify(goalValue));
//   localStorage.setItem("isGoalReached", JSON.stringify(isGoalReached));
//   localStorage.setItem("transactionsList", JSON.stringify(transactionsArray));
// }

// function setTestingData() {
//   localStorage.setItem("sloikTitle", JSON.stringify("House"));
//   localStorage.setItem(
//     "sloikDescription",
//     JSON.stringify("Collecting for a house")
//   );
//   localStorage.setItem("totalMoney", JSON.stringify(876));
//   localStorage.setItem("goalValue", JSON.stringify(5000));
//   localStorage.setItem("isGoalReached", JSON.stringify(false));
//   localStorage.setItem(
//     "transactionsList",
//     JSON.stringify([
//       { transactionSum: 654, date: "2023-07-04T18:03:44.492Z" },
//       { transactionSum: 213, date: "2023-07-04T18:04:44.492Z" },
//     ])
//   );
// }

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
