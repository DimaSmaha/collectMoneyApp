let totalMoney = 0;

function changeMoneyScore() {
  let yourMoneyScore = document.getElementById("yourMoneyScore");
  let sentence = `Your money : ${totalMoney}`;
  yourMoneyScore.textContent = sentence;
}

function addMoney() {
  const moneyInput = document.getElementById("addMoneyInput");
  const addedMoney = moneyInput.value;
  const moneyToBeAdded = parseInt(addedMoney);
  totalMoney += moneyToBeAdded;
  console.log(totalMoney);
  moneyInput.value = "";
  return totalMoney;
}
