function setupSloikCookies(
  numberOfChildren,
  sloikTitle,
  sloikDescription,
  goalSumValue,
  totalMoney,
  isGoalReached,
  transactionsArray,
) {
  setCookie(`sloikTitle_${numberOfChildren}`, sloikTitle);
  setCookie(`sloikDescription_${numberOfChildren}`, sloikDescription);
  setCookie(`totalMoney_${numberOfChildren}`, totalMoney);
  setCookie(`goalValue_${numberOfChildren}`, goalSumValue);
  setCookie(`isGoalReached_${numberOfChildren}`, isGoalReached);
  setCookie(`transactionsList_${numberOfChildren}`, transactionsArray);
}

function setTestingCookies() {
  setCookie("sloikTitle", "House");
  setCookie("sloikDescription", "Collecting for a house", {
    expires: 365,
  });
  setCookie("totalMoney", 876);
  setCookie("goalValue", 5000);
  setCookie("isGoalReached", false);
  setCookie("transactionsList", [
    { transactionSum: 654, date: "2023-07-04T18:03:44.492Z" },
    { transactionSum: 213, date: "2023-07-04T18:04:44.492Z" },
  ]);
}

function bulkUpdateCookies(numberOfChildren) {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  setCookie(`sloikTitle_${numberOfChildren}`, titleValue);
  setCookie(`sloikDescription_${numberOfChildren}`, descriptionValue);
  setCookie(`goalValue_${numberOfChildren}`, goalSumValue);
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

const getCookie = (cookieName) =>
  Cookies.get(`${cookieName}`) != undefined ? JSON.parse(Cookies.get(`${cookieName}`)) : undefined;

const setCookie = (cookieName, cookieValue) =>
  Cookies.set(`${cookieName}`, JSON.stringify(cookieValue), {
    expires: 365,
  });

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
