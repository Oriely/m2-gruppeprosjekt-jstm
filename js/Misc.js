function selectTable(index) {
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
    var tables = model.tables;
    var selectedTable = model.selectedTable;
    if (tables.fits4.includes(table)) { selectedTable.selectedTableFits = 4 }
    if (tables.fits6.includes(table)) { selectedTable.selectedTableFits = 6 }
    editTablesView();
}

function deleteTable() {
    var selectedTable = model.selectedTable.selectedTableForEdit;
    var tables = model.tables;
    for (let tableList in model.tables) {
        if (tables[tableList].includes(selectedTable)) {
            tables[tableList].splice(tables[tableList].indexOf(selectedTable), 1);
        }
    }
    model.app.selectedTableForEdit = '';
    editTablesView()
}

function changeTableInformation() {
    var selectedTable = model.selectedTable.selectedTableForEdit;
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    var tables = model.tables;
    deleteTable(selectedTable)

    if (selectedTableGuests) {
        var Table = `fits${selectedTableGuests}`;
        console.log(Table)
        console.log(tables)
        if (tables[Table] == undefined) {
            console.log('Undefined')
            tables[Table] = []
            tables[Table].push(selectedTable)
        } else {

            tables[Table].push(selectedTable)
        }
    }
    tables.allTables.push(selectedTable)
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