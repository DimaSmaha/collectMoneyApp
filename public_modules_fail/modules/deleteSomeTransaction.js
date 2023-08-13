function deleteSomeTransaction(transaction_id) {
  const transactionBox = document.getElementById(
    `transaction_${transaction_id}_Box`
  );
  transactionBox.remove();
  localStorage.setItem("deletedTransactionId", JSON.stringify(transaction_id));
}
