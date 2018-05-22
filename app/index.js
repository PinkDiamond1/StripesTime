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
import { memory } from "system";

console.log("JS memory: " + memory.js.used + "/" + memory.js.total);

import { me as device } from "device";
if (!device.screen) device.screen = { width: 348, height: 250 };
console.log(`Dimensions: ${device.screen.width}x${device.screen.height}`);
var deviceType = "Ionic";
if (device.screen.width == 300 && device.screen.height == 300)
  deviceType = "Versa";

import Weather from '../common/weather/device';

let weather = new Weather();
weather.setProvider("yahoo"); 
weather.setApiKey("");
weather.setMaximumAge(10 * 60 * 1000); 
weather.setFeelsLike(false);
weather.setUnit(units.temperature.toLowerCase());

import * as util from "./util";

let hrm = new HeartRateSensor();

console.log("App Started");

clock.granularity = "minutes";

let clickbackground = document.getElementById("clickbg");

//tempLabel.text="112°"
//stepsLabel.text = "21,753 steps"

let settings = loadSettings();
let weatherData = loadWeather();
if (weatherData == null){
  drawWeatherLoadMsg() 
} else {
  drawWeather(weatherData);
}



function stats(){
  return [
          "steps", 
          "distance",
          "floors",
          "active",
          "cals",
          "batt"
  ]
}
var stat = 0;

var userUnits =  units.temperature.toLowerCase();
let weatherInterval = null;
let openedWeatherRequest = false;
var updateInterval = 30;
var updateLocationInterval = 30;




// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);  
  if (evt.data.key === "unitToggle" && evt.data.newValue) {
    settings.unitToggle = JSON.parse(evt.data.newValue) 
    setUnit();
  }
  if (evt.data.key === "updateInterval" && evt.data.newValue) {
    settings.updateInterval = JSON.parse(evt.data.newValue).values[0].name
    setUpdateInterval();
  }
  if (evt.data.key === "locationUpdateInterval" && evt.data.newValue) {
    settings.updateLocationInterval = JSON.parse(evt.data.newValue).values[0].name
    setLocationUpdateInterval();
  }
  if (evt.data.key === "bgcolor" && evt.data.newValue) {
    settings.bgColor = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${settings.bgColor}`);
    setBgColor();
  }
  if (evt.data.key === "stripesToggle" && evt.data.newValue) {
    settings.stripes = JSON.parse(evt.data.newValue);
    console.log(`Stripes: ${settings.stripes}`);
    setStripesColor();
  }
  if (evt.data.key === "stripeColor" && evt.data.newValue) {
    settings.stripesColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Stripe color: ${settings.stripesColor}`);
    setStripesColor();
  }
  if (evt.data.key === "pinStripesToggle" && evt.data.newValue) {
    settings.pinStripes = JSON.parse(evt.data.newValue);
    console.log(`Pin Stripes: ${settings.pinStripes}`);
    setPinStripesColor();
  }
  if (evt.data.key === "pinStripesSpacing" && evt.data.newValue) {
    settings.pinStripesSpacing = JSON.parse(evt.data.newValue);
    console.log(`Pin Stripes: ${settings.pinStripesSpacing}`);
    setPinStripesSpace();
  }
  if (evt.data.key === "pinStripeColor" && evt.data.newValue) {
    settings.pinStripesColor = JSON.parse(evt.data.newValue);
    console.log(`Setting Pin Stripe color: ${settings.pinStripesColor}`);
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
  console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
  saveSettings();
};

function setUnit(){
  console.log(`Celsius: ${settings.unitToggle}`);
  var oldUnits = userUnits;
  if (settings.unitToggle)
    userUnits = 'c';
  else
    userUnits = 'f';
  if (oldUnits != userUnits){
    weather.setMaximumAge(0 * 60 * 1000); 
    weather.setUnit(userUnits);
    if (!openedWeatherRequest){
      console.log("Forcing Update Unit Change");
      openedWeatherRequest = true;
      fetchWeather();
    }
    weather.setMaximumAge(updateInterval * 60 * 1000); 
  }
  weather.setUnit(userUnits);
}

function setUpdateInterval(){
  console.log(`updateInterval is: ${settings.updateInterval}`);
  let oldInterval = updateInterval;
  if (settings.updateInterval == "5 minutes")
    updateInterval = 5;
  else if (settings.updateInterval == "15 minutes")
    updateInterval = 15;
  else if (settings.updateInterval == "30 minutes")
    updateInterval = 30;
  else if (settings.updateInterval == "1 hour")
    updateInterval = 60;
  else if (settings.updateInterval == "2 hours")
    updateInterval = 120;
  if (updateInterval < oldInterval){
    weather.setMaximumAge(1 * 60 * 1000); 
    if (!openedWeatherRequest){
      console.log("Forcing Update Interval Change");
      openedWeatherRequest = true;
      fetchWeather();
    }
  }
  weather.setMaximumAge(updateInterval * 60 * 1000); 
  if (weatherInterval != null)
    clearInterval(weatherInterval);
  weatherInterval = setInterval(fetchWeather, updateInterval*60*1000);
  //console.log("Acutal Interval: " + weather._maximumAge)
}

