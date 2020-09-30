// MY VARIABLES

let ipAddress,
  myLocation,
  timeZone,
  ISP,
  lat,
  lng;
let started = 0;
let mymap;
let marker;


// GETTING IP ADDRESS DATA FROM API

let ipify = 'https://geo.ipify.org/api/v1?apiKey=at_TfV7HMAjL832xhjwsziBM7ITzz95r';

$(document).ready(async function () {
  if (started == 1)
    return;
  started = 1;

  // GET IP DATA

  await $.get(ipify,
    function (data, status) {
      if (status == 'success') {
        ipAddress = data.ip;
        myLocation = data.location.city + ", " + data.location.region + "," + data.location.country;
        timeZone = "UTC " + data.location.timezone;
        ISP = data.isp;
        lat = data.location.lat;
        lng = data.location.lng;
        $("#ip").text(ipAddress);
        $("#location").text(myLocation);
        $("#timezone").text(timeZone);
        $("#isp").text(ISP);
      }
    });


  // DISPLAY THE MAP

  mymap = L.map('mapid').setView([lat, lng], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFnYXIteWFzc2VyIiwiYSI6ImNrZm03b2lsaDAwbTAyeW1xMWQxdG5scXEifQ._bldSyPp3_5CrmhyXQeWLg'
  }).addTo(mymap);
  marker = L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: "images/icon-location.svg"
    })
  }).addTo(mymap);
});
$("#search-btn").click(async () => {
  let searchIp = $("#txt-area").val();
  try {
    await $.get((ipify + "&ipAddress=" + searchIp),
      function (data, status) {

        if (status == 'success') {
          $("#txt-area").removeClass("error");
          ipAddress = data.ip;
          myLocation = data.location.city + ", " + data.location.region + "," + data.location.country;
          timeZone = "UTC " + data.location.timezone;
          ISP = data.isp;
          lat = data.location.lat;
          lng = data.location.lng;
          $("#ip").text(ipAddress);
          $("#location").text(myLocation);
          $("#timezone").text(timeZone);
          $("#isp").text(ISP);

        } else {
          $("#txt-area").addClass("error");
        }

      });
  } catch (error) {

    $("#txt-area").addClass("error");
    return;
  }




  mymap.setView([lat, lng], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFnYXIteWFzc2VyIiwiYSI6ImNrZm03b2lsaDAwbTAyeW1xMWQxdG5scXEifQ._bldSyPp3_5CrmhyXQeWLg'
  }).addTo(mymap);
  let marker = L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: "images/icon-location.svg"
    })
  }).addTo(mymap);

})