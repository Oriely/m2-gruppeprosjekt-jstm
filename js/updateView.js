updateView();

function updateView() {
    if (model.app.currentPage == 'booktables'){viewCreateBooking()}
    if (model.app.currentPage == 'listbookings') {bookingList()}
    if (model.app.currentPage == 'managebookings') { viewCheckBookingsDate() }
    if (!model.app.currentPage) {viewCreateBooking()}
}