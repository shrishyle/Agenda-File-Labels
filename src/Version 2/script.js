const app = class {
  constructor() {
    //Method to display First Component
    this.displayFirstComponent = () => {
      let meeting_detail_component_template = document.getElementById("meeting-detail-component-template");
      let component = meeting_detail_component_template.content.cloneNode(true);
      let container = document.getElementById("container");
      container.appendChild(component);
    };

    //Method to run feature on clicking "Next" Button on First Component.
    this.next_button_feature = () => {
      let next_button = document.getElementById("next-button");
      if (next_button) {
        next_button.addEventListener("click", () => {
          //Code for inserting the Second Component
          let second_component_template = document.getElementById("second-component-template");
          let second_component = second_component_template.content.cloneNode(true);

          // Level 1
          second_component.querySelector("#back-button").addEventListener("click", () => {
            let sec_com = document.getElementById("second-component");
            sec_com.remove();
            let next_btn_template = document.getElementById("next-button-template");
            let next_btn_div = next_btn_template.content.cloneNode(true);
            // Level 2
            next_btn_div.querySelector("button").addEventListener("click", () => {
              let second_component_template = document.getElementById("second-component-template");
              let second_component = second_component_template.content.cloneNode(true);
              let container = document.getElementById("container");
              container.appendChild(second_component);
              let toast_container1 = document.getElementsByClassName("toast-container")[0];
              recipientList.getdb().forEach((item) => {
                let toast_component_template = document.getElementById("toast-component-template");
                let toast_component = toast_component_template.content.cloneNode(true);
                let toast_text_field = toast_component.querySelector("#toast-text");
                toast_text_field.textContent = item.name;
                toast_container1.appendChild(toast_component);
              });
            });
            document.getElementsByClassName("bottom")[0].appendChild(next_btn_div);
          });

          let container = document.getElementById("container");
          container.appendChild(second_component);

          //Code for populating the toast-container with Recepient Names.
          let toast_container1 = document.getElementsByClassName("toast-container")[0];
          recipientList.getdb().forEach((item) => {
            let toast_component_template = document.getElementById("toast-component-template");
            let toast_component = toast_component_template.content.cloneNode(true);
            let toast_text_field = toast_component.querySelector("#toast-text");
            toast_text_field.textContent = item.name;
            toast_container1.appendChild(toast_component);
          });

          //Code for removing the buttons
          next_button.parentElement.remove();
          let bottomDiv = document.getElementsByClassName("bottom");
          for (let i = 0; i < bottomDiv.length; i++) {
            bottomDiv[i].classList.remove("view-1");
            bottomDiv[i].classList.add("view-2");
          }
        });
      }
    };

    this.button = () => {
      let buttonElement = document.createElement("button");
      buttonElement.addEventListener("click", (event) => {
        this.buttonFunc(event.target.textContent);
      });
      return buttonElement;
    };

    this.buttonFunc = (identifier) => {
      if (identifier === "Next") {
        let second_component_template = document.getElementById("second-component-template");
        let second_component = second_component_template.content.cloneNode(true);
        // Incomplete...working here!!
      }
    };

    //Method to run feature on clicking "Back" Button on Second Component.
    this.displayFirstComponent();
    this.next_button_feature();
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
  {
    name: "Internal Audit Department",
  },
  {
    name: "Assistant General Manager",
  },
  {
    name: "Deputy General Manager",
  },
  {
    name: "General Manager",
  },
];

let recipientList = new database("db2", "directorDB", dbObject);
