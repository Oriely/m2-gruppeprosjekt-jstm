function createBooking() {
    var bookedTime = `${model.inputTime.fromInputDate}T${model.inputTime.fromInputTime}`
    model.inputs.inputTime = bookedTime;
    errors = [];
    if (model.app.selectedTable) {


    if (!model.inputs.inputTime) {errorHandler('Du må velge et tidspunkt.', 'time')}
    if (!model.inputs.inputNumber) {errorHandler('Du skrive inn et nummer.', 'number')}
    if (!model.inputs.inputNumberOfGuest) {errorHandler('Du må velge hvor antall gjester.', 'guest')}
    if (!model.inputs.inputName) {errorHandler('Du må skrive inn et navn.', 'name')}
    } else {
        errorHandler('Du må velge et bord.', 'selecttable')
    }
    for (let table of model.app.selectedTable) {
        
    }
    if(model.inputs.inputTime && model.inputs.inputNumber && model.inputs.inputNumberOfGuests && model.inputs.inputName) {
        console.log(123)
        model.bookingTimes.push({
                table: model.app.selectedTable,
                chairCount: checkChairCount(model.app.selectedTable),
                bookedInfo: {
                    bookedName: model.inputs.inputName,
                    bookedNumber: model.inputs.inputNumber,
                    bookedTime: model.inputs.inputTime,
                    bookedTimeEnd: model.inputs.inputTimeEnd,
                    bookedGuestCount: model.inputs.inputNumberOfGuests,
                    bookedChild: model.inputs.inputChildChair,
                    bookedMessage: model.inputs.inputMessage,
                }
        });
    }



        checkTableStatus();
        updateView();
}

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
    console.log(model.inputs.inputTime)
    model.inputTime.fromInputTime = model.inputs.inputTime.substring(11, 16);
    model.inputTime.fromInputDate = model.inputs.inputTime.substring(0, 10);
    updateView();
}