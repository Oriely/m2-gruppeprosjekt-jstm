const app = document.getElementById('app');

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
    
checkTableStatus()