


function checkTableStatus() {
    var currentTime = new Date(model.inputs.inputTime);
    let statusObj = {};
    // console.log(model);
    let bookings = model.bookingTimes;

    bookings.forEach(booking => {
        let tempObj = {};

        let bookedBy = "";
        let bookerPhoneNumber = 0;
        let startBookDate = new Date(booking.bookedInfo.bookedTime);
        let bookings = []

        let endBookDate = (booking.bookedInfo.bookedTimeEnd == "" ? getDayEndDate(startBookDate) : new Date(booking.bookedInfo.bookedTimeEnd));

        let tableLetter = booking.table;


        let timeTillNextBooking = checkHoursLeftBeforeBooking(startBookDate, currentTime);


        let bookingEnded = checkBookingEnded(currentTime, endBookDate);
        let bookingStatus = determineBookingStatus(timeTillNextBooking, bookingEnded);
        // fungerer hit

        // tempObj["timeLeft"] = checkHoursLeftBeforeBooking(startBookDate, currentTime);

        if (tableLetter in statusObj) {
            bookingStatus = resolveStatusConflict(tableLetter, bookingStatus, statusObj);
            bookings = statusObj[tableLetter].bookings
        };

        if (bookingStatus === 2) {
            bookedBy = booking.bookedInfo.bookedName;
            bookerPhoneNumber = booking.bookedInfo.bookedNumber;
        } 

        let bookedInfo = booking.bookedInfo;
        bookings.push(bookedInfo);
        


        statusObj[booking.table] = { bookingStatus, bookingEnded, timeTillNextBooking, startBookDate, bookedBy, bookedNumber, bookings };

    });


    model.status = statusObj;
    updateView();
}




function determineBookingStatus(timeTillNextBooking, bookingEnded) {
    // if (timeTillNextBooking <= -300) {
    //     return 0;
    // }

    if (timeTillNextBooking > 120 || bookingEnded) {
        return 0;
    }

    else if (timeTillNextBooking >= 1 && timeTillNextBooking <= 120) {
        return 1;
    }

    else if (timeTillNextBooking <= 0 && !bookingEnded) {
        return 2;
    }
    else {
        return -1;
    }

}



//note: HoursLeft is rounded up to nearest whole number
function checkHoursLeftBeforeBooking(startBookDate, currentTime) {
    let timeToBooking = (Math.ceil(startBookDate - currentTime) / 1000 / 60);
    timeToBooking = Math.round(timeToBooking)
    return timeToBooking;
}

function checkBookingEnded(currentTime, endDate) {
    // if (currentTime > endDate) {
    //     return true;
    //     console.log('returned');
    // }
    // console.log('returned2');
    // let time = new Date();
    // console.log(time)
    // console.log(endDate)
    // let timeLeft = (Math.ceil((endDate - time) / 1000 / 60 / 60));
    // return (timeLeft <= 0 ? true : false);

    return (currentTime > endDate);
}



function getDayEndDate(bookingDate) {
    tempDate = new Date(bookingDate)


    let tempDateToString = tempDate.toString()
    let tempDateOnlyDay = tempDateToString.substring(0, 15);

    let tempDateOnlyTime = '00:00:00 GMT+0100'
    let tempDateComplete = tempDateOnlyDay + ' ' + tempDateOnlyTime;
    // legg til en dag her!

    let endDateTime = new Date(tempDateComplete)

    var newDate = new Date(endDateTime.setTime(endDateTime.getTime() + 1 * 86400000));
    return newDate;
    // denne fungerer!

}

//If the table in question already has a status, compare the current statuses and 
//keep the one with the highest priority. For instance, if a table has 2 bookings
//Where one starts in 5 hours(vacant status) and one is currently ongoing(taken status),
//This function sets the current status to taken.
function resolveStatusConflict(tableLetter, bookingStatus, statusObj) {

    let existingStatus = statusObj[tableLetter]['bookingStatus'];
    if (bookingStatus > existingStatus) { return bookingStatus }
    else { return existingStatus };

}


