function selectTable(index) {
    model.app.selectedTable = index;
    viewCreateBooking();
}

function selectTableForEdit(table) {
    console.log(table)
    model.selectedTable.selectedTableForEdit = table;
    if (model.tables.fits4.includes(table)) { model.selectedTable.selectedTableFits = 4 }
    if (model.tables.fits6.includes(table)) { model.selectedTable.selectedTableFits = 6 }
    editTablesView();
}

function deleteTable() {

    var selectedTable = model.selectedTable.selectedTableForEdit;
    if (model.tables.fits4.includes(selectedTable)) {
        model.tables.fits4.splice(model.tables.fits4.indexOf(selectedTable), 1)
        model.tables.allTables.splice(model.tables.allTables.indexOf(selectedTable), 1)
    }
    if (model.tables.fits6.includes(selectedTable)) {
        model.tables.fits6.splice(model.tables.fits6.indexOf(selectedTable), 1)
        model.tables.allTables.splice(model.tables.allTables.indexOf(selectedTable), 1)
    }
    model.app.selectedTableForEdit = '';
    editTablesView()
}

function changeTableInformation() {
    var selectedTable = model.selectedTable.selectedTableForEdit;
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    deleteTable(selectedTable)
    if (selectedTableGuests == 4) {
        model.tables.fits4.push(selectedTable)
    }
    if (selectedTableGuests == 6) {
        model.tables.fits6.push(selectedTable)
    }
    if (selectedTableGuests != 4 || selectedTableGuests != 6) {
        var Table = `fits${selectedTableGuests}`;
        if (model.tables[Table] == undefined) {
            model.tables[Table] = []
            model.tables[Table].push(selectedTable)
        } else {

            model.tables[Table].push(selectedTable)
        }
    }
        model.tables.allTables.push(selectedTable)
    editTablesView()
}


function endBooking(bookingIndex) {
    const data = model.bookingTimes[bookingIndex];
    if (model.bookingTimes.length == bookingIndex) { model.bookingTimes.pop() }
    if (bookingIndex == 0) { model.bookingTimes.shift() }
    model.bookingTimes.splice(bookingIndex, bookingIndex);

    archive.push(data);
    updateView();
}

function removeFromArchive(bookingIndex) {
    if (archive.length == bookingIndex) { archive.pop(); return; }
    if (bookingIndex == 0) { archive.shift(); return; }
    archive.splice(bookingIndex, bookingIndex);

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

function errorHandler(err, input) {
    errors.push({
        error: err,
        input: input
    });
}

function showError(input) {

}