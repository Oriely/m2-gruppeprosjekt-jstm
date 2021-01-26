
updateView()

function updateView() {
    if (model.app.currentPage == 'viewCreateBooking'){
        viewCreateBooking()
    } else if (model.app.currentPage == 'viewCheckBookingsDate') {
        viewCheckBookingsDate();
    }
} 