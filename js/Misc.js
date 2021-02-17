function selectTable(index) {
    const tables = model.app.selectedTable;
    if (tables.includes(index)) {
        const tIndex = tables.indexOf(index);
        model.app.selectedTable.splice(tIndex, 1);
    } else { model.app.selectedTable.push(index) }
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
    updateView();
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

    model.app.selectedTableForEdit = '';
    sortObj(model.tables);
    updateView();

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
    sortObj(model.tables);
    updateView();
}

function changeTableInformation() {
    if (model.selectedTable.selectedTableGuests == '') {
        alert('Du må velge ny verdi for antall gjester')
        return
    }
    var selectedTable = model.selectedTable.selectedTableForEdit;
    var selectedTableGuests = model.selectedTable.selectedTableGuests;
    var tables = model.tables;
    deleteTable(selectedTable);

    if (selectedTableGuests) {
        var Table = `fits${selectedTableGuests}`;
        if (tables[Table] == undefined) {
            tables[Table] = []
            tables[Table].push(selectedTable)
        } else {

            tables[Table].push(selectedTable)
        }
    }

    updateView()
}


function removeFromArchive(bookingIndex) { 
    console.log(3   )
    if(searchResult.length >= 1 ) {
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
    // gets year and month and returns the days in the month selected
    return new Date(year, month + 1, 0).getDate();
}

function search(event) {
    event.preventDefault();

    let input = model.archiveInputs.searchInput.toString().toLowerCase();
    let searchBy = model.archiveInputs.searchBy.toString();

    var code = event.keyCode;
    if(input == '') {resetSearchQuery()}
    if(input) {

        if(code == 13) {
            const _archive = archive;
            
            let inputTest = input.toString();
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
                        if(number == inputTest) {
                            searchResult = [];
                            searchResult.push(_archive[i]);
                        }
                    }  else {
                        console.log('did not find anythingeee')
                    }
                }

                if(searchBy == 'date') {
                    if (date.includes(inputTest)) { 
                        searchResult.push(_archive[i]);
                        if(date == inputTest) {
                            searchResult = [];
                            searchResult.push(_archive[i]);
                        }
                    } else {  console.log('did not find anythingffff') }
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



function htmlentities(string) {
    return string.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
} 

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getStatsFromYear() {
    const bookings = archive;
    const stats = new Array(12).fill(0);
    const selectedDate = (!model.inputStatsDate ? new Date() : model.inputStatsDate);

    if (model.stats) {
        bookings.forEach(item => {
            const time = item.bookedInfo.bookedTime;
            if (findYear(time) === findYear(selectedDate)) {
                let count = 0;
                while(count < 12) {
                    if (findMonth(time) === count) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                    count++
                }
            }
        });
        model.stats = stats;
    }
}

function getBarHeightFromYearStats(a) {
    const stats = model.stats;
    let timesIndex;

    let highestValue = Math.max.apply(Math, stats);
    if (highestValue < 10) { timesIndex = 100 / highestValue }
    if (highestValue > 10) { timesIndex = highestValue / 100 }

    let calculatedArray = new Array(stats.length).fill(0);
    for (let i = 0; i < stats.length; i++) {
        if (highestValue < 10) { calculatedArray[i] = Math.floor(stats[i] * timesIndex); }
        else { calculatedArray[i] = Math.floor(stats[i] / timesIndex); }
    }

    return calculatedArray[a];  
}


function getBarHeightFromMonthStats(a) {
    const stats = model.statsMonth;
    let timesIndex;

    let highestValue = Math.max.apply(Math, stats);
    if (highestValue < 10) { timesIndex = 100 / highestValue }
    if (highestValue > 10) { timesIndex = highestValue / 100 }

    let calculatedArray = new Array(stats.length);
    for (let i = 0; i < stats.length; i++) {
        if (highestValue < 10) {
            calculatedArray[i] = Math.floor(stats[i] * timesIndex);
        } else { calculatedArray[i] = Math.floor(stats[i] / timesIndex); }
    }

    return calculatedArray[a];
}


function monthName(month) {
    if (month == 0) return 'Januar';
    if (month == 1) return 'Februar';
    if (month == 2) return 'Mars';
    if (month == 3) return 'April';
    if (month == 4) return 'Mai';
    if (month == 5) return 'Juni';
    if (month == 6) return 'Juli';
    if (month == 7) return 'August';
    if (month == 8) return 'September';
    if (month == 9) return 'Oktober';
    if (month == 10) return 'November';
    if (month == 11) return 'Desember';
}

function findMonth(datestring) {
    const date = new Date(datestring);
    return date.getMonth();
}
function findYear(datestring) {
    const date = new Date(datestring);
    return date.getFullYear();
}
function findDay(datestring) {
    const date = new Date(datestring);
    return date.getDate();
}