
function checkTableStatus() {
let statusObj = {};
console.log(model);
let bookings = model.bookingTimes;
let currentTime = new Date();
//let dayEndDate = getDayEndDate(currentTime);


bookings.forEach(booking => {
    let tempObj = {};
    console.log(`${booking.table}: ${booking.bookedInfo.bookedTime}`);
    
    let startBookDate = new Date(booking.bookedInfo.bookedTime);
    let endBookDate = (booking.bookedInfo.bookedTimeEnd == "" ? getDayEndDate() : new Date(booking.bookedInfo.bookedTimeEnd) );
    let endBookDate = new Date(booking.bookedInfo.bookedTimeEnd);
    let tableLetter = booking.table;
    determineTableStatus(startBookDate, endBookDate, tableLetter)


    

    
    console.log(statusObj[booking.table]);
    

    





    tempObj["timeLeft"] = timeToBooking;
    statusObj[booking.table] = tempObj;
    statusObj.Test = "blablabla";
});

return statusObj;
}




function determineTableStatus(startBookDate, endBookDate, letter) {

    let timeTillNextBooking = checkHoursLeftBeforeBooking(startBookDate, endBookDate);
    
    if (timeTillNextBooking >= 0 && timeTillNextBooking <= 2) {
        return 1;
    }

    else if (timeTillNextBooking >= 2) {
        return 0;
    }

    else if (timeTillNextBooking >= 2) {}

}



//note: HoursLeft is rounded up to nearest whole number
function checkHoursLeftBeforeBooking(startBookDate) {
    let timeToBooking = (Math.ceil(currentTime - startBookDate) / 1000 / 60 / 60);
    return timeToBooking;
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

function getDayEndDate (time) {
    time = new Date();
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate()+1);
    let timeString = tempDate.toISOString();
    
    timeString = timeString.substring(0, 10);
    endDate = new Date(timeString);
    console.log(endDate);
    let timeLeft = (Math.ceil((endDate - time) / 1000 / 60 / 60));
    return {timeLeft, endDate, bookingEnded};
}