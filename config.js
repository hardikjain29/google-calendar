var week;  // A Global state to see which week or page I am on. Like react state;
const numberOfDaysToDisplay = 7; // How many days to view in a single view. Change it to any number and that many days view will come up.

function getInitial() { //A func to set the initial State
  week = 0;
  $('.content div').remove(); // Remove the previous content before inserting new one.  
  getHotels(numberOfDaysToDisplay, week);
}

function incrementWeek() {
  week = week + 1;
  const start = (numberOfDaysToDisplay * week) + 1;
  getHotels(numberOfDaysToDisplay, start);
}

function decrementWeek() {
  if (week - 1 === -1) {
    alert('Cannot go below this');  // Alert to not allow below date 1
    return;
  }
  week = week - 1;
  const start = (numberOfDaysToDisplay * week) + 1;
  getHotels(numberOfDaysToDisplay, start);
}

function getHotels(numberOfDaysToDisplay, start) {
  const type = $('.type').val();   // Get the type from dropdown
  if (start === 0) {
    start = 1;  // To start it from day 1;
  }
  const end = (numberOfDaysToDisplay - 1) + start;
  $('.booked, .header p, .typeHeading h1').remove(); // Remove the previous content before inserting new one.
  $.ajax({
    url: "http://www.mocky.io/v2/591596dc100000b9027595b1",
    cache: true,
    dataType: "json"
  }).done(function (data) {  // Logic inside the done method as suggested

    const typeHeading = `<h1 class="type">${type.toUpperCase()}</h1>`;
    $('.typeHeading').append(typeHeading);
    $('.change_dates').css('display', 'block');
    numberOfDaysToDisplay = numberOfDaysToDisplay + 1; // Add 1 to accomodate Room Number Row.
    let header = `<p style="width: ${100 / numberOfDaysToDisplay}%;left: ${100 / numberOfDaysToDisplay}%;">Room Number</p>`;
    for (let i = start; i <= end; i++) {
      header = header + `<p style="width: ${100 / numberOfDaysToDisplay}%;left: ${100 / numberOfDaysToDisplay}%;">${i}</p>`; // Divide the columns into equal width and specific position from the left.
    }
    $('.header').append(header);
    data.forEach(function (booking) {
      if (booking.roomType === type && start <= booking.checkIn.substring(0, 2) && booking.checkIn.substring(0, 2) <= end) {   // Check for the room Type and Date of booking
        const checkInDate = booking.checkIn.substring(0, 2);
        const days = booking.checkOut.substring(0, 2) - checkInDate; //Days booked by a particular user of a particular room
        if (!document.getElementById(booking.roomNumber)) { // Check if room number present or not
          $('.content').append(`<div id="${booking.roomNumber}"><p>${booking.roomNumber}</p></div>`); // If not present, Add it.
        }
        let dayOfWeek = checkInDate % (numberOfDaysToDisplay - 1); // -1 to leave the room number cloumn and start from days column.
        if (dayOfWeek === 0) {
          dayOfWeek = numberOfDaysToDisplay - 2; // If 0, It is the end column
        }
        const id = document.getElementById(booking.roomNumber);
        const append = `<p class="booked" style="width: ${(100 / numberOfDaysToDisplay) * days}%;left: ${(100 / numberOfDaysToDisplay) * dayOfWeek}%;"> Booked </p>`;
        $(id).append(append); // Add the p tag to the respective room number
      }
    });
  });
}