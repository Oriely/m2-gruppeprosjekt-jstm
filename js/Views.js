let tableOverview = '';
let childBool = false;
let rangeCount;
let multipleTableBool = false;
let checkedChildChair = false;
  
function viewCreateBooking() {

    let error = '';
    let rangeCount;
    for (let tableCategory in model.tables) {
        if (model.tables[tableCategory].includes(model.app.selectedTable[0])) {
            if (tableCategory != 'allTables') {
                var fitsX = tableCategory;
                rangeCount = (fitsX.substring(5, 4));
                console.log(rangeCount)
            }
        }
    }
    // if (model.tables.fits4.includes(model.app.selectedTable)) {
    //     rangeCount = 4;
    // } else if (model.tables.fits6.includes(model.app.selectedTable)) {
    //     rangeCount = 6;
    // }

    let date = new Date();
    date = date.toISOString()
    var date1 = date.substring(0, 10);
    date1 = new Date(date1).toLocaleDateString()
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`;


    let html = '';
    html = `
    <div class="page-outer">
        <div class="${(animationSatus == false ? 'animation2' : '')}">
                <div class="inputs ">
                    <div class="input-name">
                        <div>
                            <label>Navn:</label>
                            <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}">
                        </div>
                        
                    </div>
                    <div class="input-number">
                        <div>
                            <label>Mobil Nummer:</label>
                            <input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}">
                        </div>
                       
                    </div>
                    <div class="input-date">
                        <div>
                        <label>Reservert fra </label>
                        <input type="time" onchange="model.inputTime.fromInputTime = this.value" value="${model.inputTime.fromInputTime}"></input>
                        <input type="date" oninput="model.inputTime.fromInputDate = this.value" value="${model.inputTime.fromInputDate}"></input>
                        <button onclick="setTimeToCurrentTime()">Nåværende Tid</button>
                        </div>
                        <div>
                        <label>til</label>
                        <input type="time" onchange="model.inputTime.toInputTime = this.value" value="${model.inputTime.toInputTime}"></input>
                        <input type="date" oninput="model.inputTime.toInputDate = this.value" value="${model.inputTime.toInputDate}"></input>
                        </div>
                        
                    </div>
                    
                    <div>
                       
                    </div>
                    <div class="input-guest">
                        <div class="input-guest-label">
                            <label>Antall gjester ${(addUpTotGuests() ? addUpTotGuests() + ' Max' : '<i>Velg bord</i>')}</label><label></label>
                        </div>
                        <div>
                            <input type="number" min="1" max="${addUpTotGuests()}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}">
                            
                        </div>
                    </div>
                    <div>
                        <label>TillegsBeskjed</label>
                        <input type="form" oninput="model.inputs.inputMessage = this.value"></input>
                    </div>
                    <div>
                        <label>Barnestol</label>
                        <input type="checkbox" ${childBool ? 'checked' : ''} onclick="checkChildChair()" >
                    </div>
                    
                    <div class="errors">
                    </div>
                    <div class="add-booking">
                        <button class="" onclick="createBooking()">Reserver</button>
                    </div>
            </div>


        </div>

        
