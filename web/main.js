$(document).ready(function() {

  let cityName;

  $(".cityName").click(function() {
    cityName = $(this).text();
    console.log(cityName);
    localStorage.setItem("cityName", cityName);
    window.location = "result.html";
  });

  $(".readMore").click(function() {
    let cityName = $(this).parent().find(".cityName").text();
    console.log(cityName);
    window.location = "result.html";
    localStorage.setItem("cityName", cityName);
  });

  $(".logoDiv").click(function() {
    window.location = "main.html";
  });

  $('.citySearch > input').keypress(function(e) {
    if (e.which == 13) {
      cityName = $(this).val();
      let key = `AIzaSyA51GtAToTOjiu4pEYW8miXs6lwexTMZvk`;
      let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=(cities)&key=${key}`

      fetch(url, {
          method: "GET",
        })
        .then(response => response.json())
        .then(function(response) {
          cityName = response.predictions[0].structured_formatting.main_text;
          localStorage.setItem("cityName", cityName);
          window.location = "result.html";
        })
    }
  });
});
