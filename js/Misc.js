function selectTable(index) {
    model.app.selectedTable = index;
    viewCreateBooking();
}


function endBooking(bookingIndex) {
    const data = model.bookingTimes[bookingIndex];
    if(model.bookingTimes.length == bookingIndex) {model.bookingTimes.pop()}
    if(bookingIndex == 0) {model.bookingTimes.shift()}
    model.bookingTimes.splice(bookingIndex,bookingIndex);

    archive.push(data);
    updateView();
}

function removeFromArchive(bookingIndex) {
    if(archive.length == bookingIndex) {archive.pop(); return;}
    if(bookingIndex == 0) {archive.shift(); return;}
    archive.splice(bookingIndex,bookingIndex);

    updateView();
}

function changeScreen(p) {
    model.app.currentPage = p;
    animationSatus = false;
    updateView();
}   

function stopAnimations() {
    animationSatus = true;
        animationStatus = false;
}

function errorHandler(err, input){
    errors.push({
        error: err,
        input: input
    });
}

function showError(input) {
    
}

