function setupSloikCookies(
  numberOfChildren,
  sloikTitle,
  sloikDescription,
  totalMoney,
  isGoalReached,
  transactionsArray
) {
  const goalSumValue = document.getElementById("inputField3").value;
  Cookies.set(`sloikTitle_${numberOfChildren}`, JSON.stringify(sloikTitle), {
    expires: 365,
  });
  Cookies.set(
    `sloikDescription_${numberOfChildren}`,
    JSON.stringify(sloikDescription),
    {
      expires: 365,
    }
  );
  Cookies.set(`totalMoney_${numberOfChildren}`, JSON.stringify(totalMoney), {
    expires: 365,
  });
  Cookies.set(`goalValue_${numberOfChildren}`, JSON.stringify(goalSumValue), {
    expires: 365,
  });
  Cookies.set(
    `isGoalReached_${numberOfChildren}`,
    JSON.stringify(isGoalReached),
    { expires: 365 }
  );
  Cookies.set(
    `transactionsList_${numberOfChildren}`,
    JSON.stringify(transactionsArray),
    { expires: 365 }
  );
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
      { expires: 365 }
    )
  );
}

function bulkUpdateCookies(numberOfChildren) {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  Cookies.set(`sloikTitle_${numberOfChildren}`, JSON.stringify(titleValue), {
    expires: 365,
  });
  Cookies.set(
    `sloikDescription_${numberOfChildren}`,
    JSON.stringify(descriptionValue),
    { expires: 365 }
  );
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

export { setupSloikCookies, removeCookiesByID, bulkUpdateCookies };
