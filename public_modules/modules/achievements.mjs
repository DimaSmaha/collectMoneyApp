let achievement1Complete = false;
let achievement2Complete = false;
let achievementCounter = 3;

function checkAchievements(transactionsArray) {
  achievementOne(transactionsArray);
  achievementTwo(transactionsArray);
  achievementThree(transactionsArray);
}

function achievementOne(transactionsArray) {
  //Achievement One, the user made 777 transaction
  let achievementCookieName = "achievement_1_Complete";
  if (Cookies.get(achievementCookieName) == undefined) {
    Cookies.set(achievementCookieName, JSON.stringify(false), {
      expires: 365,
    });
  }
  if (transactionsArray != 0) {
    if (
      transactionsArray[transactionsArray.length - 1].transactionSum == 777 &&
      achievement1Complete == false &&
      JSON.parse(Cookies.get(achievementCookieName)) == false
    ) {
      const achievementOne = document.getElementById("achievement_1");
      achievementOne.style.display = "block";
      achievement1Complete = true;
      Cookies.set(achievementCookieName, JSON.stringify(true), {
        expires: 365,
      });
    }
  }
}

function achievementTwo(transactionsArray) {
  //Achievement Two, the user made a transaction on the Christmas 12-25
  let achievementCookieName = "achievement_2_Complete";
  if (Cookies.get(achievementCookieName) == undefined) {
    Cookies.set(achievementCookieName, JSON.stringify(false), {
      expires: 365,
    });
  }
  if (transactionsArray != 0) {
    if (
      transactionsArray[transactionsArray.length - 1].date.includes(
        "-12-25T"
      ) &&
      achievement2Complete == false &&
      JSON.parse(Cookies.get(achievementCookieName)) == false
    ) {
      const achievementTwo = document.getElementById("achievement_2");
      achievementTwo.style.display = "block";
      achievement2Complete = true;
      Cookies.set(achievementCookieName, JSON.stringify(true), {
        expires: 365,
      });
    }
  }
}

function achievementThree(transactionsArray) {
  //Achievement Three, the user made 3 transactions on the same day
  let achievementCookieName = "achievement_3_Complete";
  if (Cookies.get(achievementCookieName) == undefined) {
    Cookies.set(achievementCookieName, JSON.stringify(false), {
      expires: 365,
    });
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
        JSON.parse(Cookies.get(achievementCookieName)) == false
      ) {
        const achievementThree = document.getElementById("achievement_3");
        achievementThree.style.display = "block";
        Cookies.set(achievementCookieName, JSON.stringify(true), {
          expires: 365,
        });
      }
    }
  }
}

function renderAchievements() {
  // let achievementCounter = JSON.parse(Cookies.get(`achievementCounter`));
  console.log(achievementCounter);
  for (let i = 1; i <= achievementCounter; i++) {
    let achievementCookie = JSON.parse(
      Cookies.get(`achievement_${i}_Complete`)
    );
    const achievement = document.getElementById(`achievement_${i}`);
    console.log(achievementCookie);
    if (!achievementCookie) {
      achievement.style.display = "none";
    }
    if (achievementCookie) {
      achievement.style.backgroundColor = "limegreen";
      achievement.style.color = "white";
      achievement.style.display = "block";
    }
  }
}

export { checkAchievements, renderAchievements };
