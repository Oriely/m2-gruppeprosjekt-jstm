function createBooking() {
    var bookingTimeEnd = '';
    if (model.inputs.inputTimeEnd != '') {
        bookingTimeEnd = model.inputs.inputTimeEnd
    } else if (model.inputs.inputTimeEnd == '') {
        bookingTimeEnd = '';
    }
    if (model.app.selectedTable == '') {
        alert('Du må velge bord!')
    }
    model.bookingTimes.push(
        {
            table: model.app.selectedTable,
            chairCount: checkChairCount(model.app.selectedTable),
            bookedInfo: {
                bookedName: model.inputs.inputName,
                bookedNumber: model.inputs.inputNumber,
                bookedTime: model.inputs.inputTime,
                bookedTimeEnd: bookingTimeEnd,
                bookedGuestCount: model.inputs.inputNumberOfGuests,
                bookedChild: model.inputs.inputChildChair,
            }
        })
        checkTableStatus();
        updateView();
};

function checkChairCount(index) {
    if (model.tables.fits4.includes(index)) {
        return 4;
    }
    else if (model.tables.fits6.includes(index)) {
        return 6;  
    }
}

function setTimeToCurrentTime() {
    model.inputs.inputTime = new Date().toISOString().substring(0, 16)
    updateView();
}