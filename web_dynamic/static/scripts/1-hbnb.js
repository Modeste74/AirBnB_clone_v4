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
});
