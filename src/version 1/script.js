const RecipientClass = class {
  constructor(name, title = "", status = "variable") {
    this.name = name;
    this.title = title;
    this.status = status;
  }
};

const database = class {
  constructor(title, dbName, modifiedDB) {
    this.title = title;
    this.setdb = () => {
      localStorage.setItem(dbName, JSON.stringify(modifiedDB));
    };
    this.getdb = () => {
      let extractedDB = JSON.parse(localStorage.getItem(dbName));
      return extractedDB;
    };
    this.setdb();
    this.getdb();
  }
};

let dbObject = [
  {
    name: "Shri. Sateesh Kumar",
    title: "",
    status: "variable",
  },
  {
    name: "Shri. Devesh Srivastava",
    title: "",
    status: "variable",
  },
  // {
  //   name: "Internal Audit Department",
  //   title: "",
  //   status: "fixed",
  // },
  // {
  //   name: "Assistant General Manager",
  //   title: "Internal Audit Department",
  //   status: "fixed",
  // },
  // {
  //   name: "Deputy General Manager",
  //   title: "Internal Audit Department",
  //   status: "fixed",
  // },
  // {
  //   name: "General Manager",
  //   title: "Internal Audit Department",
  //   status: "fixed",
  // },
];

let recipientList = new database("db2", "directorDB", dbObject);

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

    //Method to add Director's name in dbObject
    this.addNameInStorage = () => {
      let inputElem = document.getElementById("new-director-name");
      inputElem.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          let newDirectorName = inputElem.value;
          let newRecipient = new RecipientClass(newDirectorName);
          dbObject.push(newRecipient);
          document.getElementById("new-director-name").value = "";
          this.clearAllChips();
          this.renderNameList();
        }
      });
    };

    //Method to render Name List of Directors
    this.renderNameList = () => {
      this.clearAllChips();
      dbObject.forEach((item) => {
        if (item.status !== "fixed") {
          let chipColumn = document.getElementById("chip-column");
          let template = document.getElementById("chip-template");
          template.content.querySelector("span").textContent = item.name;
          let tempElement = template.content.cloneNode(true).children[0];
          chipColumn.appendChild(tempElement);
        }
      });
    };

    //Method to save Meeting Information
    this.saveMeetingInfoAndRenderTemplate = () => {
      let saveMeetingInfoBtn = document.getElementById("render-labels");
      saveMeetingInfoBtn.addEventListener("click", () => {
        let meetingNoInputElem = document.getElementById("first_name");
        let meetingDateInputElem = document.getElementById("meeting_date");
        let meetingNo = meetingNoInputElem.value;
        let meetingDate = meetingDateInputElem.value;
        this.meetingInfo.meetingNumber = meetingNo;
        this.meetingInfo.meetingDate = new Date(meetingDate);
        this.renderMeetingDetailsRows(this.createMeetingInfoRow());
        this.renderDirectorNamesInLabels();
      });
    };

    //Method to create Meeting information row.
    this.createMeetingInfoRow = () => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");

      let mNum = this.meetingInfo.meetingNumber.toString();
      let sup1 = `${this.getSupText(mNum).toString()}`;
      let meetingDate = `${this.meetingInfo.meetingDate.toLocaleDateString("en-US", { day: "numeric" })}`;
      let sup2 = `${this.getSupText(this.meetingInfo.meetingDate.toLocaleDateString("en-US", { day: "numeric" }).toString())}`;
      let monthYear = `${this.meetingInfo.meetingDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;

      let meetingDetailText = `Agenda for ${mNum}${sup1.sup()} Meeting of 
      Audit Committee of Board on
      ${meetingDate}${sup2.sup()} ${monthYear} `;

      div1.innerHTML = meetingDetailText;
      td1.appendChild(div1);
      td1.setAttribute("class", "meeting-detail");
      tr.appendChild(td1);

      div2.innerHTML = meetingDetailText;
      td2.appendChild(div2);
      td2.setAttribute("class", "meeting-detail");
      tr.appendChild(td2);

      return tr;
    };

    //Method to get the Super Text for numbers.
    this.getSupText = (inputText) => {
      if (inputText[inputText.length - 1] === "1" && inputText[inputText.length - 2] === "1") {
        return "th";
      }
      if (inputText[inputText.length - 1] === "2" && inputText[inputText.length - 2] === "1") {
        return "th";
      }
      if (inputText[inputText.length - 1] === "3" && inputText[inputText.length - 2] === "1") {
        return "th";
      }
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

    //Function render Meeting Details Rows
    this.renderMeetingDetailsRows = (temp) => {
      let rows = document.querySelectorAll(".attendee_name");
      for (let i = 0; i < rows.length; i++) {
        let clone = temp.cloneNode(true);
        rows[i].insertAdjacentElement("afterend", clone);
      }
    };

    //Function to render names of Directors
    this.renderDirectorNamesInLabels = () => {
      let nameDivs = document.getElementsByClassName("name");
      let titleDivs = document.getElementsByClassName("title");
      let i = 0;
      while (i < dbObject.length) {
        nameDivs[i].textContent = dbObject[i].name;
        titleDivs[i].textContent = dbObject[i].title;
        i++;
      }
    };

    this.renderNameList();
    this.addNameInStorage();
    this.saveMeetingInfoAndRenderTemplate();
  }
};

const data = new dataClass();
