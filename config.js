function getHotels(type, start, end) {
  $('.booked').remove(); // Remove the previous content before inserting new one.
  $('.header p').remove(); // Remove the previous content before inserting new one.
  $.ajax({
    url: "http://www.mocky.io/v2/591596dc100000b9027595b1",
    cache: false,
    dataType: "json"
  }).done(function (data) {  // Logic inside the done method as suggested
    let flag = 0;
    data.forEach(function (booking) {
      if (booking.roomType === type && start <= booking.checkIn.substring(0, 2) && booking.checkIn.substring(0, 2) <= end) {   // Check for the room Type and Date of booking
        if (flag === 0) { // Show Dates Row only Once
          let header;
          if (start === 1) { // Row for first week
            header = `
									<p  style="left: 100px;">Room Number</p>
									<p 	style="left: 200px;">1</p>
									<p 	style="left: 300px;">2</p>
									<p  style="left: 400px;">3</p>
									<p  style="left: 500px;">4</p>
									<p  style="left: 600px;">5</p>
									<p  style="left: 700px;">6</p>
									<p  style="left: 800px;">7</p>
								`
          } else { // Row for Second week
            header = `
									<p  style="left: 100px;">Room Number</p>
									<p 	style="left: 200px;">8</p>
									<p 	style="left: 300px;">9</p>
									<p  style="left: 400px;">10</p>
									<p  style="left: 500px;">11</p>
									<p  style="left: 600px;">12</p>
									<p  style="left: 700px;">13</p>
									<p  style="left: 800px;">14</p>
								`
          }
          const headerId = `.${booking.roomType}-header`;
          $(headerId).append(header); // Append to maple or oak header
          flag = 1; // Stop From executing twice
        }
        const days = booking.checkOut.substring(0, 2) - booking.checkIn.substring(0, 2); //Days booked by a particular user of a particular room
        let daysWidth = days * 100; // CSS to add width to show ${days}( :D ) colspan
        if (days >= 2) {
          daysWidth = daysWidth + 100;
        }
        const styleLeft = checkInMargin((booking.checkIn.substring(0, 2)) % 7); // CSS left property to align to which column it should adhere. % 7 as remainder would give me the day, which is same for all weeks.
        const id = document.getElementById(booking.roomNumber);
        const append = `<p class="booked" style="left:${styleLeft}px;width:${daysWidth}px;"> Booked </p>`
        $(id).append(append); // Add the p tag to the respective room number
      }
    });
  });

  function checkInMargin(checkIn) { // A swtich case function to get how many pixels to be left from 'left';
    switch (checkIn) {
      case 0:
        return 900;
      case 6:
        return 800;
      case 5:
        return 700;
      case 4:
        return 350;
      case 3:
        return 500;
      case 2:
        return 400;
      case 1:
        return 300;
    }
  }
}