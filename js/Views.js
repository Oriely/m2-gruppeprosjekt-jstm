let tableOverview = '';
let childBool = false;
let rangeCount;
let checkedChildChair = false;

function viewCreateBooking() {

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
        <div class="page">
           
            <div class="input-outer">
                <div class="inputs">

                                    <div class="">
                                        <label>Navn:</label>
                                        <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}">
                                    </div>

                                    <div class="input-number">

                                        <div><label>Nummer:</label></div>
                                        <div><input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}"></div>
                                    </div>

                                    <div class="datelabel">
                                        <label>Booket fra </label><label>til</label>
                                    </div>
                                    
                                    <div>
                                        <input type="datetime-local" oninput="model.inputs.inputTime = this.value" onchange="checkTableStatus()" value="${model.inputs.inputTime}">
                                        <input type="datetime-local" oninput="model.inputs.inputTimeEnd = this.value" value="${model.inputs.inputTimeEnd}">
                                    </div>

                                    <div>
                                        <button onclick="setTimeToCurrentTime()">Nåværende Tid</button>
                                    </div>

                                    <div>
                                        <label>Antall gjester</label>
                                        <input type="number" min="1" max="${rangeCount || '4'}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}">
                                        <div class="maxTableGuests">
                                            Max antall seter: ${rangeCount || '<i>Velg bord</i>'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label>Barnestol</label
                                        <input type="checkbox" ${childBool ? 'checked' : ''} onclick="checkChildChair()" >
                                    </div>
                                    
                                    <div class="createBooking">
                                        <button onclick="createBooking()">Book</button>
                                    </div>
            </div>
            </div>


        </div>

        
`


    var tableHtml = '';
    var color = '';
    tableHtml += '<div class="tables">';
    for (let i = 0; i < model.tables.allTables.length; i++) {
        if (i === 0) {
            tableHtml += `
                        
                        <div class="tables-outer">
                        <div class="testing">
                        <p>Fire seter</p>
                        <div class="seats-wrapper">
                            <div class="col1">`
        }

        if (i === 5) tableHtml += `
                            </div>        
                            <div class="col2">                      
                        `;
        if (i === 10) tableHtml += `
                            </div>
                        </div>
                        </div>
                        
                        <div class="testing">
                        <p>Seks seter</p>
                        <div class="seats-wrapper">
                            <div class="col1">
                            `   ;
        if (i === 15) tableHtml += `
                            </div>
                            <div class="col2">
                             `
        if (i === 20) tableHtml += `
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                
                            `;



        if (model.status[model.tables.allTables[i]] == undefined) {
            tableHtml += `
                    <div class="box-outer ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                        <div class="box ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}" onclick="selectTable('${model.tables.allTables[i]}')">
                            ${model.tables.allTables[i]}
                        </div>
                    </div>`;
        } else {
            if (model.status[model.tables.allTables[i]].bookingStatus == 1) {
                console.log('soon')
                color = 'bookedSoon'
                tableHtml += `
                    <div class="box-outer ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                        <div class="box ${color}  " onclick="selectTable('${model.tables.allTables[i]}')">
                            ${model.tables.allTables[i]}
                        </div>
                    </div>`;
            }
            if (model.status[model.tables.allTables[i]].bookingStatus == 2) {
                console.log('soon')
                color = 'booked'
                tableHtml += `
                    <div class="box-outer ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                        <div class="box ${color} ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}" onclick="selectTable('${model.tables.allTables[i]}')">
                            ${model.tables.allTables[i]}
                        </div>
                    </div>`;
            }
            if (model.status[model.tables.allTables[i]].bookingStatus == 0) {
                
                tableHtml += `
                <div class="box-outer {model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}">
                    <div class="box ${model.app.selectedTable == model.tables.allTables[i] ? 'selectedTable' : ''}"  onclick="selectTable('${model.tables.allTables[i]}')">
                        ${model.tables.allTables[i]}
                    `;
            }
        }
    }

    html += tableHtml;

    ;
    document.getElementById('app').innerHTML = html;
}

function checkChildChair() {
    childBool = childBool ? false : true;
    model.inputs.inputChildChair = childBool;
} 

let dateSelect = new Date();
dateSelect = dateSelect.toISOString().substr(0,16)

function viewCheckBookingsDate() {
    let date = new Date();
    date = date.toISOString()
    var date1 = date.substring(0, 10);
    date1 = new Date(date1).toLocaleDateString()
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`;

    let html = '';
    html = `
    <div class="page">
        <div class="date">I dag: ${date}</div>
            <div class="chosenTable">
                <div>Navn: <input oninput="model.inputsEdit.editName = this.value" value="${model.inputsEdit.editName}"></input></div>
                <div>Nummer: <input oninput="model.inputsEdit.editNumber = this.value" value="${model.inputsEdit.editNumber}"></input></div>
                <div>Dato fra: <input type="datetime-local" oninput="model.inputsEdit.editTime = this.value" value="${model.inputsEdit.editTime}"></div>
                <div>Dato til: <input type="datetime-local" oninput="model.inputsEdit.editTimeEnd = this.value" value="${model.inputsEdit.editTimeEnd}"></div>
                <div>Antall Gjester: ${model.inputsEdit.editNumberOfGuests}</div>
                <div class="saveBooking"><button onclick="editBookingsSave()">Lagre endringer</button></div>  

                <div class="tableInfo">
                    <div>Valgt Bord: ${model.inputsEdit.editTable}</div>
                    <div>Dette border har ${model.inputsEdit.editChair} plasser</div>       
                </div>

                <div>Barnestol: <input type="checkbox" ${model.inputsEdit.editChildChair ? 'checked' : ''} onclick="checkChildChair()" ></div>
            </div>
            
            <div>Dato: <input type="datetime-local" id="editBookingsTimeTable" onchange="dateSelect = this.value, updateView()" value="${dateSelect}"></div>
            <div id="bookingsOverview"></div>
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
    document.getElementById("editBookingsTimeTable").value = dateSelect;
    drawBookings();
}

function drawBookings(){
    let html = '';
    html += `
        <div class="booked-tables">
        <div class="table-labels">
            <div>Bor</div>
            <div>Booket fra</div>
            <div>Booket til</div>
            <div>Navn</div>
        </div>
    `;
    for (let i = 0; i < model.bookingTimes.length; i++) { 
        html += `
        <div class="table-row" onclick="editBookingsSelect(${i}), updateView()">
            <div>${model.bookingTimes[i].table}</div>
            <div>${model.bookingTimes[i].bookedInfo.bookedTime}</div>
            <div>${model.bookingTimes[i].bookedInfo.bookedTimeEnd}</div>
            <div>${model.bookingTimes[i].bookedInfo.bookedName}</div>
        </div>
           `;
    }
    html += '</div>'
    document.getElementById('bookingsOverview').innerHTML = html;
}         

function editBookingsSelect(i){
    model.inputsEdit= (
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

function editBookingsReset(){
    model.inputsEdit= (
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
    dateSelect = dateSelect.toISOString().substr(0,16)
}

function editBookingsSave(){
    model.bookingTimes[model.inputsEdit.editIndex]= (
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

function bookingList() {
    let html = '';

    html += `
    `;

    document.getElementById('app').innerHTML = html;
}