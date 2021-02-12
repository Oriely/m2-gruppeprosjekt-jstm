function selectTable(index) {

    const tables = model.app.selectedTable;
    if (tables.includes(index)) {
        const tIndex = tables.indexOf(index);
        model.app.selectedTable.splice(tIndex, 1);

    } else {
        model.app.selectedTable.push(index)

    }

    // if (model.app.selectMultipleTables) {
    //     if (model.app.selectedTable.includes(index)) {
    //         model.app.selectedTable.indexOf()
    //     } else {
    //         model.app.selectedTable.push(index)
    //     }

    // } else {
    //     model.app.selectedTable = [index];
    // }

    viewCreateBooking();
}

function selectTableForEdit(table) {
    if (model.selectedTable.selectedTableForEdit == table) {
        model.selectedTable.selectedTableForEdit = '';
    } else {
        model.selectedTable.selectedTableForEdit = table;
        var tables = model.tables;
        var selectedTable = model.selectedTable;
        for (let tableList in model.tables) {
            if (tables[tableList].includes(table)) {
                selectedTable.selectedTableFits = parseInt(tableList.substring(4))
            }
        }
    }


    editTablesView();
}

function createNewTable() {
    var tableGuests = model.selectedTable.selectedTableGuests;
    var tableLetter = model.selectedTable.selectedTableLetter;
    var fitsX = `fits${tableGuests}`
    var tempList = [];
    if (tableGuests && tableLetter) {
        for (let tableList in model.tables) {
            tempList.push(tableList)
            if (tableList == fitsX) {
                model.tables[fitsX].push(tableLetter)
            }
            if (!tempList.includes(fitsX)) {
                model.tables[fitsX] = [];
                model.tables[fitsX].push(tableLetter)
                alert('Lagd ett nytt bord')
            }
        }
        updateView()
    }
}
    function deleteTable() {
        var selectedTable = model.selectedTable.selectedTableForEdit;
        var tables = model.tables;
        for (let tableList in model.tables) {
            if (tables[tableList].includes(selectedTable)) {
                tables[tableList].splice(tables[tableList].indexOf(selectedTable), 1);
            }
            if (tables[tableList].length == 0) {
                delete tables[tableList];
            }
        }
        model.app.selectedTableForEdit = '';
        editTablesView()
    }

    function changeTableInformation() {
        if (model.selectedTable.selectedTableGuests == '') {
            alert('Du må velge ny verdi for antall gjester')
            return
        }
        var selectedTable = model.selectedTable.selectedTableForEdit;
        var selectedTableGuests = model.selectedTable.selectedTableGuests;
        var tables = model.tables;
        deleteTable(selectedTable)

        if (selectedTableGuests) {
            var Table = `fits${selectedTableGuests}`;
            if (tables[Table] == undefined) {
                tables[Table] = []
                tables[Table].push(selectedTable)
            } else {

                tables[Table].push(selectedTable)
            }
        }

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
        if (archive.length == bookingIndex) { archive.pop(); }
        if (bookingIndex == 0) { archive.shift(); }
        if (bookingIndex != 0 || archive.length != bookingIndex) { archive.splice(bookingIndex, 1); }

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

    function tableCount() {
        const count = 0;
        for (const tables in model.tables) {
            count += tables.length;


        }
        console.log(count);
        return count;
    }