let jsonFile;
fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    jsonFile = data;
    totalMoney = jsonFile.totalMoney;
  });

let totalMoney;

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
