import loc from "../../const/locators.mjs";
import { getCookie, setCookie } from "../cookies/cookies.mjs";

let achievement1Complete = false;
let achievement2Complete = false;
let achievement3Complete = false;
let achievementCounter = 3;
let transactionArrayIsNotEmpty = (transactionsArray) => transactionsArray != 0;

function checkAchievements(transactionsArray) {
  achievementOne(transactionsArray);
  achievementTwo(transactionsArray);
  achievementThree(transactionsArray);
}

function achievementOne(transactionsArray) {
  //Achievement One, the user made 777 transaction
  let achievementCookieName = "achievement_1_Complete";
  if (getCookie(achievementCookieName) == undefined) {
    setCookie(achievementCookieName, false);
  }
  if (transactionArrayIsNotEmpty(transactionsArray)) {
    if (
      transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
      achievement1Complete == false &&
      getCookie(achievementCookieName) == false
    ) {
      loc.achievementOne.style.display = "block";
      achievement1Complete = true;
      setCookie(achievementCookieName, true);
    }
  }
}

function achievementTwo(transactionsArray) {
  //Achievement Two, the user made a transaction on the Christmas 12-25
  let achievementCookieName = "achievement_2_Complete";
  if (getCookie(achievementCookieName) == undefined) {
    setCookie(achievementCookieName, false);
  }
  if (transactionArrayIsNotEmpty(transactionsArray)) {
    if (
      transactionsArray[transactionsArray.length - 1].date.includes("-12-25T") &&
      achievement2Complete == false &&
      getCookie(achievementCookieName) == false
    ) {
      loc.achievementTwo.style.display = "block";
      achievement2Complete = true;
      setCookie(achievementCookieName, true);
    }
  }
}

function achievementThree(transactionsArray) {
  //Achievement Three, the user made 3 transactions on the same day
  let achievementCookieName = "achievement_3_Complete";
  if (getCookie(achievementCookieName) == undefined) {
    setCookie(achievementCookieName, false);
  }
  if (transactionArrayIsNotEmpty(transactionsArray)) {
    if (transactionsArray.length >= 3) {
      let transaction3 = transactionsArray[transactionsArray.length - 1].date;
      let transaction1 = transactionsArray[transactionsArray.length - 3].date;

      let transaction3date = new Date(transaction3).getDate();
      let transaction3month = new Date(transaction3).getMonth();
      let transaction3year = new Date(transaction3).getFullYear();
      let transaction1date = new Date(transaction1).getDate();
      let transaction1month = new Date(transaction1).getMonth();
      let transaction1year = new Date(transaction1).getFullYear();
      if (
        transaction3date == transaction1date &&
        transaction3month == transaction1month &&
        transaction3year == transaction1year &&
        getCookie(achievementCookieName) == false
      ) {
        loc.achievementThree.style.display = "block";
        setCookie(achievementCookieName, true);
      }
    }
  }
}

function renderAchievements() {
  for (let i = 1; i <= achievementCounter; i++) {
    let achievementCookie = getCookie(`achievement_${i}_Complete`);
    if (!achievementCookie) {
      loc.achievement(i).style.backgroundColor = "white";
    }
    if (achievementCookie) {
      loc.achievement(i).style.backgroundColor = "limegreen";
      loc.achievement(i).style.color = "white";
      loc.achievement(i).style.display = "block";
    }
  }
}

export { checkAchievements, renderAchievements };
