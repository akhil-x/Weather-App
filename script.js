const apiKey = 'd758d03109mshf834164f6ef8281p102f8ejsncd023a6600f7'; // Replace with your API key
const apiHost = 'weatherbit-v1-mashape.p.rapidapi.com';

// Fetch weather data for a city
async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?city=${city}&units=imperial&lang=en`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    },
  };

  // Show the loading animation
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weatherResult').innerHTML = ''; // Clear previous results

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const result = await response.json(); // Parse JSON response
    
    displayWeather(result); // Show weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherResult').innerHTML = `<p>Error: ${error.message}</p>`;
  } finally {
    // Hide the loading animation after fetching the data
    document.getElementById('loading').style.display = 'none';
  }
}

// Display the weather information
function displayWeather(data) {
  const forecast = data.data[0]; // Get the first forecast item
  const weatherDescription = forecast.weather.description; // Get the weather description
  changeBackground(weatherDescription); // Change the background based on the weather description

  const weatherCard = `
    <div class="weather-card">
      <h2>Weather Forecast for ${data.city_name}</h2>
      <p>Temperature: ${forecast.temp}°F</p>
      <p>Weather: ${weatherDescription}</p>
      <p>Humidity: ${forecast.rh}%</p>
      <p>Wind Speed: ${forecast.wind_spd} mph</p>
    </div>
  `;

  document.getElementById('weatherResult').innerHTML = weatherCard;
}

// Change background based on weather description
function changeBackground(weatherDescription) {
  const body = document.body; // Get the body element
  const condition = weatherDescription.toLowerCase(); // Convert to lowercase for consistent matching

  // Set background based on weather conditions
  if (condition.includes('thunderstorm')) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-photo/thunderstorm-city-nighttime_23-2151750453.jpg?t=st=1729424485~exp=1729428085~hmac=d71e39b985e78b4bd904f184c018531034e62e8186f4191628d28a075f60ccdd&w=1380')"; // Thunderstorm
  } else if (condition.includes('drizzle')) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-photo/rain-effect-nature-background_23-2148099046.jpg?t=st=1729425502~exp=1729429102~hmac=26fa72ec0e61c6b0a9420d4db3335e6e6a7d6adc050aeb950c29c4cf38bb9bfd&w=996')"; // Drizzle
  } else if (condition.includes('rain')) {
    body.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/042/146/565/non_2x/ai-generated-beautiful-rain-day-view-photo.jpg')"; // Rain
  } else if (condition.includes('snow')) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-photo/wide-shot-road-fully-covered-by-snow-with-pine-trees-both-sides-car-traces_181624-3616.jpg?t=st=1729425657~exp=1729429257~hmac=69c3660e7bda85a1f757ddb3053ca683e475dda084f99e9988bf9a47d10b66a3&w=1060')"; // Snow
  } else if (condition.includes('mist') || condition.includes('fog')) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-photo/aerial-view-city-fog_1153-5422.jpg?t=st=1729425731~exp=1729429331~hmac=b47c467046859c1c6ee3f81288bd0dbc6470a10f0f2bd4ee107fdb512fa3e88b&w=996')"; // Mist/Fog
  } else if (condition.includes('clear')) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-photo/summer-landscape-with-lake-sunny-day_1127-3762.jpg?t=st=1729425805~exp=1729429405~hmac=012af12fa191ae32857d68b5673f790219a720986e23e940655b3261b8b3248a&w=996')"; // Clear sky
  } else if (condition.includes('cloud')) {
    body.style.backgroundImage = "url('https://s7d2.scene7.com/is/image/TWCNews/clouds_from_above')"; // Cloudy
  } else {
    body.style.backgroundImage = "linear-gradient(to bottom right, #76c7c0, #b9fbc0)"; // Default gradient background
  }

  // Ensure the background image covers the entire body
  body.style.backgroundSize = "cover";
  body.style.transition = "background 0.5s ease"; // Smooth transition for background change
}
