const app = class {
  constructor() {
    this.displayFirstComponent = () => {
      let meeting_detail_component_template = document.getElementById("meeting-detail-component-template");
      let component = meeting_detail_component_template.content.cloneNode(true);
      let container = document.getElementById("container");
      container.appendChild(component);
    };
    this.next_button_feature = () => {
      let next_button = document.getElementById("next-button");
      if (next_button) {
        next_button.addEventListener("click", () => {
          let container = document.getElementById("container");

          let meeting_number_input = document.getElementById("meeting-number");
          let meeting_date_input = document.getElementById("meeting-date");
          let meeting_number = meeting_number_input.value;
          let meeting_date = meeting_date_input.value;

          let toast_container_template = document.getElementById("toast-container-template");
          let toast_container = toast_container_template.content.cloneNode(true);

          let sub_container = document.createElement("div");
          sub_container.setAttribute("id", "sub-container");
          sub_container.classList.add("sub-container");
          sub_container.appendChild(toast_container);

          recipientList.getdb().forEach((item) => {
            let toast_component_template = document.getElementById("toast-component-template");
            let toast_component = toast_component_template.content.cloneNode(true);
            let toast_text_field = toast_component.querySelector("#toast-text");
            toast_text_field.textContent = item.name;
            toast_container.appendChild(toast_component);
          });
          container.appendChild(sub_container);
        });
      }
    };
    this.displayFirstComponent();
  }
};

let App = new app();

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
  },
  {
    name: "Shri. Devesh Srivastava",
  },
  //   {
  //     name: "Internal Audit Department",
  //   },
  //   {
  //     name: "Assistant General Manager",
  //   },
  //   {
  //     name: "Deputy General Manager",
  //   },
  //   {
  //     name: "General Manager",
  //   },
];

let recipientList = new database("db2", "directorDB", dbObject);