function setLocationUpdateInterval(){
  console.log(`locationUpdateInterval is: ${settings.updateLocationInterval}`);
  let oldLocationInterval = updateLocationInterval;
  if (settings.updateLocationInterval == "5 minutes")
    updateLocationInterval = 5;
  else if (settings.updateLocationInterval == "15 minutes")
    updateLocationInterval = 15;
  else if (settings.updateLocationInterval == "30 minutes")
    updateLocationInterval = 30;
  else if (settings.updateLocationInterval == "1 hour")
    updateLocationInterval = 60;
  else if (settings.updateLocationInterval == "2 hours")
    updateLocationInterval = 120;
  if (updateLocationInterval < oldLocationInterval){
    weather.setMaximumLocationAge(1 * 60 * 1000); 
    if (!openedWeatherRequest){
    console.log("Forcing Location Update Interval Change");
      openedWeatherRequest = true;
      fetchWeather()
    }
  }
  weather.setMaximumLocationAge(updateLocationInterval * 60 * 1000);
}

function setBgColor(){
  let background = document.getElementById("background");
  background.style.fill = settings.bgColor;
}

function setStripesColor(){
  let mainStripeL = document.getElementById("mainStripeL");
  let mainStripeR = document.getElementById("mainStripeR");
  
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
  let pinStripeLL = document.getElementById("pinStripeLL");
  let pinStripeLLB = document.getElementById("pinStripeLLB");
  let pinStripeLR = document.getElementById("pinStripeLR");

  let pinStripeRL = document.getElementById("pinStripeRL");
  let pinStripeRR = document.getElementById("pinStripeRR");
  let pinStripeRLB = document.getElementById("pinStripeRLB");
  
  if (settings.pinStripes){
    console.log("Setting Pin Stripes to: " + settings.pinStripesColor+"!!!")
    pinStripeRL.style.display = "inline";
    pinStripeRL.style.fill = settings.pinStripesColor;
    pinStripeRLB.style.display = "inline";
    pinStripeRLB.style.fill = settings.pinStripesColor;
    pinStripeRR.style.display = "inline";
    pinStripeRR.style.fill = settings.pinStripesColor;
    pinStripeLL.style.display = "inline";
    pinStripeLL.style.fill = settings.pinStripesColor;
    pinStripeLLB.style.display = "inline";
    pinStripeLLB.style.fill = settings.pinStripesColor;
    pinStripeLR.style.display = "inline";
    pinStripeLR.style.fill = settings.pinStripesColor;
  } else {
    pinStripeRL.style.display = "none";
    pinStripeLLB.style.display = "none";
    pinStripeRR.style.display = "none";
    pinStripeLL.style.display = "none";
    pinStripeLLB.style.display = "none";
    pinStripeLR.style.display = "none";
  }
}

function setPinStripesSpace(){
  console.log("Moving Stripes")
  let pinStripeLL = document.getElementById("pinStripeLL");
  let pinStripeLLB = document.getElementById("pinStripeLLB");
  let pinStripeLR = document.getElementById("pinStripeLR");

  let pinStripeRL = document.getElementById("pinStripeRL");
  let pinStripeRR = document.getElementById("pinStripeRR");
  let pinStripeRLB = document.getElementById("pinStripeRLB");
  
  if (deviceType == "Versa"){
    pinStripeLL.x1 = 12 - parseInt(settings.pinStripesSpacing);
    pinStripeLL.x2 = 27 - parseInt(settings.pinStripesSpacing);
    pinStripeLLB.cx = 27 - parseInt(settings.pinStripesSpacing);
    pinStripeLR.x1 = 48 + parseInt(settings.pinStripesSpacing);
    pinStripeLR.x2 = 63 + parseInt(settings.pinStripesSpacing);
    
    pinStripeRL.x1 = 252 - parseInt(settings.pinStripesSpacing);
    pinStripeRL.x2 = 237 - parseInt(settings.pinStripesSpacing);
    pinStripeRR.x1 = 288 + parseInt(settings.pinStripesSpacing);
    pinStripeRR.x2 = 273 + parseInt(settings.pinStripesSpacing);
    pinStripeRLB.cx = 273 + parseInt(settings.pinStripesSpacing);
  } else {
    pinStripeLL.x1 = 17 - parseInt(settings.pinStripesSpacing);
    pinStripeLL.x2 = 34 - parseInt(settings.pinStripesSpacing);
    pinStripeLLB.cx = 34 - parseInt(settings.pinStripesSpacing);
    pinStripeLR.x1 = 51 + parseInt(settings.pinStripesSpacing);
    pinStripeLR.x2 = 68 + parseInt(settings.pinStripesSpacing);
    
    pinStripeRR.x1 = 297 - parseInt(settings.pinStripesSpacing);
    pinStripeRR.x2 = 280 - parseInt(settings.pinStripesSpacing);
    pinStripeRL.x1 = 331 + parseInt(settings.pinStripesSpacing);
    pinStripeRL.x2 = 314 + parseInt(settings.pinStripesSpacing);
    pinStripeRLB.cx = 314 + parseInt(settings.pinStripesSpacing);
  }
}

