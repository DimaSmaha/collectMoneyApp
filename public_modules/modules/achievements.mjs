let achievementOneComplete = false;
let achievementTwoComplete = false;
let achievementCounter;

function checkAchievements(transactionsArray) {
  achievementOne(transactionsArray);
  achievementTwo(transactionsArray);
}

function achievementOne(transactionsArray) {
  //Achievement One, the user made 777 transaction
  achievementCounter++;
  if (
    transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
    achievementOneComplete == false &&
    Cookies.get(`achievement_1_Complete`) == undefined
  ) {
    const achievementOne = document.getElementById("achievement_1");
    achievementOne.style.display = "block";
    achievementOneComplete = true;
    Cookies.set("achievement_1_Complete", JSON.stringify(true), {
      expires: 365,
    });
  }
}

function achievementTwo(transactionsArray) {
  //Achievement Two, the user made a transaction on the Christmas 12-25
  achievementCounter++;
  if (
    transactionsArray[transactionsArray.length - 1].date.includes("-12-25T") &&
    achievementTwoComplete == false &&
    Cookies.get(`achievement_2_Complete`) == undefined
  ) {
    const achievementTwo = document.getElementById("achievement_2");
    achievementTwo.style.display = "block";
    achievementTwoComplete = true;
    Cookies.set("achievement_2_Complete", JSON.stringify(true), {
      expires: 365,
    });
  }
}

function renderAchievements() {
  console.log(achievementCounter);
}

export { checkAchievements, renderAchievements };
