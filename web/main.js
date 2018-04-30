$(document).ready(function() {


  $(".cityName").click(function() {
    let cityName = $(this).find(".cityName").text();
    console.log(cityName);
    window.location="result.html";
    localStorage.setItem("cityName", cityName);
  });

  $(".readMore").click(function() {
    let cityName = $(this).parent().find(".cityName").text();
    console.log(cityName);
    window.location="result.html";
    localStorage.setItem("cityName", cityName);
  });

  $(".logoDiv").click(function(){
    window.location="main.html";
  })
});
