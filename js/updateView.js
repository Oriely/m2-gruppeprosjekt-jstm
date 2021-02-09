const app = document.getElementById('app');


// window.addEventListener('mousemove', (e) => {
//     yAxis = (window.innerHeight - e.clientY);
//     xAxis = (window.innerWidth - e.clientX); 

//     app.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//     console.log(e.clientX);
// }) 

updateView();



function updateView() {
    if (model.app.currentPage == 'booktables'){viewCreateBooking()}
    if (model.app.currentPage == 'listbookings') {bookingList()}
    if (model.app.currentPage == 'manage') { viewCheckBookingsDate() }
    if (model.app.currentPage == 'archive') { archiveBookingList() }
    if (!model.app.currentPage) {viewCreateBooking()}
    
}