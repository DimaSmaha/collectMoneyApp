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
