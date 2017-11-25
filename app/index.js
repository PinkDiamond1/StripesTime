import clock from "clock";
import document from "document";

import * as messaging from "messaging";

import { preferences } from "user-settings";

import * as util from "./util";

console.log("App Started");

clock.granularity = "minutes";

let background = document.getElementById("background");
let clockLabel = document.getElementById("clockLabel");
let mainStripeL = document.getElementById("mainStripeL");
let mainStripeR = document.getElementById("mainStripeR");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);  
  if (evt.data.key === "bgcolor" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${color}`);
    background.style.fill = color;
  }
  if (evt.data.key === "stripeColor" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting Stripe color: ${color}`);
    mainStripeR.style.fill = color;
    mainStripeL.style.fill = color;
  }
  if (evt.data.key === "clockColor" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting Clock color: ${color}`);
    clockLabel.style.fill = color;
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

function updateClock() {
  let today = new Date();
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  let ampm = " am"
  
  
  
  //console.log(preferences.clockDisplay);
  if (preferences.clockDisplay == "12h"){
    if (hours > 12){
      ampm = " pm";
      hours -= 12;
    } else if (hours == 12){
      ampm = " pm"
    }else if (hours == 0 && ampm == " am"){
      hours += 12;
    }
  } else {
    ampm = ""
  }
  
  clockLabel.text = `${hours}:${mins}`;
}

clock.ontick = () => updateClock();
