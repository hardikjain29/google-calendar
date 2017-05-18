function getHotels() {
  const type = $('.type').val();
  const week = $('.week').val();
  const start = parseInt(week.charAt(0));
  const end = parseInt(week.substring(2,4));
  $('.booked, .header p, .typeHeading h1').remove(); // Remove the previous content before inserting new one.
  $.ajax({
    url: "http://www.mocky.io/v2/591596dc100000b9027595b1",
    cache: false,
    dataType: "json"
  }).done(function (data) {  // Logic inside the done method as suggested
    let flag = 0;
    const typeHeading = `<h1 class="type">${type.toUpperCase()}</h1>`;
    $('.typeHeading').append(typeHeading);
    data.forEach(function (booking) {
      const numberOfDaysToDisplay = 7+1;
      if (booking.roomType === type && start <= booking.checkIn.substring(0, 2) && booking.checkIn.substring(0, 2) <= end) {   // Check for the room Type and Date of booking
        if (flag === 0) { // Show Dates Row only Once
          let header = `<p style="width: ${100 / numberOfDaysToDisplay}%;left: ${100 / numberOfDaysToDisplay}%;">Room Number</p>`;
          for (let i = start; i <= end; i++) {
            header = header + `<p style="width: ${100 / numberOfDaysToDisplay}%;left: ${100 / numberOfDaysToDisplay}%;">${i}</p>`;
          }
          $('.header').append(header);
          flag = 1; // Stop From executing twice
        }
        const checkInDate = booking.checkIn.substring(0, 2);
        const days = booking.checkOut.substring(0, 2) - checkInDate; //Days booked by a particular user of a particular room
        const id = document.getElementById(booking.roomNumber);
        let dayOfWeek = checkInDate % (numberOfDaysToDisplay-1); // If the remainder is 0
        if(dayOfWeek === 0) {
          dayOfWeek = numberOfDaysToDisplay-2;
        }
        const append = `<p class="booked" style="width: ${(100 / numberOfDaysToDisplay) * days}%;left: ${(100 / numberOfDaysToDisplay) * dayOfWeek}%;"> Booked </p>`;
        $(id).append(append); // Add the p tag to the respective room number
      }
    });
  });
}