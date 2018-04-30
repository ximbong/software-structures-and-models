$(document).ready(function() {


  $(".city").click(function() {
    let cityName = $(this).find(".cityName").text();
    console.log(cityName);

    window.location="result.html";
    // $(".resultList").append(
    //   `
    //   <div class="result">
    //     <div class="resultImg">
    //   <img src="https://lh3.googleusercontent.com/p/AF1QipPfuZ6_yPYKVdMPSgbArE12x6zEkFQVuYnXj20=s1600-w640" alt="">
    //     </div>
    //     <div class="resultDetails">
    //       <div class="name">Ravintola Olo</div>
    //       <div class="address">Pohjoisesplanadi 5, 00170 Helsinki, Finland</div>
    //       <div class="rating">4.8</div>
    //     </div>
    //   </div>
    //   `
      // );
    console.log("success")
    localStorage.setItem("cityName", cityName);
  });
});
