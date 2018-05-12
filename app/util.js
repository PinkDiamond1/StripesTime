// Remove all quotation marks from a string
export function stripQuotes(str) {
  return str ? str.replace(/"/g, "") : "";
}

export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function round2(number){
  var factor = Math.pow(10, 2);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export function getForecastIcon(code, description){
switch(code){
  case 0: //ClearSky
    return "../resources/icons/weather/whiteSun.png"
    break;
  case 1: //FewClouds
  case 2: //ScatteredClouds
    return "../resources/icons/weather/whitePartlySunny.png"
    break;
  case 3: //BrokenClouds
    return "../resources/icons/weather/whiteCloud.png"
    break;
  case 4: //ShowerRain
  case 5: //Rain
   return "../resources/icons/weather/whiteRain.png"
    break;
  case 6: //Thunderstorm
    if (wordStartsWith("T", description))
      return "../resources/icons/weather/whiteStorm.png"
    else
      return "../resources/icons/weather/whiteRain.png"
    break;
  case 7: //Snow
    return "../resources/icons/weather/whiteSnow.png"
    break;
  case 8: //Mist
    return "../resources/icons/weather/whiteHaze .png"
    break;
  default: //Other
    return "../resources/icons/weather/whiteSun.png"
    break;
  }
}