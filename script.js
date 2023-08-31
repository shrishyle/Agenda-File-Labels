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
    this.saveMeetingInfoAndRenderTemplate = () => {
      let saveMeetingInfoBtn = document.getElementById("save-meeting-info");
      saveMeetingInfoBtn.addEventListener("click", () => {
        let meetingNoInputElem = document.getElementById("first_name");
        let meetingDateInputElem = document.getElementById("meeting_date");
        let meetingNo = meetingNoInputElem.value;
        let meetingDate = meetingDateInputElem.value;
        this.meetingInfo.meetingNumber = meetingNo;
        this.meetingInfo.meetingDate = new Date(meetingDate);
        this.renderMeetingDetailsRows(this.injectMeetingInformation());
      });
    };

    //Method to inject Meeting Info into template
    this.injectMeetingInformation = () => {
      let template = document.getElementById("meeting_detail");
      let tempElement = template.content.cloneNode(true).children[0];
      //Select the relavant Elements in Document Fragment.
      let two = tempElement.querySelector("span#two");
      let three = tempElement.querySelector("span#three");
      let five = tempElement.querySelector("span#five");
      let six = tempElement.querySelector("span#six");
      let seven = tempElement.querySelector("span#seven");
      //Inject details in the relavant elements in Doc Fragment.
      two.textContent = this.meetingInfo.meetingNumber;
      let mNum = this.meetingInfo.meetingNumber.toString();
      three.textContent = this.getSupText(mNum);
      five.textContent = this.meetingInfo.meetingDate.toLocaleDateString("en-US", { day: "numeric" });
      six.textContent = this.getSupText(this.meetingInfo.meetingDate.toLocaleDateString("en-US", { day: "numeric" }));
      seven.textContent = ` ${this.meetingInfo.meetingDate.toLocaleDateString("en-US", { year: "numeric", month: "short" })}`;
      return tempElement;
    };

    //Method to get the Super Text for numbers.
    this.getSupText = (inputText) => {
      if (inputText[inputText.length - 1] === "1") {
        return "st";
      }
      if (inputText[inputText.length - 1] === "2") {
        return "nd";
      }
      if (inputText[inputText.length - 1] === "3") {
        return "rd";
      } else {
        return "th";
      }
    };

    //Method to Create Meeting Detail Row
    this.createMeetingDetailRow = () => {
      let template = document.getElementById("detail_text");
      let tempElement = template.content.cloneNode(true).children[0];
      console.log(tempElement);
      return tempElement;
    };

    //Function render Meeting Details Rows
    this.renderMeetingDetailsRows = (temp) => {
      // console.log("Line No. - 114", "temp - ", temp);
      let clone = temp.cloneNode(true);
      let rows = document.querySelectorAll(".attendee_name");
      console.log(rows);
      let tr = document.createElement("tr");
      tr.appendChild(temp);
      tr.appendChild(clone);
      for (let i = 0; i < rows.length; i++) {
        let tr_clone = tr.cloneNode(true);
        rows[i].insertAdjacentElement("afterend", tr_clone);
      }
    };
    this.renderNameList();
    this.addNameInStorage();
    this.saveMeetingInfoAndRenderTemplate();
  }
};

const data = new dataClass();
