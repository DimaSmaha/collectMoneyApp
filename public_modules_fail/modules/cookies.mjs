function setupSloikCookies(numberOfChildren, sloikTitle, sloikDescription) {
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

export { setupSloikCookies };
