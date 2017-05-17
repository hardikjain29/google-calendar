function getHotels(type,start,end) {
	$('.content p').empty();
	$.ajax({
        url: "http://www.mocky.io/v2/591596dc100000b9027595b1",
        cache: false,
        dataType: "json"
    }).done(function(data) {
        data.forEach(function(booking) {
        	if(booking.roomType === type && start <= booking.checkIn.substring(0,2) && booking.checkIn.substring(0,2) <= end) {
        		var days = booking.checkOut.substring(0,2) - booking.checkIn.substring(0,2);
        		var daysPadding = days*80;
        		var left = checkInMargin( (booking.checkIn.substring(0,2)) % 7 );
        		var id = document.getElementById(booking.roomNumber);
        		var append = '<p style="left:' + left +'px;width:'+ daysPadding + 'px;"> Booked </p>'
        		$(id).append(append);
        	}
        });
    });

    function checkInMargin(checkIn){
		switch(checkIn) {
			case 0: 
				return 560;
			case 6:
				return 480;
			case 5:
				return 400;
			case 4:
				return 320;
			case 3:
				return 240;
			case 2:
				return 160;
			case 1:
				return 80;
		}
	}
}