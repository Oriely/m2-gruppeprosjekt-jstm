
function CheckTableStatus() {
let statusObj = {};
console.log(model);
let bookings = model.bookingtimes;
let currentTime = Date.now();

bookings.forEach(booking => {
    let tempObj = {};
    console.log(`${booking.table}: ${booking.bookedInfo.bookedTime}`);
    
    let startBookDate = new Date(booking.bookedInfo.bookedTime);
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

let diff = currentTime - StartBookDate;
let timeToBooking = (Math.ceil(diff / 1000 / 60 / 60));

if (timeToBooking > -3) {
    tempObj[tablestatus] = 1
} 
else if (timeToBooking >= 0){
    tempObj[tableStatus] = 2
} 
else {
    tempObj[]
}

}
