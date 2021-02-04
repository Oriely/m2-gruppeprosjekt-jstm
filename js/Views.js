

let tableOverview = '';
let childBool = false;
let rangeCount;
let checkedChildChair = false;

function viewCreateBooking() {

    if (model.tables.fits4.includes(model.app.selectedTable)) {
        rangeCount = 4;
    } else if (model.tables.fits6.includes(model.app.selectedTable)) {
        rangeCount = 6;
    } else {
        rangeCount;
    }

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

        <div class="inputs">
                <div class="createName">
                    <label>Navn:</label>
                    <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}">
                </div>
                <div class="createNumber">
                    <label>Nummer:</label>
                    <input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}">
                </div>
                <div class="datelabel">
                <label>Booket fra </label><label>til</label>
                </div>
                
                <div class="createDateAndTime">
                    
                    <input type="datetime-local" oninput="model.inputs.inputTime = this.value" onchange="checkTableStatus()" value="${model.inputs.inputTime}">
                    
                    <input type="datetime-local" oninput="model.inputs.inputTimeEnd = this.value" value="${model.inputs.inputTimeEnd}">
                </div>
                <div><button onclick="setTimeToCurrentTime()">Nåværende Tid</button></div>
                <div class="createGuests">
                    <input type="range" min="1" max="${rangeCount || '4'}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}">
                    Antall gjester
                </div>
                
                <div class="createTableInfo">
                </div>
                
                <div class="createChildChair">
                    <label>Barnestol</label
                    <input type="checkbox" ${childBool ? 'checked' : ''} onclick="checkChildChair()" >

                </div>
                
                <div class="createBooking">
                    <button onclick="createBooking()">Book</button>
                </div>    
            </div>
            <div class="tableInformation">
                <div class="currentTable" id="check">Valgt Bord: ${model.app.selectedTable.toUpperCase()}</div>
                <div class="maxTableGuests">Bordet har plass til: ${rangeCount || '<i>Velg bord</i>'}${rangeCount ? ' personer' : ''}</div>
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
                            <div class="fourSeats">
                            <div class="col1">`
        }

        if (i === 5) tableHtml += `  </div>
                                
                            <div class="col2">                      
                        `;
        if (i === 10) tableHtml += `
                            </div>
                            </div>
                            <div class="sixSeats">
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
                            `



        if (model.status[model.tables.allTables[i]] == undefined) {
            tableHtml += `
                    <div class="box" onclick="selectTable('${model.tables.allTables[i]}')">${model.tables.allTables[i]}</div>
        `
        } else {

            if (model.status[model.tables.allTables[i]].bookingStatus == 1) {
                
                color = 'bookedSoon'
                tableHtml += `
                    <div class="box ${color}" onclick="selectTable('${model.tables.allTables[i]}')">${model.tables.allTables[i]}</div>
                        `
            }
            if (model.status[model.tables.allTables[i]].bookingStatus == 2) {
                
                color = 'booked'
                tableHtml += `
                    <div class="box ${color}" onclick="selectTable('${model.tables.allTables[i]}')">${model.tables.allTables[i]}</div>
                        `
            }
            if (model.status[model.tables.allTables[i]].bookingStatus == 0) {
                
                tableHtml += `
            <div class="box" onclick="selectTable('${model.tables.allTables[i]}')">${model.tables.allTables[i]}</div>
                        `
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


table = 2;
test= 'testing';
editName= '';
editNumber= '';
editTime= '';
editTimeEnd= '';
editNumberOfGuests= '';
editChildChair= childBool;

function viewCheckBookingsDate() {
    let date = new Date();
    let html = '';
    html = `
    <div class="page">
    <div class="date">I dag: ${date.toISOString()}</div>
        <div class="chosenTable">
            <div>Navn: <input oninput="editName = this.value" value="${model.bookingTimes[table].bookedInfo.bookedName}"></input></div>
            <div>Nummer: <input oninput="editNumber = this.value" value="${model.bookingTimes[table].bookedInfo.bookedNumber}"></input></div>
            <div>Dato: <input type="datetime-local" oninput="editTime = this.value" value="${model.bookingTimes[table].bookedInfo.bookedTime}"></div>
            <div>Klokkeslett: ${model.bookingTimes[table].bookedInfo.bookedTime}</div>
            <div>Antall Gjester: ${model.bookingTimes[table].bookedInfo.bookedGuestCount}</div>
            <div class="saveBooking"><button onclick="editBooking()">Lagre endringer</button></div>  

            <div class="tableInfo">
                <div>Valgt Bord: ${model.bookingTimes[table].table}</div>
                <div>Dette border har ${model.bookingTimes[table].chairCount} plasser</div>       
            </div>
            <div>Barnestol: <input type="checkbox" ${model.bookingTimes[table].bookedInfo.bookedChild ? 'checked' : ''} onclick="checkChildChair()></div>

        </div>
        
        <div class"bookingsOverview">

        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
}

// function editBooking() {
//     /*model.bookingTimes[table].table.splice(0,1,model.bookingTimes[table].bookedInfo.bookedName,test); jeg vet ikke hvordan jeg skal splice alt dette her :v*/
//     model.bookingTimes[table]= (
//         {
//             table: model.bookingTimes[table].table,
//             chairCount: model.bookingTimes[table].chairCount,
//             bookingInfo: {
//                 bookedName: editName,
//                 bookedNumber: editNumber,
//                 bookedTime: 'Test',
//                 bookedTimeEnd: 'Test',
//                 bookedGuestCount: editNumberOfGuests,
//                 bookedChild: editChildChair,
//             }
//         });
// }

function bookingList() {
    let html = '';

    html += `
    hmmm`;

    document.getElementById('app').innerHTML = html;
}