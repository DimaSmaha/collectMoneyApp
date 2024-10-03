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
  }
}

export default new Locators();
