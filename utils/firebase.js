//var admin = require("firebase-admin");
import admin from "firebase-admin";

{/* This is to import the json file in module type don't delete this below 3 commented lines */}
{/* 
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./travel-management-service-account.json");
*/}

// import serviceAccount as js file instead of json file
import serviceAccount from "./travel-management-service-account.js";


//var serviceAccount = require("path/to/serviceAccountKey.json");
//import serviceAccount from "./travel-management-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//module.exports = admin;
export default admin