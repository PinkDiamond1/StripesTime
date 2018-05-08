import clock from "clock";
import document from "document";

import * as messaging from "messaging";

import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { goals } from "user-activity";
import { user } from "user-profile";
import { display } from "display";
import { me } from "appbit";


import * as util from "./util";

let hrm = new HeartRateSensor();

console.log("App Started");

clock.granularity = "minutes";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let background = document.getElementById("background");
let clockLabel = document.getElementById("clockLabel");
let mainStripeL = document.getElementById("mainStripeL");
let pinStripeL = document.getElementById("pinStripeL");
let mainStripeR = document.getElementById("mainStripeR");
let pinStripeR = document.getElementById("pinStripeR");

let tach = document.getElementById("tach");

let hrNeedle = document.getElementById("hrNeedle");
//hrNeedle.groupTransform.rotate.angle = 110;

let hrLabel = document.getElementById("hrLabel");
//hrLabel.text = "193"
let stepsLabel = document.getElementById("stepsLabel");
//stepsLabel.text = "21,753 steps"

let settings = loadSettings();

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);  
  if (evt.data.key === "bgcolor" && evt.data.newValue) {
    settings.bgColor = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${settings.bgColor}`);
    setBgColor();
  }
  if (evt.data.key === "stripeColor" && evt.data.newValue) {
    settings.stripesColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Stripe color: ${settings.stripesColor}`);
    setStripesColor();
  }
  if (evt.data.key === "pinStripeColor" && evt.data.newValue) {
    settings.pinStripesColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Stripe color: ${settings.pinStripesColor}`);
    setPinStripesColor();
  }
  if (evt.data.key === "stripesToggle" && evt.data.newValue) {
    settings.stripes = JSON.parse(evt.data.newValue);
    console.log(`Stripes: ${settings.stripes}`);
    setStripesColor();
  }
  if (evt.data.key === "pinStripesToggle" && evt.data.newValue) {
    settings.pinStripes = JSON.parse(evt.data.newValue);
    console.log(`Pin Stripes: ${settings.pinStripes}`);
    setPinStripesColor();
  }
  if (evt.data.key === "clockColor" && evt.data.newValue) {
    settings.clockColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Clock color: ${settings.clockColor}`);
    setClockColor();
  }
  if (evt.data.key === "tachColor" && evt.data.newValue) {
    settings.tachColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Tach color: ${settings.clockColor}`);
    setTachColor();
  }
  saveSettings();
};

function setBgColor(){
  background.style.fill = settings.bgColor;
}

function setStripesColor(){
  if (settings.stripes){
    mainStripeR.style.fill = settings.stripesColor;
    mainStripeL.style.fill = settings.stripesColor;
  } else {
    mainStripeR.style.fill = settings.bgColor;
    mainStripeL.style.fill = settings.bgColor;
  }
}

function setPinStripesColor(){
  if (settings.pinStripes){
    pinStripeR.style.fill = settings.pinStripesColor;
    pinStripeL.style.fill = settings.pinStripesColor;
  } else {
    pinStripeR.style.fill = settings.bgColor;
    pinStripeL.style.fill = settings.bgColor;
  }
}

function setClockColor(){
  clockLabel.style.fill = settings.clockColor;
}

function setTachColor(){
  tach.style.fill = settings.tachColor;
}

function applySettings(){
  setBgColor();
  setStripesColor();
  setPinStripesColor();
  setClockColor();
  setTachColor();
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

me.onunload = saveSettings;

function loadSettings() {
  console.log("Loading Settings!")
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      bgColor : "deepskyblue",
      stripesColor : "silver",
      pinStripesColor : "black",
      stripes : true,
      pinStripes: true,
      clockColor : "black",
      tachColor : "black"
    }
  }
}

function saveSettings() {
  console.log("Saving Settings");
  settings.noFile = false;
}

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

function updateClockData() {
  if (display.on){
    hrm.start();
    let data = {
        heart: {
          theHeartRate: hrm.heartRate ? hrm.heartRate : 0
        },
        step: {
          steps: today.adjusted.steps ? today.adjusted.steps: 0
        }
      };

    //console.log("Data:");
    //console.log(data.heart.theHeartRate);
    //console.log(data.step.steps.toLocaleString());
    
    
    if (data.heart.theHeartRate == 0) {
      hrLabel.text = `--`;
      hrNeedle.groupTransform.rotate.angle = -110;
        
    } else {
      //console.log(user.restingHeartRate + ", " + user.age)
      let min = parseInt(user.restingHeartRate);
      let max = 220 - parseInt(user.age);
      let degPerBpm = 192.5/(max-min);
      //console.log(degPerBpm);
      let angle = ((data.heart.theHeartRate - user.restingHeartRate) * degPerBpm) - 82.5;
      //let angle = ((250 - user.restingHeartRate) * degPerBpm) - 82.5;
      //console.log(angle);
      hrNeedle.groupTransform.rotate.angle = angle ;
      hrLabel.text = `${data.heart.theHeartRate}`;
    }
    
    stepsLabel.text = `${data.step.steps.toLocaleString()} steps`;
    hrm.stop()
  }
}

setInterval(updateClockData, .1*1000);
clock.ontick = () => updateClock();

applySettings();
hrm.start();
