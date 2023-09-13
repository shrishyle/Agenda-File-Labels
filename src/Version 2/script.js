let meeting_detail_component_template = document.getElementById("meeting-detail-component-template");
let component = meeting_detail_component_template.content.cloneNode(true);
let container = document.getElementById("container");
container.appendChild(component);