`
    html += `<div class="tables ${(animationSatus == false ? 'animation2' : '')}">`;

    for (let tableList in model.tables) {
        const tableFitsX = tableList.match(/(\d+)/);

        html+= `<div class="table-category-wrapper">`;
        html+= `<div class="table-category-label">Plass til ${tableFitsX[0]}</div>`;
        html+= `<div class="col">`;

        for (let i = 0; i < model.tables[tableList].length; i++) {
            
            const table = model.tables[tableList][i];

            html += `
            <div class="box-outer ${model.app.selectedTable.includes(table) ? 'selectedTable' : ''}">
                <div class="box" onclick="selectTable('${table}')">
                    ${table}
                </div>
            </div>
            `;
           
        }
        html += `</div>`;
        html += `</div>`;
    }

    document.getElementById('app').innerHTML = html;
    stopAnimations();
}


function bookingStatusCheck(i) {
    var allTables = model.tables.allTables;
    if (model.status[allTables[i]].bookingStatus == 0) return;
    if (model.status[allTables[i]].bookingStatus == 1) return 'bookedSoon';
    if (model.status[allTables[i]].bookingStatus == 2) return 'booked';
}

function addUpTotGuests() {
    var guestCount = 0;
    for (let tableList in model.tables) {
        console.log(tableList)
        for (let i = 0; i < model.app.selectedTable.length; i++) {
            if (model.tables[tableList].includes(model.app.selectedTable[i])) {
                console.log(tableList.substring(4, 5))
                guestCount += parseInt(tableList.substring(4, 5))
            }
        }
        
    }
    return guestCount;
}

function checkChildChair() {
    childBool = childBool ? false : true;
    model.inputs.inputChildChair = childBool;
}

function checkMultipleTables() {
    multipleTableBool = multipleTableBool ? false : true;

    model.app.selectMultipleTables = multipleTableBool;

}

let dateSelect = new Date();
dateSelect = dateSelect.toISOString().substr(0, 16)

function viewCheckBookingsDate() {
    let date = new Date();
    date = date.toISOString()
    var date1 = date.substring(0, 10);
    date1 = new Date(date1).toLocaleDateString()
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`;


    var inputEdit = model.inputsEdit;

    let html = '';
    html = `
    <div class="page  ${(animationSatus == false ? 'animation2' : '')}">
            <div class="chosenTable  ">
                <div class="inputs">

                <div>
                    <div>
                        <label>Nummer:</label>
                    </div>
                    <div>
                        <input oninput="model.inputsEdit.editName = this.value" value="${model.inputsEdit.editName}">
                    </div>
                </div>

                <div>
                    <div>
                        <lable>Nummer:</label>
                    </div>
                    
                    <div>
                        <input oninput="model.inputsEdit.editNumber = this.value" value="${model.inputsEdit.editNumber}">
                    </div>
                </div>

                <div>

                    <div>
                        <label>Dato fra:</label>
                    </div>
                    <div>
                    <input type="datetime-local" oninput="model.inputsEdit.editTime = this.value" value="${model.inputsEdit.editTime}">
                    </div>
                </div>

                <div>
                    <div>
                        <label>Dato til:</label>
                    </div>
                    <div>
                        <input type="datetime-local" oninput="model.inputsEdit.editTimeEnd = this.value" value="${model.inputsEdit.editTimeEnd}">
                    </div>
                </div>

                <div>
                    <div>
                        <label>Antall Gjester: ${inputEdit.editNumberOfGuests}</label>
                    </div>

                </div>

                <div class="saveBooking">
                    <button onclick="editBookingsSave()">
                    Lagre endringer</button>
                </div>  

                <div class="tableInfo">
                    <div>Valgt Bord: ${inputEdit.editTable}</div>
                    <div>Dette border har ${inputEdit.editChair} plasser</div>       
                </div>

                <div>
                    Barnestol:
                    <input type="checkbox" ${inputEdit.editChildChair ? 'checked' : ''} onclick="checkChildChair()" >            
                    </div>
            </div>
            
                    <div id="bookingsOverview">
                    `;
    html += `
                    <div class="booked-tables-outer ${(animationSatus == false ? 'animation' : '')}">
                    <div class="table-labels">
                    <div>Bord</div>
                    <div>Navn</div>
                    <div>Mobil Nummer</div>
                    <div>Booket fra</div>
                    <div>Booket til</div>
                    
                
                </div>
                        <div class="booked-tables ">
                
                    `;
    for (let i = 0; i < model.bookingTimes.length; i++) {
        var bookingTimes = model.bookingTimes;
        html += `
                        <div class="table-row  " >
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].table}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedName}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()"><a href="tel:${bookingTimes[i].bookedInfo.bookedNumber}">${model.bookingTimes[i].bookedInfo.bookedNumber}</a></div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedTime}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedTimeEnd}</div>
                            <div><button onclick="editBookingsSelect(${i}), updateView()">Velg</button><button onclick="endBooking(${i})">Slett booking</button></div>
                            
                            
                        </div>
                        `;
    }
    html += `</div></div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
    stopAnimations();
}

function editBookingsSelect(i) {
    var bookingTimesInfo = model.bookingTimes[i].bookedInfo;
    model.inputsEdit = (
        {
            editIndex: i,
            editName: bookingTimesInfo.bookedName,
            editNumber: bookingTimesInfo.bookedNumber,
            editTime: bookingTimesInfo.bookedTime,
            editTimeEnd: bookingTimesInfo.bookedTimeEnd,
            editNumberOfGuests: bookingTimesInfo.bookedGuestCount,
            editChildChair: bookingTimesInfo.bookedChild,
            editTable: model.bookingTimes[i].table,
            editChair: model.bookingTimes[i].chairCount,
        }
    );
}

function editBookingsReset() {
    model.inputsEdit = (
        {
            editIndex: '',
            editName: '',
            editNumber: '',
            editTime: '',
            editTimeEnd: '',
            editNumberOfGuests: '',
            editChildChair: '',
            editTable: '',
            editChair: '',
        }
    );
    dateSelect = new Date();
    dateSelect = dateSelect.toISOString().substr(0, 16)
}

function editBookingsSave() {
    var inputsEdit = model.inputsEdit;
    model.bookingTimes[inputsEdit.editIndex] = (
        {
            table: inputsEdit.editTable,
            chairCount: inputsEdit.editChair,
            bookedInfo: {
                bookedName: inputsEdit.editName,
                bookedNumber: inputsEdit.editNumber,
                bookedTime: inputsEdit.editTime,
                bookedTimeEnd: inputsEdit.editTimeEnd,
                bookedGuestCount: inputsEdit.editNumberOfGuests,
                bookedChild: inputsEdit.editChildChair,
            }
        }
    );
    editBookingsReset();
    updateView();
}

function archiveBookingList() {
    let html = '';


    html += `
    <div class="page-archive  ${(animationSatus == false ? 'animation2' : '')}">
    <div class="booked-tables">
    <div class="table-labels">
        <div>Bord</div>
        <div>Navn</div>
        <div>Mobil Nummer</div>
        <div>Booket fra</div>
        <div>Booket til</div>
        
       
    </div>
    `;
    if (archive.length != 0) {
        let count = 0;
        archive.forEach(item => {
            html += `
            <div class="table-row">
                <div>${item.table}</div>
                <div>${item.bookedInfo.bookedName}</div>
                <div>${item.bookedInfo.bookedNumber}</div>
                <div>${item.bookedInfo.bookedTime}</div>
                <div>${item.bookedInfo.bookedTimeEnd}</div>
                <div><button onclick="removeFromArchive(${count})">Fjern fra arkiv</button></div>
                
                
            </div>
            `;
            count++;
        });
    } else {
        html += 'Arkivet er tomt.'
    }

    html += `
    </div>
    `;

    statsFixData();
    testing();

    const svgWidth = 600;
    const statHeight = 600;
    const barWidth = (svgWidth / model.stats.length);

    const barColors = ['#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e']
    html += `
    <div>
    <input type="date" oninput="changeDateValue(this.value)" value="${model.inputStatsDate}">
    
    <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">
    `;
    for (const hm in model.stats) {

        html += `<div class="stat-bar" style="${model.stats[hm] == 0 ? 'height:4%; background: rgb(210, 210, 210) !important; color:black;' : `height:${testing(hm) + '%'}`}; width:${barWidth}px; background-color:${barColors[hm]} ;">
                    <div style="">${model.stats[hm]}</div>
                </div>
                
                `;
    }
    html += `</div>`;
    html += `<div class="labels">`;
    for (const hm in model.stats) {
        html += `
        <div class="stat-label" style="width:${barWidth}px">${monthName(hm)}</div>
        `;
    }
    html += `</div></div>`;

    document.getElementById('app').innerHTML = html;
    stopAnimations();

}

function editTablesView() {
    var selectedTable = model.selectedTable;
    let tableHtml = '';
    for (let tableList in model.tables) {
        for (let i = 0; i < model.tables[tableList].length; i++) {
            tableHtml += `
            <div class="box-outer1 ${selectedTable.selectedTableForEdit == model.tables[tableList][i] ? 'selectedTable' : ''}">
                    <div class="box" onclick="selectTableForEdit('${model.tables[tableList][i]}')">
                        ${model.tables[tableList][i]}
                    </div>
                </div>
            
            `;
        }
    }
    
    html = `
    <hr>
    <div>${selectedTable.selectedTableForEdit ? `Bord ${selectedTable.selectedTableForEdit.toUpperCase()}` : ''}</div>
    <div>${selectedTable.selectedTableFits ? `Bordet har plass til ${selectedTable.selectedTableFits}` : ''}</div>
    
    <div>${selectedTable.selectedTableForEdit ? `
    <div></div>
    <input type="range" min="1" max="10" oninput="model.selectedTable.selectedTableGuests = this.value; document.getElementById('slider').innerHTML = this.value" value="model.selctedTable.selectedTableFits"></input>
    <div>Endre bordet til:
        <div id="slider">${selectedTable.selectedTableFits}</div>
        Personer
    </div>`
            : ''}</div>
    <button onclick="deleteTable(model.app.selectedTableForEdit)">Slette Bord</button>
    <button onclick="changeTableInformation(model.app.selectedTableForEdit)">Endre Bord</button>

    `;


    document.getElementById('app').innerHTML = tableHtml;
    document.getElementById('app').innerHTML += html;
}

function changeDateValue(e, value) {
    model.inputStatsDate = value;
    if (e.keyCode == 13) {
        updateScreen();
        console.log("Enter key is pressed");
    }



}

function statisticsView() {
    statsFixData();
    testing();

    let html = '';

    const svgWidth = 600;
    const statHeight = 600;
    const barWidth = (svgWidth / model.stats.length);

    const barColors = ['#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e', '#1d043c', '#2e075e']
    html += `
    <input type="number" oninput="changeDateValue(event, this.value)" value="${(model.inputStatsDate === '' ? new Date().getFullYear() : model.inputStatsDate)}">
    
    <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">
    `;
    for (const hm in model.stats) {

        html += `<div class="stat-bar" style="${model.stats[hm] == 0 ? 'height:4%; background: rgb(210, 210, 210) !important; color:black;' : `height:${testing(hm) + '%'}`}; width:${barWidth}px; background-color:${barColors[hm]} ;">
                    <div style="">${model.stats[hm]}</div>
                </div>
                
                `;
    }
    html += `</div>`;
    html += `<div class="labels">`;
    for (const hm in model.stats) {
        html += `
        <div class="stat-label" style="width:${barWidth}px">${monthName(hm)}</div>
        `;
    }
    html += `</div>`;
    document.getElementById('app').innerHTML = html;
}



function statsFixData() {

    const bookings = archive;
    const stats = new Array(12).fill(0);
    const selectedDate = (!model.inputStatsDate ? new Date() : model.inputStatsDate);
    if (model.stats) {
        bookings.forEach(item => {
            const time = item.bookedInfo.bookedTime
            if (findYear(time) === findYear(selectedDate)) {
                if (findMonth(time) === 0) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 1) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 3) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 4) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 5) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 6) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 7) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 8) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 9) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 10) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
                if (findMonth(time) === 11) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }
            }

        });
    }

    model.stats = stats;
}

function testing(a) {
    const stats = model.stats;
    var timesIndex;

    for (const test in model.bookingTimes) {


        var highestValue = Math.max.apply(Math, stats);
        if (highestValue < 10) { timesIndex = 100 / highestValue };
        if (highestValue > 10) { timesIndex = highestValue / 100 }

        var calculatedArray = new Array(12).fill(0);
        for (let i = 0; i < stats.length; i++) {
            if (highestValue < 10) {

                calculatedArray[i] = Math.floor(stats[i] * timesIndex);

            }
            else {
                calculatedArray[i] = Math.floor(stats[i] / timesIndex);

            }


        }
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
    return date.getDay();
}

