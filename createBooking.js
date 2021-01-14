function createBooking() {
    model.bookingTimes.push(
 {
    table: model.app.selectedTable,
    chairCount: checkChairCount(model.app.selectedTable),
    bookingInfo: {
        bookedName: model.inputs.inputName,
        bookedNumber: model.inputs.inputNumber,
        bookedTime: model.inputs.inputTime,
        bookedTimeEnd: model.inputs.inputTimeEnd,
        bookedGuestCount: model.inputs.inputNumberOfGuests,
        bookedChild: model.inputs.inputChildChair,
    }
 })
}

function checkChairCount(index) {
    if (model.tables.fits4.includes(index)){
    return 4;
    }
    else if (model.tables.fits6.includes(index)){
    return 6;
    }
}