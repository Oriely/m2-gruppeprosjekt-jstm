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
    if (model.app.currentPage == 'managebookings') { viewCheckBookingsDate() }
    if (model.app.currentPage == 'archive') { archiveBookingList() }
    if (model.app.currentPage == 'edittables') { editTablesView() }
    if (model.app.currentPage == 'stats') { statisticsView() }
    if (!model.app.currentPage) {viewCreateBooking()}
    
}

window.onscroll = function() {myFunction()};
var navbar = document.querySelector('.nav-wrapper');

var sticky = navbar.offsetTop;
function myFunction() {
    
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
} 