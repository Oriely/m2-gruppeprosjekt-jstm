
var currentTime = new Date();

function checkTableStatus() {
let statusObj = {};
console.log(model);
let bookings = model.bookingTimes;

//let dayEndDate = getDayEndDate(currentTime);


bookings.forEach(booking => {
    let tempObj = {};
    console.log(`${booking.table}: ${booking.bookedInfo.bookedTime}`);
    
    let startBookDate = new Date(booking.bookedInfo.bookedTime);
    let endBookDate = (booking.bookedInfo.bookedTimeEnd == "" ? getDayEndDate(startBookDate) : new Date(booking.bookedInfo.bookedTimeEnd) );
    let tableLetter = booking.table;
    let timeTillNextBooking = checkHoursLeftBeforeBooking(startBookDate, currentTime);
    let bookingEnded = checkBookingEnded(endBookDate);
    let bookingStatus = determinebookingStatus(timeTillNextBooking, bookingEnded)
    
     tempObj["timeLeft"] = checkHoursLeftBeforeBooking(startBookDate, currentTime);

    if (tableLetter in statusObj) {resolveStatusConflict(tableLetter, bookingStatus, statusObj)};


     console.log(tableLetter + " has more than one booking " + (tableLetter in statusObj));

     statusObj[booking.table] = {bookingStatus, bookingEnded, timeTillNextBooking, startBookDate};
});

console.log(currentTime.toISOString());
return statusObj;
}




function determinebookingStatus(timeTillNextBooking, bookingEnded) {

    
    console.log(timeTillNextBooking);
    
    if  (timeTillNextBooking < -2 || bookingEnded) {
        return 0;
    }

    else if (timeTillNextBooking <= -1 && timeTillNextBooking >= -2) {
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
    let timeToBooking = (Math.ceil(startBookDate - currentTime) / 1000 / 60 / 60);
    return timeToBooking;
}

function checkBookingEnded(endDate) {
    time = new Date();
    let timeLeft = (Math.ceil((endDate - time) / 1000 / 60 / 60));
    return (timeLeft <= 0 ? true : false);
}

// if (timeToBooking >= -2) {
//     return 1;
// } 
// else if (timeToBooking >= 0  ){
//     if 
// } 
// else {
//     tempObj[]
// }

// }

function getDayEndDate (startBookDate) {
    time = new Date();
    let tempDate = startBookDate;
    tempDate.setDate(tempDate.getDate()+1);
    let timeString = tempDate.toISOString();
    
    timeString = timeString.substring(0, 10);
    endDate = new Date(timeString);   
    return endDate;
}

//If the table in question already has a status, compare the current statuses and 
//keep the one with the highest priority. For instance, if a table has 2 bookings
//Where one starts in 5 hours(vacant status) and one is currently ongoing(taken status),
//This function sets the current status to taken.
function resolveStatusConflict(tableLetter, bookingStatus, statusObj) {

    let existingStatus = statusObj[tableLetter]['bookingStatus'];

    if (bookingStatus > existingStatus) {return bookingStatus}
    else {return existingStatus};

}