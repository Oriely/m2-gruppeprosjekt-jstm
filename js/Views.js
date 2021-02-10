let tableOverview = '';
let childBool = false;
let rangeCount;
let multipleTableBool = false;
let checkedChildChair = false;

function viewCreateBooking() {
    let error = '';
    let rangeCount;
    if (model.tables.fits4.includes(model.app.selectedTable)) {
        rangeCount = 4;
    } else if (model.tables.fits6.includes(model.app.selectedTable)) {
        rangeCount = 6;
    }

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
                        <button></button>
                        <input type="datetime-local" oninput="model.inputs.inputTime = this.value" onchange="checkTableStatus()" value="${model.inputs.inputTime}">
                        <button onclick="setTimeToCurrentTime()">Nåværende Tid</button>
                        </div>
                        <div>
                        <label>til</label>
                        <input type="datetime-local" oninput="model.inputs.inputTimeEnd = this.value" value="${model.inputs.inputTimeEnd}">
                        </div>
                        
                    </div>
                    
                    <div>
                       
                    </div>
                    <div class="input-guest">
                        <div class="input-guest-label">
                            <label>Antall gjester ${(rangeCount ? rangeCount + ' Max' : '<i>Velg bord</i>')}</label><label></label>
                        </div>
                        <div>
                            <input type="number" min="1" max="${rangeCount || '4'}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}">
                            
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
                    <div>
                        <label>Velge flere bord</label>
                        <input type="checkbox" ${multipleTableBool ? 'checked' : ''} onclick="checkMultipleTables()">
                    </div>
                    <div class="errors">
                    </div>
                    <div class="add-booking">
                        <button class="" onclick="createBooking()">Reserver</button>
                    </div>
            </div>


        </div>

        
`


    var tableHtml = '';
    var color = '';
    tableHtml += `<div class="tables ${(animationSatus == false ? 'animation2' : '')}">`;
    for (let i = 0; i < model.tables.allTables.length; i++) {
        if (i === 0) {
            tableHtml += `
                <div class="tables-outer ${(animationSatus == false ? 'animation3' : '')}">
                <div class="testing">
                <p>Fire seter</p>
                <div class="seats-wrapper">
                    <div class="col1">
                `;
        }

        if (i === 5) {
            tableHtml += `
                </div>        
                <div class="col2">                      
            `;
        }
        if (i === 10) {
            tableHtml += `
                </div>
                </div>
                </div>
                
                <div class="testing">
                <p>Seks seter</p>
                <div class="seats-wrapper">
                <div class="col1">
            `;
        }
        if (i === 15) {
            tableHtml += `
                </div>
                <div class="col2">
            `;
        }
        if (i === 20) {
            tableHtml += `
                </div></div></div></div></div>
            `;
        }
        if (model.status[model.tables.allTables[i]] == undefined) {
            tableHtml += `
            <div class="box-outer ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                <div class="box" onclick="selectTable('${model.tables.allTables[i]}')">
                    ${model.tables.allTables[i]}
                </div>
            </div>`;
        } else {
            tableHtml += `
            <div class="box-outer ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                <div class="box ${bookingStatusCheck(i)}" onclick="selectTable('${model.tables.allTables[i]}')">
                    ${model.tables.allTables[i]}
                </div>
            </div>
            `;
        }
    }

    html += tableHtml;
    document.getElementById('app').innerHTML = html;
    stopAnimations();
}

function bookingStatusCheck(i) {
    if (model.status[model.tables.allTables[i]].bookingStatus == 0) return;
    if (model.status[model.tables.allTables[i]].bookingStatus == 1) return 'bookedSoon';
    if (model.status[model.tables.allTables[i]].bookingStatus == 2) return 'booked';
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
                        <label>Antall Gjester: ${model.inputsEdit.editNumberOfGuests}</label>
                    </div>

                </div>

                <div class="saveBooking">
                    <button onclick="editBookingsSave()">
                    Lagre endringer</button>
                </div>  

                <div class="tableInfo">
                    <div>Valgt Bord: ${model.inputsEdit.editTable}</div>
                    <div>Dette border har ${model.inputsEdit.editChair} plasser</div>       
                </div>

                <div>
                    Barnestol:
                    <input type="checkbox" ${model.inputsEdit.editChildChair ? 'checked' : ''} onclick="checkChildChair()" >            
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
        html += `
                        <div class="table-row  " >
                            <div onclick="editBookingsSelect(${i}), updateView()">${model.bookingTimes[i].table}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${model.bookingTimes[i].bookedInfo.bookedName}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()"><a href="tel:${model.bookingTimes[i].bookedInfo.bookedNumber}">${model.bookingTimes[i].bookedInfo.bookedNumber}</a></div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${model.bookingTimes[i].bookedInfo.bookedTime}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${model.bookingTimes[i].bookedInfo.bookedTimeEnd}</div>
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
    model.inputsEdit = (
        {
            editIndex: i,
            editName: model.bookingTimes[i].bookedInfo.bookedName,
            editNumber: model.bookingTimes[i].bookedInfo.bookedNumber,
            editTime: model.bookingTimes[i].bookedInfo.bookedTime,
            editTimeEnd: model.bookingTimes[i].bookedInfo.bookedTimeEnd,
            editNumberOfGuests: model.bookingTimes[i].bookedInfo.bookedGuestCount,
            editChildChair: model.bookingTimes[i].bookedInfo.bookedChild,
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
    model.bookingTimes[model.inputsEdit.editIndex] = (
        {
            table: model.inputsEdit.editTable,
            chairCount: model.inputsEdit.editChair,
            bookedInfo: {
                bookedName: model.inputsEdit.editName,
                bookedNumber: model.inputsEdit.editNumber,
                bookedTime: model.inputsEdit.editTime,
                bookedTimeEnd: model.inputsEdit.editTimeEnd,
                bookedGuestCount: model.inputsEdit.editNumberOfGuests,
                bookedChild: model.inputsEdit.editChildChair,
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

    document.getElementById('app').innerHTML = html;
    stopAnimations();

}

function editTablesView() {
    let tableHtml = '';
    for (let i = 0; i < model.tables.allTables.length; i++) {
        tableHtml += `
        <div class="box-outer1 ${model.selectedTable.selectedTableForEdit == model.tables.allTables[i] ? 'selectedTable' : ''}">
                <div class="box" onclick="selectTableForEdit('${model.tables.allTables[i]}')">
                    ${model.tables.allTables[i]}
                </div>
            </div>
        
        `;
    }
    html = `
    <hr>
    <div>${model.selectedTable.selectedTableForEdit ? `Bord ${model.selectedTable.selectedTableForEdit.toUpperCase()}` : ''}</div>
    <div>${model.selectedTable.selectedTableFits ? `Bordet har plass til ${model.selectedTable.selectedTableFits}` : ''}</div>
    
    <div>${model.selectedTable.selectedTableForEdit ? `
    <div></div>
    <input type="range" min="1" max="10" oninput="model.selectedTable.selectedTableGuests = this.value; document.getElementById('slider').innerHTML = this.value" value="model.selctedTable.selectedTableFits"></input>
    <div>Endre bordet til:
        <div id="slider">${model.selectedTable.selectedTableFits}</div>
        Personer
    </div>`
     : ''}</div>
    <button onclick="deleteTable(model.app.selectedTableForEdit)">Slette Bord</button>
    <button onclick="changeTableInformation(model.app.selectedTableForEdit)">Endre Bord</button>
    `;
    

    document.getElementById('app').innerHTML = tableHtml;
    document.getElementById('app').innerHTML += html;
}



function statisticsVeiw() {
    let html = '';

    html += `
    <div class="page-statistics">

    `;

    // for() {

    // }

    html += `</div>`;
    document.getElementById('app').innerHTML = html;
}

statsFixData();

function statsFixData() {
    for (const test in model.bookingTimes) {

        console.log(model.bookingTimes[test].bookedInfo.bookedTime);

    }
}