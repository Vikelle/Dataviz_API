// FETCH FUNCTIONS

async function fetchWeather(url) {
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

async function fetchImage(url, tint) {
  let requestConfig = {
    headers: {
      Origin: "*",
      "Content-Type": "image/jpeg",
      Authorization: "563492ad6f91700001000001608e9238674748009498eea15e94bde2"
    }
  };
  let response = await fetch(url + tint, requestConfig);
  let result = await response.json();
  return result;
}


// DATA FUNCTIONS

function getWeatherData(data) {
  try {
    const city = data.name;
    const icon = data.weather[0].icon;
    const temperature = data.main.temp;
    return {
      success: true,
      city: city,
      icon: icon,
      temperature: temperature
    };
  } catch (error) {
    // En cas d'erreur de parsing, on retourne une teinte par défaut
    console.log("Erreur : " + error);
    return {
      success: false
    };
  }
}

function getTint(iconName) {
  // Table de correspondance du nom des icones renvoyées par l'API avec une teinte
  let colorDictionnary = {
    "01d": "ffff00",
    "02d": "ffff00",
    "03d": "d3d3d3",
    "04d": "696969",
    "09d": "4682b4",
    "10d": "4682b4",
    "11d": "191970",
    "13d": "fffafa",
    "50d": "f5f5f5"
  };
  let tint = colorDictionnary[iconName];
  return tint;
}


// DISPLAY FUNCTIONS

function displayWeatherData(weatherObject) {
  if (weatherObject.success === true) {
    document.getElementById("ville").innerHTML = weatherObject.city;
    document.getElementById("temperature").innerHTML = Math.round(weatherObject.temperature) + "°C";
    document.getElementById("weather-img").setAttribute("src","http://openweathermap.org/img/w/" + weatherObject.icon + ".png");
  }
}

function displayImage(images) {
  const randomNumber = Math.floor(Math.random() * 81);
  try {
    const randomImageUrl = images.photos[randomNumber].src.landscape;
    document.getElementById("background-img").setAttribute("src", randomImageUrl);
  } catch (error) {
    console.log("Erreur : " + error);
  }
}


async function main() {
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=9dc1ac654e99ad5e689b88fde5a5fd33&units=metric";
  const imageUrl = "https://api.pexels.com/v1/search?query=weather&per_page=80&color=";

  const weatherResult = await fetchWeather(weatherUrl);
  const weatherData = getWeatherData(weatherResult);
  displayWeatherData(weatherData);
  const tint = getTint(weatherData.icon);
  const imageResult = await fetchImage(imageUrl, tint);
  displayImage(imageResult);
}

main();
setInterval(main, 3600000);
