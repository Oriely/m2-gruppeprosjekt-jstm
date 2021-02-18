const app = document.getElementById('app');

updateView();


function updateView() {
    sortObj(model.tables);
    if (model.app.currentPage == 'booktables'){ createBookingsView()}
    if (model.app.currentPage == 'managebookings') { manageBookingsView() }
    if (model.app.currentPage == 'archive') { archiveView() }
    if (model.app.currentPage == 'edittables') { editTablesView() }
    if (model.app.currentPage == 'stats') { statisticsView() }
    if (!model.app.currentPage) { createBookingsView() }
 
}