function setClockColor(){
  let clockLabel = document.getElementById("clockLabel");
  clockLabel.style.fill = settings.clockColor;
}

function setTachColor(){
  let tach = document.getElementById("tach");
  let fuel = document.getElementById("fuel");
  let temp = document.getElementById("temp");

  tach.style.fill = settings.tachColor;
  fuel.style.fill = settings.tachColor;
  temp.style.fill = settings.tachColor;
}

function applySettings(){
  setUnit();
  setUpdateInterval();
  setLocationUpdateInterval();
  setBgColor();
  setStripesColor();
  setPinStripesColor();
  setPinStripesSpace();
  setClockColor();
  setTachColor();
  openedWeatherRequest = false;
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
  if (!openedWeatherRequest){
      console.log("Forcing Update Socket Open");
      openedWeatherRequest = true;
      fetchWeather();
    }
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

function drawWeatherLoadMsg(){
  let weatherIcon = document.getElementById("weatherIcon");
  let tempLabel = document.getElementById("tempLabel");
  
  tempLabel.text = "...";
  weatherIcon.href = "";
  if (!openedWeatherRequest){
      console.log("Forcing Update No File");
      openedWeatherRequest = true;
      fetchWeather();
    }
}

function drawWeather(data){
  let weatherIcon = document.getElementById("weatherIcon");
  let tempLabel = document.getElementById("tempLabel");

  console.log(data.conditionCode + ", " + data.description);
  weatherIcon.href = util.getWeatherIcon(data);
  tempLabel.text = data.temperature + "°";
}

function fetchWeather(){
  openedWeatherRequest = false;
  console.log("auto fetch");
  weather.fetch();
}

//----------------Weather Setup------------------------


applySettings();

weather.onsuccess = (data) => {
  weatherData = data;
  openedWeatherRequest = false;

  drawWeather(data);
}

weather.onerror = (error) => {
  console.log("Weather error " + JSON.stringify(error));
  openedWeatherRequest = false;
}


if (settings.noFile){
  console.log("No Settings File");
  weather.fetch();
}

me.onunload = saveSettings;

function loadSettings() {
  console.log("Loading Settings!")
  
  const SETTINGS_TYPE = "cbor";
  const SETTINGS_FILE = "settings.cbor";
  
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    console.log("No File")
    return {
      updateInterval : "30 minutes",
      updateLocationInterval : "30 minutes",
      unitToggle : false,
      bgColor : "deepskyblue",
      stripesColor : "silver",
      pinStripesColor : "black",
      pinStripesSpacing : 0,
      stripes : true,
      pinStripes: true,
      clockColor : "black",
      tachColor : "white",
      noFile : true
    }
  }
}

function loadWeather(){
  const SETTINGS_TYPE = "cbor";
  const WEATHER_FILE = "weather.cbor";
  
  try {
    return fs.readFileSync(WEATHER_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return null;
  }
}

function saveSettings() {
  console.log("Saving Settings");
  
  const SETTINGS_TYPE = "cbor";
  const SETTINGS_FILE = "settings.cbor";
  
  settings.noFile = false;
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
  saveWeather();
}

function saveWeather() {
  const SETTINGS_TYPE = "cbor";
  const WEATHER_FILE = "weather.cbor";

  fs.writeFileSync(WEATHER_FILE, weatherData, SETTINGS_TYPE);
}
function updateClock() {
  let clockLabel = document.getElementById("clockLabel");
  
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
  //clockLabel.text = `${12}:${59}`;
}

function updateClockData() {
  if (display.on){
    let hrNeedle = document.getElementById("hrNeedle");
    let flNeedle = document.getElementById("flNeedle");
   
    let hrLabel = document.getElementById("hrLabel");
    let statsLabel = document.getElementById("statsLabel");

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
    let degPerB = 135/100
    let fangle = 135-battery.chargeLevel*degPerB-10
    flNeedle.groupTransform.rotate.angle = fangle ;
        
    switch (stats()[stat]){
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
        statsLabel.text = `${battery.chargeLevel} %`;
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

weatherInterval = setInterval(fetchWeather, updateInterval*60*1000);
setInterval(updateClockData, .5*1000);
clock.ontick = () => updateClock();
if (!openedWeatherRequest){
      console.log("Forcing Update Face Started");
      openedWeatherRequest = true;
      fetchWeather();
    }
hrm.start();
