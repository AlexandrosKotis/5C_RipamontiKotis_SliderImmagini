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
const componentCredential = credential(document.getElementById("login"), pubSub); 

// Go to home
location.href = "#home"

// Build
homePage.build();

// Render
homePage.render();