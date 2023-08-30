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

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".chips");
  var instances = M.Chips.init(elems, {
    data: ["Shrishyle"],
  });
});

const Recipient = class {
  constructor(name, description, term) {
    this.name = name;
    this.description = description;
    this.term = term;
  }
};
