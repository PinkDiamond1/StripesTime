import clock from "clock";
import document from "document";

import * as messaging from "messaging";
import * as fs from "fs";

import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { goals } from "user-activity";
import { user } from "user-profile";
import { units } from "user-settings";
import { display } from "display";
import { me } from "appbit";
import { battery } from "power";

import * as util from "./util";

let hrm = new HeartRateSensor();

console.log("App Started");

clock.granularity = "minutes";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let clickbackground = document.getElementById("clickbg");

let background = document.getElementById("background");
let clockLabel = document.getElementById("clockLabel");
let mainStripeL = document.getElementById("mainStripeL");
let pinStripeLL = document.getElementById("pinStripeLL");
let pinStripeLR = document.getElementById("pinStripeLR");
let mainStripeR = document.getElementById("mainStripeR");
let pinStripeRL = document.getElementById("pinStripeRL");
let pinStripeRR = document.getElementById("pinStripeRR");

let tach = document.getElementById("tach");

let hrNeedle = document.getElementById("hrNeedle");
//hrNeedle.groupTransform.rotate.angle = 110;

let hrLabel = document.getElementById("hrLabel");
//hrLabel.text = "193"
let statsLabel = document.getElementById("statsLabel");
//stepsLabel.text = "21,753 steps"

let settings = loadSettings();

var stats = ["steps", 
            "distance",
            "floors",
            "active",
            "cals",
            "batt"]
var stat = 0;

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
    console.log(`Setting Pin Stripe color: ${settings.pinStripesColor}`);
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
    mainStripeR.style.display = "inline";
    mainStripeR.style.fill = settings.stripesColor;
    mainStripeL.style.display = "inline";
    mainStripeL.style.fill = settings.stripesColor;
  } else {
    mainStripeR.style.display = "none";
    mainStripeL.style.display = "none";
  }
}

function setPinStripesColor(){
  if (settings.pinStripes){
    console.log("Setting Pin Stripes to: " + settings.pinStripesColor+"!!!")
    pinStripeRL.style.display = "inline";
    pinStripeRL.style.fill = settings.pinStripesColor;
    pinStripeRR.style.display = "inline";
    pinStripeRR.style.fill = settings.pinStripesColor;
    pinStripeLL.style.display = "inline";
    pinStripeLL.style.fill = settings.pinStripesColor;
    pinStripeLR.style.display = "inline";
    pinStripeLR.style.fill = settings.pinStripesColor;
  } else {
    pinStripeRL.style.display = "none";
    pinStripeRR.style.display = "none";
    pinStripeLL.style.display = "none";
    pinStripeLR.style.display = "none";
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
    console.log("No File")
    return {
      bgColor : "deepskyblue",
      stripesColor : "silver",
      pinStripesColor : "black",
      stripes : true,
      pinStripes: true,
      clockColor : "black",
      tachColor : "white",
      noFile : true
    }
  }
}

function saveSettings() {
  console.log("Saving Settings");
  settings.noFile = false;
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
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

    //console.log("Data:");
    //console.log(data.heart.theHeartRate);
    //console.log(data.step.steps.toLocaleString());
    
    let heartRate = hrm.heartRate ? hrm.heartRate : 0
    if (heartRate == 0) {
      hrLabel.text = `--`;
      hrNeedle.groupTransform.rotate.angle = -110;
        
    } else {
      //console.log(user.restingHeartRate + ", " + user.age)
      let min = parseInt(user.restingHeartRate);
      let max = 220 - parseInt(user.age);
      let degPerBpm = 192.5/(max-min);
      //console.log(degPerBpm);
      let angle = ((heartRate - user.restingHeartRate) * degPerBpm) - 82.5;
      //let angle = ((250 - user.restingHeartRate) * degPerBpm) - 82.5;
      //console.log(angle);
      hrNeedle.groupTransform.rotate.angle = angle ;
      hrLabel.text = `${heartRate}`;
    }
        
    switch (stats[stat]){
      case "steps":
        statsLabel.text = `${today.adjusted.steps ? today.adjusted.steps.toLocaleString(): 0} steps`;
        break;
      case "distance":
        if (units.distance == "us")
          statsLabel.text = `${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.000621371) : 0 } miles`;
        else
          statsLabel.text = `${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.001) : 0 } km`;
        break;
      case "floors":
        statsLabel.text = `${today.adjusted.elevationGain ? today.adjusted.elevationGain : 0} floors`;
        break;
      case "active":
        statsLabel.text = `${today.adjusted.activeMinutes ? today.adjusted.activeMinutes.toLocaleString() : 0} min`;
        break;
      case "cals":
        statsLabel.text = `${today.adjusted.calories ? today.adjusted.calories.toLocaleString() : 0} cal`;
        break;
      case "batt":
        statsLabel.text = `${battery.chargeLevel}%`;
        break;
    }    
  }
}

clickbackground.onclick = function(evt) {
  console.log("Click " +  stat);
  if (stat < stats.length-1)
    stat++;
  else
    stat = 0;
  console.log(stats[stat]);
}


setInterval(updateClockData, .1*1000);
clock.ontick = () => updateClock();

applySettings();
hrm.start();
