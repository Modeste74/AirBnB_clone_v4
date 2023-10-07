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
  checkApiStatus();
});
