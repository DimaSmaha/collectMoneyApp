function editGoal() {
  const goalBox = document.getElementById("goalBox");
  const editGoalBtn = document.getElementById("edit_goal_button");
  editGoalBtn.style.display = "none";
  goalBox.insertAdjacentHTML(
    "beforeend",
    `<input type="number" id="editGoalInput" placeholder="edit your goal"/>
      <button class="acceptBtn" 
        id="accept_edit_goal"><b>V</b></button>
      <button class="cancelBtn" 
        id="cancel_edit_goal"><b>X</b></button>`
  );
}

function setEditGoalBtnDisplay(display) {
  const editGoalBtn = document.getElementById("edit_goal_button");
  editGoalBtn.style.display = display;
}

function removeEditGoalElementsDisplay() {
  const editGoalInput = document.getElementById("editGoalInput");
  const acceptEditGoal = document.getElementById("accept_edit_goal");
  const cancelEditGoal = document.getElementById("cancel_edit_goal");

  editGoalInput.remove();
  acceptEditGoal.remove();
  cancelEditGoal.remove();
}

export { editGoal, setEditGoalBtnDisplay, removeEditGoalElementsDisplay };
