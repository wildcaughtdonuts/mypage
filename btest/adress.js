//adress.js
//adress.js

const searchBtn = document.getElementById('search-btn');
const mapResultDiv = document.getElementById('mapResult');

function displayMarker(latitude, longitude) {
  var latLng = new kakao.maps.LatLng(latitude, longitude);

  var marker = new kakao.maps.Marker({
    position: latLng,
  });

  marker.setMap(map);
  map.setCenter(latLng);
}

function getLatLngFromAddress(address, callback) {
  var geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var lat = result[0].y;
      var lng = result[0].x;

      callback(lat, lng);
    } else {
      console.error("Failed to get coordinates from address");
    }
  });
}

searchBtn.addEventListener('click', () => {
  new daum.Postcode({
    oncomplete: function (data) {
      const address = data.address;
      const buildingCode = data.buildingCode;
      const apiKey = "5A1ar8VsZgpiuOpuMbwPSgtsHIl%2FDCfu%2FMINUxKvTbwgL6nXfgG42fYYAHIq4gmp1bUZcQHO%2F1B2ilg7w8Hlzw%3D%3D";
      const siggCd = buildingCode.substr(0, 5);
      const bjdCd = buildingCode.substr(5, 5);
      const bunCd = buildingCode.substr(11, 4);
      const jiCd = buildingCode.substr(15, 4);
      const apiUrl = `https://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?sigunguCd=${siggCd}&bjdongCd=${bjdCd}&platGbCd=0&bun=${bunCd}&ji=${jiCd}&ServiceKey=${apiKey}&numOfRows=150`;
      const recapUrl = `https://apis.data.go.kr/1613000/BldRgstService_v2/getBrRecapTitleInfo?sigunguCd=${siggCd}&bjdongCd=${bjdCd}&platGbCd=0&bun=${bunCd}&ji=${jiCd}&ServiceKey=${apiKey}`;
      const flrUrl = `https://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?sigunguCd=${siggCd}&bjdongCd=${bjdCd}&platGbCd=0&bun=${bunCd}&ji=${jiCd}&ServiceKey=${apiKey}`;

      mapResultDiv.classList.remove('hidden');

      getLatLngFromAddress(address, function(lat, lng) {
        displayMarker(lat, lng);
      });
    }
  }).open();
});

