
function CheckTableStatus() {
let statusObj = {};
console.log(model);
let bookings = model.bookingtimes;
let currentTime = Date.now();
let dayEndDate = getDayEndDate(currentTime);


bookings.forEach(booking => {
    let tempObj = {};
    console.log(`${booking.table}: ${booking.bookedInfo.bookedTime}`);
    
    let startBookDate = new Date(booking.bookedInfo.bookedTime);
    if (booking.bookedInfo.bookedTimeEnd == "") {}
    let endBookDate = new Date(booking.bookedInfo.bookedTimeEnd);

    let bookingStatus = getTableStatus(startBookDate, endBookDate);

    
    console.log(statusObj[booking.table]);
    

    





    tempObj["timeLeft"] = timeToBooking;
    statusObj[booking.table] = tempObj;
    statusObj.Test = "blablabla";
});

return statusObj;
}



function getTableStatus(startBookDate, endBookDate) {
let currentTime = Date.now();
//let diff = currentTime - startBookDate;
let timeToBooking = (Math.ceil(currentTime - startBookDate) / 1000 / 60 / 60);


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
    dateNow = new Date();
    timeString = dateNow.toISOString();
    timeString.substring(0, 10);

}