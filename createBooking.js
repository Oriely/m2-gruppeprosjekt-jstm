function createBooking() {
    if (model.inputs.inputTimeEnd !== '') {
        var bookingTimeEnd = new Date(model.inputs.inputTimeEnd).toISOString()
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
            bookingInfo: {
                bookedName: model.inputs.inputName,
                bookedNumber: model.inputs.inputNumber,
                bookedTime: new Date(model.inputs.inputTime).toISOString(),
                bookedTimeEnd: bookingTimeEnd,
                bookedGuestCount: model.inputs.inputNumberOfGuests,
                bookedChild: model.inputs.inputChildChair,
            }
        })
};

function checkChairCount(index) {
    if (model.tables.fits4.includes(index)) {
        return 4;
    }
    else if (model.tables.fits6.includes(index)) {
        return 6;
        
    }
}