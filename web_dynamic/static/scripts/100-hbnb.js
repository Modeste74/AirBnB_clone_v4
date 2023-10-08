$(document).ready(function () {
  const amenityIDs = {};
  const locationIDs = {};
  
  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const type = $(this).data('type');
    if (this.checked) {
      if (type === 'state' || type === 'city') {
        locationIDs[id] = true;
      }
    } else {
      if (type === 'state' || type === 'city') {
        delete locationIDs[id];
      }
    }
    const locationList = Object.values(locationIDs).join(', ');
    $('.locations h4').text(locationList);
  });

  $('.amenites input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      amenityIDs[amenityID] = amenityName;
    } else {
      delete amenityIDs[amenityID];
    }
    const amenitiesList = Object.values(amenityIDs).join(', ');
    $('.amenities h4').text(amenitiesList);
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
  
  /*function updateLocations () {
    const locationList = Object.values(locationIDs).join(', ');
    $('.locations h4').text(locationList);*/
  
  $('button').click(function () {
    const amenitiesList = Object.values(amenityIDs);
    const locationsList = Object.values(locationIDs);
    const requestBody = {
      'amenities': amenitiesList,
      'cities': locationsList,
      'states': locationsList
    };
    fetchPlaces(requestBody);
  });
  checkApiStatus();
  fecthPlaces({});
});
