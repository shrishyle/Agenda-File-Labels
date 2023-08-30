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

// M.AutoInit();

// document.addEventListener("DOMContentLoaded", function () {
//   var elems = document.querySelectorAll(".chips");
//   var instances = M.Chips.init(elems, {});
// });

const RecipientClass = class {
  constructor(name, description = "", term = "short") {
    this.name = name;
    this.description = description;
    this.term = term;
  }
};

let dataClass = class {
  constructor() {
    this.storage = [];
    this.meetingInfo = {
      meetingNumber: "",
      meetingDate: "",
    };
    this.meetingInfoTemplate = [];

    //Method to clear all Directors Names from DOM
    this.clearAllChips = () => {
      let chipColumn = document.getElementById("chip-column");
      let chipColumnChildren = chipColumn.children;
      if (chipColumn.children) {
        for (let i = 0; i < chipColumnChildren.length; i++) {
          chipColumnChildren[i].remove();
        }
      }
    };

    //Method to add Director's name in storage
    this.addNameInStorage = () => {
      let addNameBtn = document.getElementById("add-name");
      addNameBtn.addEventListener("click", () => {
        let inputElem = document.getElementById("new-director-name");
        let newDirectorName = inputElem.value;
        let newRecipient = new RecipientClass(newDirectorName);
        this.storage.push(newRecipient);
        document.getElementById("new-director-name").value = "";
        this.clearAllChips();
        this.renderNameList();
      });
    };

    //Method to render Name List of Directors
    this.renderNameList = () => {
      this.clearAllChips();
      this.storage.forEach((item) => {
        let chipColumn = document.getElementById("chip-column");
        let template = document.getElementById("chip-template");
        template.content.querySelector("span").textContent = item.name;
        let tempElement = template.content.cloneNode(true).children[0];
        chipColumn.appendChild(tempElement);
      });
    };

    //Method to save Meeting Information
    this.saveMeetingInfo = () => {
      let saveMeetingInfoBtn = document.getElementById("save-meeting-info");
      saveMeetingInfoBtn.addEventListener("click", () => {
        let meetingNoInputElem = document.getElementById("first_name");
        let meetingDateInputElem = document.getElementById("meeting_date");
        let meetingNo = meetingNoInputElem.value;
        let meetingDate = meetingDateInputElem.value;
        this.meetingInfo.meetingNumber = meetingNo;
        this.meetingInfo.meetingDate = meetingDate;
        console.log(this.meetingInfo);
      });
    };

    //Method to inject Meeting Info into template
    this.injectMeetingInformation = () => {
      let template = document.getElementById("meeting_detail");
      let tempElement = template.content.cloneNode(true).children[0];
      let two = tempElement.querySelector("span#two");
      let three = tempElement.querySelector("span#three");
      let five = tempElement.querySelector("span#five");
      let six = tempElement.querySelector("span#six");
      let seven = tempElement.querySelector("span#seven");
      two.textContent = this.meetingInfo.meetingNumber;
      let mNum = this.meetingInfo.meetingNumber.toString();
      console.log(mNum);
      console.log(three);
      if (mNum[mNum.length] === "1") {
        three.textContent = "st";
      }
      if (mNum[mNum.length] === "2") {
        three.textContent = "nd";
      }
      if (mNum[mNum.length] === "3") {
        three.textContent = "rd";
      } else {
        three.textContent = "th";
      }
      console.log(tempElement);
    };

    this.renderNameList();
    this.addNameInStorage();
    this.saveMeetingInfo();
    this.injectMeetingInformation();
  }
};

const data = new dataClass();
