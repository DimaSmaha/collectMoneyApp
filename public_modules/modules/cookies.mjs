function setupSloikCookies(
  numberOfChildren,
  sloikTitle,
  sloikDescription,
  goalSumValue,
  totalMoney,
  isGoalReached,
  transactionsArray,
) {
  Cookies.set(`sloikTitle_${numberOfChildren}`, JSON.stringify(sloikTitle), {
    expires: 365,
  });
  Cookies.set(`sloikDescription_${numberOfChildren}`, JSON.stringify(sloikDescription), {
    expires: 365,
  });
  Cookies.set(`totalMoney_${numberOfChildren}`, JSON.stringify(totalMoney), {
    expires: 365,
  });
  Cookies.set(`goalValue_${numberOfChildren}`, JSON.stringify(goalSumValue), {
    expires: 365,
  });
  Cookies.set(`isGoalReached_${numberOfChildren}`, JSON.stringify(isGoalReached), { expires: 365 });
  Cookies.set(`transactionsList_${numberOfChildren}`, JSON.stringify(transactionsArray), {
    expires: 365,
  });
}

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
      { expires: 365 },
    ),
  );
}

function bulkUpdateCookies(numberOfChildren) {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  Cookies.set(`sloikTitle_${numberOfChildren}`, JSON.stringify(titleValue), {
    expires: 365,
  });
  Cookies.set(`sloikDescription_${numberOfChildren}`, JSON.stringify(descriptionValue), {
    expires: 365,
  });
  Cookies.set(`goalValue_${numberOfChildren}`, JSON.stringify(goalSumValue), {
    expires: 365,
  });
}

function removeCookiesByID(sloikID) {
  Cookies.remove(`goalValue_${sloikID}`);
  Cookies.remove(`isGoalReached_${sloikID}`);
  Cookies.remove(`sloikDescription_${sloikID}`);
  Cookies.remove(`sloikTitle_${sloikID}`);
  Cookies.remove(`totalMoney_${sloikID}`);
  Cookies.remove(`transactionsList_${sloikID}`);
}

function getCookiesByID(sloikID) {
  const goalValue = getCookie(`goalValue_${sloikID}`);
  const isGoalReached = getCookie(`isGoalReached_${sloikID}`);
  const sloikDescription = getCookie(`sloikDescription_${sloikID}`);
  const sloikTitle = getCookie(`sloikTitle_${sloikID}`);
  const totalMoney = getCookie(`totalMoney_${sloikID}`);
  const transactionsList = getCookie(`transactionsList_${sloikID}`);
  return { goalValue, isGoalReached, sloikDescription, sloikTitle, totalMoney, transactionsList };
}

function setCookiesByID(
  sloikID,
  goalValue,
  isGoalReached,
  sloikDescription,
  sloikTitle,
  totalMoney,
  transactionsList,
) {
  setCookie(`goalValue_${sloikID}`, goalValue);
  setCookie(`isGoalReached_${sloikID}`, isGoalReached);
  setCookie(`sloikDescription_${sloikID}`, sloikDescription);
  setCookie(`sloikTitle_${sloikID}`, sloikTitle);
  setCookie(`totalMoney_${sloikID}`, totalMoney);
  setCookie(`transactionsList_${sloikID}`, transactionsList);
}

function replaceCookiesOfDeletedSloik(sloikID, sloikCounter) {
  for (let i = sloikID; i < sloikCounter - 1; i++) {
    const nextIdCookies = getCookiesByID(i + 1);

    setCookiesByID(
      i,
      nextIdCookies.goalValue,
      nextIdCookies.isGoalReached,
      nextIdCookies.sloikDescription,
      nextIdCookies.sloikTitle,
      nextIdCookies.totalMoney,
      nextIdCookies.transactionsList,
    );
  }

  removeCookiesByID(sloikCounter - 1);
}

const getCookie = (cookieName) => JSON.parse(Cookies.get(`${cookieName}`));

const setCookie = (cookieName, cookieValue) =>
  Cookies.set(`${cookieName}`, JSON.stringify(cookieValue), {
    expires: 365,
  });

//write functions for getting and setting cookies

export {
  setupSloikCookies,
  removeCookiesByID,
  bulkUpdateCookies,
  getCookiesByID,
  setCookiesByID,
  getCookie,
  setCookie,
  replaceCookiesOfDeletedSloik,
};
