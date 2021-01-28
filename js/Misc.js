function selectTable(index) {
    model.app.selectedTable = index;
    viewCreateBooking();
}


function endBooking(bookingIndex) {
    delete model.bookingTimes[bookingIndex];
}

function changeScreen(p) {
    model.app.currentPage = p;
    updateView();
}