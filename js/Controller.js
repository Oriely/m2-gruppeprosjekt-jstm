function createBooking() {
    var currentCount = model.bookingTimes.length;
    var bookedTime = `${model.inputTime.fromInputDate}T${model.inputTime.fromInputTime}`
    var bookedTimeUntil = `${model.inputTime.toInputDate}T${model.inputTime.toInputTime}`
    model.inputs.inputTime = bookedTime;
    model.inputs.inputTimeEnd = bookedTimeUntil;
    errors = [];
    if (model.app.selectedTable) {


    if (!model.inputs.inputTime) {errorHandler('Du må velge et tidspunkt.', 'time')}
    if (!model.inputs.inputNumber) {errorHandler('Du skrive inn et nummer.', 'number')}
    if (!model.inputs.inputNumberOfGuest) {errorHandler('Du må velge hvor antall gjester.', 'guest')}
    if (!model.inputs.inputName) {errorHandler('Du må skrive inn et navn.', 'name')}
    } else {
        errorHandler('Du må velge et bord.', 'selecttable')
    }
    
    for (let table in model.app.selectedTable) {
        var extraTable = [];
        for (let i = 0; i < model.app.selectedTable.length; i++) {
            if (model.app.selectedTable[i] != model.app.selectedTable[table]) {
                extraTable.push(model.app.selectedTable[i]);
            }
        }
        if(model.inputs.inputTime && model.inputs.inputNumber && model.inputs.inputNumberOfGuests && model.inputs.inputName) {
            model.bookingTimes.push({
                    table: model.app.selectedTable[table],
                    chairCount: checkChairCount(model.app.selectedTable[table]),
                    extraTable: extraTable,
                    bookedInfo: {
                        bookedName: model.inputs.inputName.toString(),
                        bookedNumber: model.inputs.inputNumber.toString(),
                        bookedTime: model.inputs.inputTime.toString(),
                        bookedTimeEnd: model.inputs.inputTimeEnd.toString(),
                        bookedGuestCount: model.inputs.inputNumberOfGuests.toString(),
                        bookedChild: model.inputs.inputChildChair,
                        bookedMessage: model.inputs.inputMessage.toString(),
                    }
            });
            
        }
    }
        checkTableStatus();

        if (currentCount < model.bookingTimes.length) {
            
            model.inputs.inputName = '';
            model.inputs.inputNumber = '';
            model.inputs.inputTime = '';
            model.inputs.inputNumberOfGuests = '';
            model.inputs.inputMessage = '';
            model.inputs.inputTimeEnd = '';
            model.inputs.inputChildChair = '';
            model.inputTime.fromInputDate = '';
            model.inputTime.fromInputTime = '';
            model.inputTime.toInputTime = '';
            model.inputTime.toInputDate = '';
            alert('Du har lagd en bordbestilling')
        }

        updateView();
}

function checkChairCount(index) {
    for (let tableCategory in model.tables) {
        if (model.tables[tableCategory].includes(index)) {
            if (tableCategory != 'allTables') {

                var fitsX = tableCategory;
                return parseInt(fitsX.substring(5, 4));
            }
            
        }
    }
}

function setTimeToCurrentTime() {
    
    model.inputs.inputTime = new Date().toISOString().substring(0, 16)
    console.log(model.inputs.inputTime)
    model.inputTime.fromInputTime = model.inputs.inputTime.substring(11, 16);
    model.inputTime.fromInputDate = model.inputs.inputTime.substring(0, 10);
    updateView()
}

function editBookingsSave() {
    let inputsEdit = model.inputsEdit;
    model.bookingTimes[inputsEdit.editIndex] = (
        {
            table: inputsEdit.editTable,
            chairCount: inputsEdit.editChair,
            bookedInfo: {
                bookedName: inputsEdit.editName,
                bookedNumber: inputsEdit.editNumber,
                bookedTime: inputsEdit.editTime,
                bookedTimeEnd: inputsEdit.editTimeEnd,
                bookedGuestCount: inputsEdit.editNumberOfGuests,
                bookedChild: inputsEdit.editChildChair,
            }
        }
    );
    editBookingsReset();
    updateView();
}


