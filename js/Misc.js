function selectTable(index) {
    if (index == undefined) return;
    if (model.app.selectMultipleTables) {
        if (model.app.selectedTable.includes(index)) {
            return;
        } else {
            model.app.selectedTable.push(index)
        }

    } else {
        model.app.selectedTable = [index];
    }

    viewCreateBooking();
}

function selectTableForEdit(table) {
    console.log(table)
    model.selectedTable.selectedTableForEdit = table;
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    if (model.tables.fits4.includes(table)) { model.selectedTable.selectedTableFits = 4 }
    if (model.tables.fits6.includes(table)) { model.selectedTable.selectedTableFits = 6 }
    editTablesView();
}

function deleteTable() {
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    var selectedTable = model.selectedTable.selectedTableForEdit;

    for (let tableList in model.tables) {
        if (model.tables[tableList].includes(selectedTable)) {
            model.tables[tableList].splice(model.tables[tableList].indexOf(selectedTable), 1);
        }
    }
    model.app.selectedTableForEdit = '';
    editTablesView()
}

function changeTableInformation() {
    var selectedTable = model.selectedTable.selectedTableForEdit;
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    deleteTable(selectedTable)

    if (selectedTableGuests) {
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

// function createInputTime(value) {
//     console.log(value)
// }

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