$(document).ready(function () {
  const amenityIDs = {};
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      amenityIDs[amenityID] = amenityName;
    } else {
      delete amenityIDs[amenityID];
    }
    updateAmenities();
  });

  function checkApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }
  checkApiStatus();

  function fetchPlaces (requestBody) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      success: function (data) {
        $('.places').empty();
        data.forEach(function (place) {
          const article = document.createElement('article');
          article.innerHTML = `
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="infromation">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          `;
          $('.places').append(article);
        });
      },
      error: function () {
        console.error('Failed to fetch places data.');
      }
    });
  }
  
  function updateAmenities () {
    const amenitiesList = Object.values(amenityIDs);
    const requestBody = { 'amenities': amenitiesList };
    fetchPlaces(requestBody);
  }
  $('button').click(function () {
    updateAmenities();
  });
  fetchPlaces({});
});
