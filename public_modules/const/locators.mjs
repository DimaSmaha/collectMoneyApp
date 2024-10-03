class Locators {
  constructor() {
    this.addSloikBtn = document.getElementById("add_sloik");
    this.cancelCreateSloikBtn = document.getElementById("cancelBtn");
    this.submitPopupBtn = document.getElementById("submitBtn");

    this.editGoalBtn = document.getElementById("sloikGoalEdit");
    this.editTitleBtn = document.getElementById("sloikTitleEdit");
    this.editDescriptionBtn = document.getElementById("sloikDescriptionEdit");

    this.addMoneyBtn = document.getElementById("addMoneyBtn");

    this.popup = document.getElementById("popupContainer");
    this.popupDescription = document.getElementById("popupDescription");
    this.titleInput = document.getElementById("inputField1");
    this.descriptionInput = document.getElementById("inputField2");
    this.goalSumInput = document.getElementById("inputField3");
    this.inputError1 = document.getElementById("inputField1Error");
    this.inputError2 = document.getElementById("inputField2Error");
    this.inputError3 = document.getElementById("inputField3Error");
    this.editPopupBtn = document.getElementById("editBtn");

    this.editSloikButton = (sloikID) => document.getElementById(`editSloikBtn_${sloikID}`);
    this.tryToDeleteSloikButton = (sloikID) =>
      document.getElementById(`tryToDeleteSloikBtn_${sloikID}`);
    this.deleteSloikButton = (sloikID) => document.getElementById(`deleteSloikBtn_${sloikID}`);
    this.declineDeleteSloikButton = (sloikID) =>
      document.getElementById(`declineDeleteSloik_${sloikID}`);
    this.sloiksBoxToDelete = (sloikID) => document.getElementById(`sloikBox_${sloikID}`);

    this.sloiksList = document.getElementById("sloiksList");

    this.sloikTryToDeleteBtns = (sloikID) =>
      document.getElementById(`tryToDeleteSloikBtn_${sloikID}`);
    this.sloikDeleteBtns = (sloikID) => document.getElementById(`deleteSloikBtn_${sloikID}`);
    this.sloikDeclineDeleteBtns = (sloikID) =>
      document.getElementById(`declineDeleteSloik_${sloikID}`);
    this.sloikEditBtns = (sloikID) => document.getElementById(`editSloikBtn_${sloikID}`);

    this.achievementOne = document.getElementById("achievement_1");
    this.achievementTwo = document.getElementById("achievement_2");
    this.achievementThree = document.getElementById("achievement_3");
    this.achievement = (achievementID) => document.getElementById(`achievement_${achievementID}`);
  }
}

export default new Locators();
