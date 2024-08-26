import { removeCookiesByID } from "./cookies.mjs";

function tryToDeleteSloik(sloikID) {
  const tryToDeleteSloikButton = document.getElementById(
    `tryToDeleteSloikBtn_${sloikID}`
  );
  const deleteSloikButton = document.getElementById(
    `deleteSloikBtn_${sloikID}`
  );
  const declineDeleteSloikButton = document.getElementById(
    `declineDeleteSloik_${sloikID}`
  );
  tryToDeleteSloikButton.style.display = "none";
  deleteSloikButton.style.display = "inline-block";
  declineDeleteSloikButton.style.display = "inline-block";
}

function resetButtons(sloikID) {
  const tryToDeleteSloikButton = document.getElementById(
    `tryToDeleteSloikBtn_${sloikID}`
  );
  const deleteSloikButton = document.getElementById(
    `deleteSloikBtn_${sloikID}`
  );
  const declineDeleteSloikButton = document.getElementById(
    `declineDeleteSloik_${sloikID}`
  );
  tryToDeleteSloikButton.style.display = "inline-block";
  deleteSloikButton.style.display = "none";
  declineDeleteSloikButton.style.display = "none";
}

function deleteSloik(sloikID) {
  const sloiksBoxToDelete = document.getElementById(`sloikBox_${sloikID}`);
  sloiksBoxToDelete.remove();
  removeCookiesByID(sloikID);
  let sloikCounter = JSON.parse(Cookies.get("sloiksCounter"));
  sloikCounter--;
  Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
}

export { deleteSloik, tryToDeleteSloik, resetButtons };
