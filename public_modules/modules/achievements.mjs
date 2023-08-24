let achievement1Complete = false;
let achievement2Complete = false;
let achievementCounter = 2;

function checkAchievements(transactionsArray) {
  achievementOne(transactionsArray);
  achievementTwo(transactionsArray);
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
    }
  }
}

export { checkAchievements, renderAchievements };
