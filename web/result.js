$(document).ready(function() {

  var restaurantString = `restaurants+in`;
  var activityString = `things+to+do+in`;
  var cafeString = `cafe+in`;

  var googleKey = "AIzaSyA51GtAToTOjiu4pEYW8miXs6lwexTMZvk";
  var weatherKey = "3c7ba6fb3b6b49c399372820182704";
  var cityName = localStorage.getItem('cityName');

  var proxyServer = `https://cors-anywhere.herokuapp.com/`;
  var baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=`;

  var getUrl1 = `${proxyServer}${baseUrl}${restaurantString}+${cityName}&key=${googleKey}`;
  var getUrl2 = `${proxyServer}${baseUrl}${activityString}+${cityName}&key=${googleKey}`;
  var getUrl3 = `${proxyServer}${baseUrl}${cafeString}+${cityName}&key=${googleKey}`;
  var weatherUrl = `https://api.apixu.com/v1/forecast.json?key=${weatherKey}&q=${cityName}&days=7`

  var weatherResponse = [];

  function fetchCall(url) {
    let name;
    let actionString;
    let divName;
    let titleString;
    if (url === getUrl1) {
      actionString = restaurantString;
      divName = 'restaurantSection';
      titleString = 'restaurants';
      // console.log('case 1')
    } else if (url === getUrl2) {
      actionString = activityString;
      divName = 'activitySection';
      titleString = 'places to visit';
      // console.log('case 2')
    } else if (url === getUrl3) {
      actionString = cafeString;
      divName = 'cafeSection';
      titleString = 'cafes';
    }

    console.log(url)

    fetch(url, {
        method: "GET",
      })
      .then(response => response.json())
      .then(function(response) {

        for (element of response.results.slice(0, 5)) {
          let {
            formatted_address,
            rating,
            name
          } = element;
          let width = (rating / 5) * 100;
          let photo_ref;
          if (element.photos === undefined) {
            photo_ref = `CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU`;
          } else photo_ref = element.photos[0].photo_reference;
          let imgRequestUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photo_ref}&key=${googleKey}`;
          let imgUrl;
          fetch(imgRequestUrl, {
              method: "GET",
            })
            .then(response => response.blob())
            .then(function(response) {
              var urlCreator = window.URL || window.webkitURL;
              var imageUrl = urlCreator.createObjectURL(response);
              $(`#${divName} > .resultTitle`).text(`Top 5 ${titleString} in ${localStorage.getItem('cityName')}`)
              $(`#${divName} >  .resultList`).append(
                `<div class="result">
                  <div class="resultImg">
                <img src="${imageUrl}" alt="">
                  </div>
                  <div class="resultDetails">
                    <div class="name">${name}</div>
                    <div class="address">${formatted_address}</div>
                    <div class="rating"> Rating: ${rating}
                      <div class="ratingStar">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <div class="ratingPercentage" style="width:${width}%">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `
              )
            })
        };
      })

  }

  fetch(weatherUrl, {
      method: "GET",
    }).then(response => response.json())
    .then(function(response) {

      weatherResponse = response;
      localStorage.setItem("weatherResponse", JSON.stringify(weatherResponse));

      for (element of response.forecast.forecastday) {

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

        $("#weatherSection > .resultTitle").text(`Weather forecast of ${cityName} in the next 7 days`);
        $("#weatherSection > .weatherDisplay").append(`
  <div class="day">
    <div class="date">${date}</div>
    <div class="icon"><img src="${icon}" alt=""></div>
    <div class="temp">${avgtemp_c} &#176;C</div>
    <div class="text">${text}</div>
  </div>
  `);
      }
    })


  fetchCall(getUrl2);
  fetchCall(getUrl1);
  fetchCall(getUrl3);

  $('#weatherSection').click(function() {
    window.location = "weather.html"
  })

});
