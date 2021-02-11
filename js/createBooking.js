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
                console.log(extraTable)
            }
        }
        if(model.inputs.inputTime && model.inputs.inputNumber && model.inputs.inputNumberOfGuests && model.inputs.inputName) {
            console.log(123)
            model.bookingTimes.push({
                    table: model.app.selectedTable[table],
                    chairCount: checkChairCount(model.app.selectedTable[table]),
                    extraTable: extraTable,
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
    // if (model.tables.fits4.includes(index)) {
    //     return 4;
    // }
    // else if (model.tables.fits6.includes(index)) {
    //     return 6;  
    // }
}



function setTimeToCurrentTime() {
    model.inputs.inputTime = new Date().toISOString().substring(0, 16)
    console.log(model.inputs.inputTime)
    model.inputTime.fromInputTime = model.inputs.inputTime.substring(11, 16);
    model.inputTime.fromInputDate = model.inputs.inputTime.substring(0, 10);
    updateView();
}