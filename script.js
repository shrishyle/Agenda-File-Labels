function createMeetingDetailRow() {
  let template = document.getElementById("meeting_detail");
  let tempElement = template.content.cloneNode(true).children[0];
  return tempElement;
}

let rows = document.querySelectorAll(".attendee_name");
for (let i = 0; i < rows.length; i++) {
  let newRow = createMeetingDetailRow();
  rows[i].parentElement.insertBefore(newRow, rows[i].nextElementSibling);
}
