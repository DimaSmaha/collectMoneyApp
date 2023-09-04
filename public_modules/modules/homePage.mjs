import { removeCookiesByID } from "./cookies.mjs";

function deleteSloik(sloikID) {
  const sloiksBoxToDelete = document.getElementById(`sloikBox_${sloikID}`);
  sloiksBoxToDelete.remove();
  removeCookiesByID(sloikID);
  let sloikCounter = JSON.parse(Cookies.get("sloiksCounter"));
  sloikCounter--;
  Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
}

export { deleteSloik };
