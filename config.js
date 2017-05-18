function getHotels(type,start,end) {
	$('.content p').remove();
	$.ajax({
        url: "http://www.mocky.io/v2/591596dc100000b9027595b1",
        cache: false,
        dataType: "json"
    }).done(function(data) {  // Logic inside the done method as suggested
        data.forEach(function(booking) {
        	if(booking.roomType === type && start <= booking.checkIn.substring(0,2) && booking.checkIn.substring(0,2) <= end) {   // Check for the room Type and Date of booking
        		var days = booking.checkOut.substring(0,2) - booking.checkIn.substring(0,2);
        		var daysPadding = days*100 + 50;
        		var styleLeft = checkInMargin( (booking.checkIn.substring(0,2)) % 7 );
        		var id = document.getElementById(booking.roomNumber);
        		var append = `<p style="left:${styleLeft}px;width:${daysPadding}px;"> Booked </p>`
        		$(id).append(append);
        	}
        });
    });

    function checkInMargin(checkIn) {
		switch(checkIn) {
			case 0: 
				return 900;
			case 6:
				return 800;
			case 5:
				return 700;
			case 4:
				return 530;
			case 3:
				return 500;
			case 2:
				return 400;
			case 1:
				return 300;
		}
	}
}