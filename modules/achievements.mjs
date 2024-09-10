import { getCookie, setCookie } from "./cookies.mjs";

let achievement1Complete = false;
let achievement2Complete = false;
let achievement3Complete = false;
let achievementCounter = 3;

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
  if (transactionsArray != 0) {
    if (
      transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
      achievement1Complete == false &&
      getCookie(achievementCookieName) == false
    ) {
      const achievementOne = document.getElementById("achievement_1");
      achievementOne.style.display = "block";
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
  if (transactionsArray != 0) {
    if (
      transactionsArray[transactionsArray.length - 1].date.includes("-12-25T") &&
      achievement2Complete == false &&
      getCookie(achievementCookieName) == false
    ) {
      const achievementTwo = document.getElementById("achievement_2");
      achievementTwo.style.display = "block";
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
  if (transactionsArray != 0) {
    if (transactionsArray.length >= 3) {
      let transaction3 = transactionsArray[transactionsArray.length - 1].date;
      let transaction1 = transactionsArray[transactionsArray.length - 3].date;

      let transaction3date = new Date(transaction3).getDate();
      let transaction3month = new Date(transaction3).getMonth();
      let transaction3year = new Date(transaction3).getFullYear();
      let transaction1date = new Date(transaction3).getDate();
      let transaction1month = new Date(transaction3).getMonth();
      let transaction1year = new Date(transaction3).getFullYear();
      if (
        transaction3date == transaction1date &&
        transaction3month == transaction1month &&
        transaction3year == transaction1year &&
        getCookie(achievementCookieName) == false
      ) {
        const achievementThree = document.getElementById("achievement_3");
        achievementThree.style.display = "block";
        setCookie(achievementCookieName, true);
      }
    }
  }
}

function renderAchievements() {
  // let achievementCounter = getCookie(`achievementCounter`);
  console.log(achievementCounter);
  for (let i = 1; i <= achievementCounter; i++) {
    let achievementCookie = getCookie(`achievement_${i}_Complete`);
    const achievement = document.getElementById(`achievement_${i}`);
    console.log(achievementCookie);
    if (!achievementCookie) {
      achievement.style.backgroundColor = "white";
    }
    if (achievementCookie) {
      achievement.style.backgroundColor = "limegreen";
      achievement.style.color = "white";
      achievement.style.display = "block";
    }
  }
}

export { checkAchievements, renderAchievements };
