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
    sortObj(tables);
    editTablesView()
}

function changeTableInformation() {
    if (model.selectedTable.selectedTableGuests == '') {return}
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

    sortObj(tables);
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
    console.log(3   )
    if(searchResult.length > 0 ) {
      console.log(33)
        for(let x = 0; x < model.bookingTimes.length; x++){
            if(
                model.bookingTimes[i].bookingInfo.bookedName == searchResult[i].bookingInfo.bookedName &&
                model.bookingTimes[i].bookingInfo.bookedNumber == searchResult[i].bookingInfo.bookedNumber &&
                model.bookingTimes[i].bookingInfo.bookedTime == searchResult[i].bookingInfo.bookedTime
            ){
                console.log(333)
                if(i == model.bookingTimes.length - 1) {model.bookingTimes.pop()}
                if(i == 0) { model.bookingTimes.shift()}
                if(i < model.bookingTimes.length || i > 0) {model.bookingTimes.slice(i, 1)}


                if(bookingIndex == searchResult.length - 1) {searchResult.pop()}
                if(i == 0) { searchResult[bookingIndex].shift()}
                if(i < searchResult.length || i > 0) {searchResult.slice(i, 1)}
 
            }
        }
        
    } else {
        if (archive.length == bookingIndex - 1) { archive.pop(); }
        if (bookingIndex == 0) { archive.shift(); }
        if (bookingIndex != 0 || archive.length != bookingIndex) { archive.splice(bookingIndex, 1); }
    }
    
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
    return count;
}

function sortObj(obj) {
    const data = Object.keys(obj).sort((x, y) => {
		const new_x = parseInt(x.substring(4));
        const new_y = parseInt(y.substring(4));
		return new_x - new_y;
    }).reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});

    model.tables = data;
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function search(event) {

    event.preventDefault();


    let input = model.archiveInputs.searchInput;
    let searchBy = model.archiveInputs.searchBy;

    var code = event.keyCode;
    if(input == '') {resetSearchQuery()}
    if(input) {

        if(code == 13) { //Enter keycode
            const _archive = archive;
            
            let inputTest = input.toLowerCase();
            searchResult = [];
        
            for(let i = 0; i < _archive.length; i++) {
                let name = _archive[i].bookedInfo.bookedName.toLowerCase()
                let number = _archive[i].bookedInfo.bookedNumber.toString();
                let date = _archive[i].bookedInfo.bookedTime;
                if (searchBy == 0) {

                }
                if(searchBy == 'name') {
                    if (name.includes(inputTest)) {
                        searchResult.push(_archive[i]);
                        
                        if(name == inputTest) {
                            searchResult = [];
                            searchResult.push(_archive[i]);
                        }
                    }
                }

                if(searchBy == 'number') {
                    if (number.includes(inputTest)) {
                        searchResult.push(_archive[i]);
                        
                    }  else {
                        console.log('did not find anythingeee')
                    }
                }

                if(searchBy == 'date') {
                    if (date.includes(inputTest)) {
                        searchResult.push(_archive[i]);
                    } else {
                        console.log('did not find anythingffff')
                    }
                }

    
            }   
            model.archiveOnPage = 1;
            updateView();
            
        }
        
    }
}

function resetSearchQuery() {
    model.archiveInputs.searchInput = '';
    searchResult = [];
    updateView();
}