// Imports
import { createNavigator } from "./scripts/navigator.js";
import { images } from "./scripts/images.js";
import { createPubSub } from "./scripts/pubSub.js";

// Declarations & Initialization
const navigator = createNavigator(document.getElementById("body"));
const pubSub = createPubSub();
const homePage = images(document.getElementById("carouselContentImages"), pubSub);

// Go to home
location.href = "#home"

// Build
homePage.build();

// Render
homePage.render();