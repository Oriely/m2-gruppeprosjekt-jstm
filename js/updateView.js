const app = document.getElementById('app');


// window.addEventListener('mousemove', (e) => {
//     yAxis = (window.innerHeight - e.clientY);
//     xAxis = (window.innerWidth - e.clientX); 

//     app.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//     console.log(e.clientX);
// }) 

updateView();
sortObj(model.tables);


function updateView() {
    if (model.app.currentPage == 'booktables'){ createBookingsView()}
    if (model.app.currentPage == 'managebookings') { manageBookingsView() }
    if (model.app.currentPage == 'archive') { archiveView() }
    if (model.app.currentPage == 'edittables') { editTablesView() }
    if (model.app.currentPage == 'stats') { statisticsView() }
    if (!model.app.currentPage) { createBookingsView() }
}



const logo = document.querySelector('.logo');
const logot = document.querySelector('.logo-box');
checkTableStatus()