$(document).ready(function() {

  var restaurantString = `restaurants+in`;
  var googleKey = "AIzaSyDN3d7s52F9lT7X2ppKzm-mketfIFUC5U0";
  var getUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${restaurantString}+${localStorage.getItem('cityName')}&key=${googleKey}`


  $.ajax({
    url: getUrl,
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      alert('hello!')
      for (element of response.results) {
        let {formatted_address, rating, name} = element;
        let photo_ref = element.photos.photo_reference;
        let imgRequestUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${googleKey}`
        let imgUrl;
        $.ajax({
          url: imgRequestUrl,
          type: 'GET',
          dataType: 'json',
          success: function(response2) {
            imgUrl = response2;
          }
        });

        $(".resultList").append(
          `<div class="result">
              <div class="resultImg">
            <img src="${imgUrl}" alt="">
              </div>
              <div class="resultDetails">
                <div class="name">${name}</div>
                <div class="address">${formatted_address}</div>
                <div class="rating">${rating}</div>
              </div>
            </div>
            `
        );
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('jqXHR:');
      console.log(jqXHR);
      console.log('textStatus:');
      console.log(textStatus);
      console.log('errorThrown:');
      console.log(errorThrown);
      console.log('boo');
    },
    // beforeSend: setHeader
  });
  //
  // function setHeader(xhr) {
  //   xhr.setRequestHeader('Access-Control-Allow-Origin:', '*');
  //   xhr.setRequestHeader('Access-Control-Allow-Methods:','GET, POST');
  //   xhr.setRequestHeader("Access-Control-Allow-Headers:","X-Requested-With");
  // }
});