function editBookingsReset() {
    model.inputsEdit = (
        {
            editIndex: '',
            editName: '',
            editNumber: '',
            editTime: '',
            editTimeEnd: '',
            editNumberOfGuests: '',
            editChildChair: '',
            editTable: '',
            editChair: '',
        }
    );
    dateSelect = new Date();
    dateSelect = dateSelect.toISOString().substr(0, 16)
}


function editBookingsSelect(i) {
    let bookingTimesInfo = model.bookingTimes[i].bookedInfo;
    model.inputsEdit = (
        {
            editIndex: i,
            editName: bookingTimesInfo.bookedName,
            editNumber: bookingTimesInfo.bookedNumber,
            editTime: bookingTimesInfo.bookedTime,
            editTimeEnd: bookingTimesInfo.bookedTimeEnd,
            editNumberOfGuests: bookingTimesInfo.bookedGuestCount,
            editChildChair: bookingTimesInfo.bookedChild,
            editTable: model.bookingTimes[i].table,
            editChair: model.bookingTimes[i].chairCount,
        }
    );
    updateView();
}
function changeDateValue(value) {
    model.statsMonth = [];
    inputStatsMonth = null;
    console.log(value, 'changedate');
    model.inputStatsDate = value.toString();
    getStatsFromYear()
    updateView();
}


function changeDateMonthValue(value) {
    console.log(value, 'changemonth');
    model.inputStatsMonth = value.toString();
    getStatsFromYear()  
    getStatsFromMonth();
    updateView();
}




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
            bookings = statusObj[tableLetter].bookings;
        };

        let bookedInfo = booking.bookedInfo;
        bookings.push(bookedInfo);
        
        statusObj[booking.table] = { bookingStatus, bookingEnded, endBookDate, timeTillNextBooking, startBookDate, bookings };

    });

    //Sort the bookings array so the order of the booking entries matches the dates with the
    //bookings closest to the current date appears first in the array
    for (const [key, value] of Object.entries(statusObj)) {

        let unsortedBookings = statusObj[key].bookings;
        let sortedBookings = unsortedBookings.sort((a, b) => new Date(a.bookedTime) - new Date(b.bookedTime) );
    }

    model.status = statusObj;

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
    tempDate = new Date(bookingDate);
    let tempDateToString = tempDate.toString();
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


function decPagination() {
    let page = parseInt(model.archiveOnPage)
    if((page - 1) < 1) return;
    model.archiveOnPage = page - 1;
    updateView();
}

function incPagination() {
    console.log(model.archiveOnPage, ' inc')
    let bookings = model.bookingTimes;
    let page_count = Math.ceil(bookings.length / model.archiveAmountOfRows);
    let page = parseInt(model.archiveOnPage);
    if(page + 1 > page_count) return;
    
    model.archiveOnPage = page + 1;
    updateView();
}
function changePaginationPage(page) {
    model.archiveOnPage = parseInt(page);
    updateView();
}

function selectPaginationPage(){
    let page = prompt('Velg side:   ')
    if(!page) return
    model.archiveOnPage = parseInt(page);
    updateView();
}

function changeAmountOfRowsInTable(rows_num) {
    console.log(rows_num);
    if(!rows_num) return;
    model.archiveAmountOfRows = parseInt(rows_num);
    updateView(); 
}

function decPagination2() {
    let page = parseInt(model.bookingsPaginationPage)
    if((page - 1) < 1) return;
    model.bookingsPaginationPage = page - 1;
    updateView();
}

function incPagination2() {
    let bookings = model.bookingTimes;
    let page_count = Math.ceil(bookings.length / model.archiveAmountOfRows);
    console.log(page_count)
    let page = parseInt(model.bookingsPaginationPage );
    if(page + 1 > page_count) return;
    
    model.bookingsPaginationPage = page + 1;
    updateView();
}
function changePaginationPage2(page) {
    model.bookingsPaginationPage = parseInt(page);
    updateView();
}

function selectPaginationPage2(){
    let page = prompt('Velg side:   ')
    if(!page) return;
    model.bookingsPaginationPage = parseInt(page);
    updateView();
}