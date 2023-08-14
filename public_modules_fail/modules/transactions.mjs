import { deleteTransaction } from "./insideSloik.mjs";

function addTransactionDIV(transactionsArray) {
  const getLastElementOfArray = transactionsArray.length - 1;
  console.log(getLastElementOfArray);
  const transactionBoxes = document.getElementById("transactionBoxes");
  transactionBoxes.insertAdjacentHTML(
    "afterbegin",
    `<div
        id="transaction_${getLastElementOfArray}_Box"
        class="transactionBox"
      >
        <p class="transactionText" id="transaction_${getLastElementOfArray}_Text"></p>
        <button class="editTransactionBtn" 
          id="edit_transaction_${getLastElementOfArray}" 
          onclick="editTransaction(${getLastElementOfArray})"><b>Edit</b></button>
        <button class="cancelBtn" 
          id="cancel_transaction_${getLastElementOfArray}" 
          onclick="deleteTransaction(${getLastElementOfArray})"><b>X</b></button>
        </div>`
  );
  const transactionText = document.getElementById(
    `transaction_${getLastElementOfArray}_Text`
  );
  let getTransaction = JSON.parse(
    JSON.stringify(transactionsArray[getLastElementOfArray])
  );
  let formatDate = new Date(getTransaction.date);
  transactionText.innerHTML = `Transaction sum: ${
    getTransaction.transactionSum
  } </br>
    Date: ${formatDate.toLocaleString()}`;
  let cancelBtns = document.getElementById(
    `cancel_transaction_${getLastElementOfArray}`
  );
  cancelBtns.onclick = function () {
    deleteTransaction(getLastElementOfArray);
  };
}

function renderTransactions(transactionsArray) {
  const transactionBoxes = document.getElementById("transactionBoxes");
  for (let i = 0; i < transactionsArray.length; i++) {
    transactionBoxes.insertAdjacentHTML(
      "afterbegin",
      `<div
          id="transaction_${i}_Box"
          class="transactionBox">
          <p class="transactionText" id="transaction_${i}_Text"></p>
          <button class="editTransactionBtn" 
            id="edit_transaction_${i}" 
            onclick="deleteTransaction(${i})"><b>Edit</b></button>
          <button class="cancelBtn" 
            id="cancel_transaction_${i}" 
            onclick="deleteTransaction(${i})"><b>X</b></button>
        </div>`
    );
    const transactionText = document.getElementById(`transaction_${i}_Text`);
    let getTransaction = JSON.parse(JSON.stringify(transactionsArray[i]));
    let formatDate = new Date(getTransaction.date);
    transactionText.innerHTML = `Transaction sum: ${
      getTransaction.transactionSum
    } </br>
      Date: ${formatDate.toLocaleString()}`;
  }
  for (let i = 0; i < transactionsArray.length; i++) {
    let cancelBtns = document.getElementById(`cancel_transaction_${i}`);
    cancelBtns.onclick = function () {
      deleteTransaction(i);
    };
  }
}

function editTransaction(transaction_id) {
  const transactionBox = document.getElementById(
    `transaction_${transaction_id}_Box`
  );
  setTransactionBoxChildsDisplay(transaction_id, "none");
  transactionBox.insertAdjacentHTML(
    "afterbegin",
    `<input type="number" id="editMoneyInput_${transaction_id}" placeholder="edit your transaction"/>
      <button class="acceptBtn" 
        id="accept_edit_transaction_${transaction_id}" 
        onclick="acceptEditTransaction(${transaction_id})"><b>V</b></button>
      <button class="cancelBtn" 
        id="decline_edit_transaction_${transaction_id}" 
        onclick="setTransactionBoxChildsDisplay(${transaction_id},'flex'); 
        setTransactionBoxEditElementsDisplay(${transaction_id},'none')"><b>X</b></button>`
  );
}

function setTransactionBoxChildsDisplay(transaction_id, display) {
  const transactionText = document.getElementById(
    `transaction_${transaction_id}_Text`
  );
  const transactionEdit = document.getElementById(
    `edit_transaction_${transaction_id}`
  );
  const transactionCancel = document.getElementById(
    `cancel_transaction_${transaction_id}`
  );

  transactionText.style.display = display;
  transactionEdit.style.display = display;
  transactionCancel.style.display = display;
}

function setTransactionBoxEditElementsDisplay(transaction_id, display) {
  const transactionEditInput = document.getElementById(
    `editMoneyInput_${transaction_id}`
  );
  const transactionEditAccept = document.getElementById(
    `accept_edit_transaction_${transaction_id}`
  );
  const transactionEditDecline = document.getElementById(
    `decline_edit_transaction_${transaction_id}`
  );

  transactionEditInput.style.display = display;
  transactionEditAccept.style.display = display;
  transactionEditDecline.style.display = display;
}

function acceptEditTransaction(transaction_id, transactionsArray) {
  const transactionEditInput = document.getElementById(
    `editMoneyInput_${transaction_id}`
  );
  const editedSum = parseInt(transactionEditInput.value);
  if (isNaN(editedSum) == false && editedSum > 0) {
    transactionsArray[transaction_id].transactionSum = editedSum;
    const transactionBoxes = document.getElementById("transactionBoxes");
    transactionBoxes.replaceChildren();
    renderTransactions();
    recalculateMoneyScore();
    changeMoneyScore();
    setProgressBar();
    updateCookies(sloikID);
    if (totalMoney < goalValue || !isGoalReached) {
      checkGoal();
    }
    if (totalMoney < goalValue) {
      isGoalReached = false;
    }
  }
  transactionEditInput.value = "";
}

export { addTransactionDIV, renderTransactions };
