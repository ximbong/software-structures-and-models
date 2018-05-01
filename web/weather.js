$(document).ready(function(){
  var weatherObject = JSON.parse(localStorage.getItem('weatherResponse'));
  console.log(weatherObject)

  var {humidity, temp_c, feelslike_c, wind_mph, condition:{text, icon}} = weatherObject.current;
  var {name,country} = weatherObject.location;

  $(".info").append(`
    <div>
      <div class="city">${name}</div>
      <div class="country">${country}</div>
    </div>
    <div class="currentWeather">

      <div class="icon">
        <img src="${icon}" alt="">
        <div class="temperature">Current temperature: ${temp_c} &#176;C</div>
            <div class="text">${text}</div>
      </div>

    <div class="details">
      <div class="humidity">Humidity: ${humidity}</div>
      <div class="wind">Wind: ${wind_mph}</div>
      <div class="feelslike">Feels like: ${feelslike_c} &#176;C </div>
    </div>

    </div>
    `)



        for (element of weatherObject.forecast.forecastday) {

          let {
            date,
            day: {
              avgtemp_c,
              condition: {
                icon,
                text
              }
            }
          } = element;

          $("#weatherSection > .resultTitle").text(`Weather forecast of ${localStorage.getItem('cityName')} in the next 7 days`);
          $("#weatherSection > .weatherDisplay").append(`
    <div class="day">
      <div class="date">${date}</div>
      <div class="icon"><img src="${icon}" alt=""></div>
      <div class="temp">${avgtemp_c} &#176;C</div>
      <div class="text">${text}</div>
    </div>
    `);
        }


});
