// Imports
import { createNavigator } from "./scripts/navigator.js";
import { images } from "./scripts/images.js";
import { adminForm } from "./scripts/admin/adminForm.js";
import { adminTable } from "./scripts/admin/adminTable.js";
import { credential } from "./scripts/admin/login.js";
import { createPubSub } from "./scripts/pubSub.js";

// Declarations & Initialization
const navigator = createNavigator(document.getElementById("body"));
const pubSub = createPubSub();
const homePage = images(document.getElementById("carouselContentImages"), pubSub);
const componentAdminForm = adminForm(document.getElementById("adminForm"), pubSub);
const componentAdminTable = adminTable(document.getElementById("adminTable"), pubSub);
const componentCredential = await credential(document.getElementById("login"), pubSub); 

// Go to home
location.href = "#home" 

// Build
componentAdminTable.build();
homePage.build();

// Render / Load
homePage.load();
componentAdminForm.render();
componentAdminTable.render();

//Pubsub
pubSub.subscribe("isLogged", data=>{
    if(data===true){
        document.getElementById("login").classList.add("d-none");
        document.getElementById("adminTable").classList.remove("d-none");
    }
});
pubSub.subscribe("modal", () => {
    document.getElementById("adminForm").classList.remove("d-none");
    document.getElementById("adminTable").classList.add("d-none");
});

pubSub.subscribe("submit", () => {
    document.getElementById("adminTable").classList.remove("d-none");
    document.getElementById("adminForm").classList.add("d-none");
})

pubSub.subscribe("cancel", () => {
    document.getElementById("adminTable").classList.remove("d-none");
    document.getElementById("adminForm").classList.add("d-none");
})

//Callback
document.querySelectorAll(".goAdmin").forEach((anchor) => anchor.onclick = () => componentCredential.render());

setInterval(()=>{
    pubSub.publish("polling");
}, 30000)

//Project fnishied
