$(document).ready(function() {

  var restaurantString = `restaurants+in`;
  var activityString = `things+to+do+in`
  var googleKey = "AIzaSyA51GtAToTOjiu4pEYW8miXs6lwexTMZvk";
  var proxyServer = `https://cors-anywhere.herokuapp.com/`;
  var baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=`;

  var getUrl1 = `${proxyServer}${baseUrl}${restaurantString}+${localStorage.getItem('cityName')}&key=${googleKey}`;
  var getUrl2 = `${proxyServer}${baseUrl}${activityString}+${localStorage.getItem('cityName')}&key=${googleKey}`;

  function fetchCall(url) {
    let name;
    let actionString;
    let divName;
    let titleString;
    if (url === getUrl1) {
      actionString = 'restaurants+in';
      divName = 'restaurantSection';
      titleString = 'restaurants';
      console.log('case 1')
    } else if (url === getUrl2) {
      actionString = 'tourist+attractions+in';
      divName = 'activitySection';
      titleString = 'places to visit';
      console.log('case 2')
    }

    fetch(url, {
        method: "GET",
      })
      .then(response => response.json())
      .then(function(response) {
        console.log(response)
        for (element of response.results.slice(0, 5)) {
          console.log(element)
          let {
            formatted_address,
            rating,
            name
          } = element;
          let photo_ref = element.photos[0].photo_reference;
          console.log(photo_ref)
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
                    <div class="rating">${rating}</div>
                  </div>
                </div>
                `
              )
            })
        };
      })

  }

  fetchCall(getUrl1);
  fetchCall(getUrl2);
});
