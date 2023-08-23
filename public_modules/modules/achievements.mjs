let achievementOneComplete = false;
let achievementTwoComplete = false;

function checkAchievements(transactionsArray) {
  achievementOne(transactionsArray);
  achievementTwo(transactionsArray);
}

function achievementOne(transactionsArray) {
  //Achievement One, the user made 777 transaction
  if (
    transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
    achievementOneComplete == false &&
    Cookies.get(`achievementOneComplete`) == undefined
  ) {
    const achievementOne = document.getElementById("achievement_1");
    achievementOne.style.display = "block";
    achievementOneComplete = true;
    Cookies.set("achievementOneComplete", JSON.stringify(true), {
      expires: 365,
    });
  }
}

function achievementTwo(transactionsArray) {
  //Achievement Two, the user made a transaction on the Christmas 12-25
  if (
    transactionsArray[transactionsArray.length - 1].date.includes("-12-25T") &&
    achievementTwoComplete == false &&
    Cookies.get(`achievementTwoComplete`) == undefined
  ) {
    const achievementTwo = document.getElementById("achievement_2");
    achievementTwo.style.display = "block";
    achievementTwoComplete = true;
    Cookies.set("achievementTwoComplete", JSON.stringify(true), {
      expires: 365,
    });
  }
}

export { checkAchievements };
