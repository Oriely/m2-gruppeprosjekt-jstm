

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
        <div class="inputs-col1">

            <div class="createName"><div>Navn:</div> <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}"></input></div>
            <div class="createNumber"><div>Nummer:</div> <input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}"></div>
            Starttid:
            <div class="createDateAndTime"><input type="datetime-local" oninput="model.inputs.inputTime = this.value" onchange="checkTableStatus()" value="${model.inputs.inputTime}"></div>
            Slutttid:
            <div class="createDateAndTime"><input type="datetime-local" oninput="model.inputs.inputTimeEnd = this.value" value="${model.inputs.inputTimeEnd}"></div>
            <div class="createGuests"><input type="range" min="1" max="${rangeCount || '4'}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}"><br>Antall gjester</div>
            <div class="createTableInfo"></div>
            <div class="createChildChair">Barnestol<input type="checkbox" ${childBool ? 'checked' : ''} onclick="checkChildChair()" ></div>
            
            <div class="createBooking"><button onclick="createBooking()">Book</button></div>    
        </div>
        
        <div class="inputs-col2">
            
        <div class="tableInformation">
        <div class="currentTable" id="check">Valgt Bord: <strong>${model.app.selectedTable}</strong></div>
        <div class="maxTableGuests">Bordet har plass til: ${rangeCount || '<i>Velg bord</i>'}${rangeCount ? ' personer' : ''}</div>
    </div>

        </div>
    </div>


    <div class="tableDescription">
    <div class="fourSeats">Bord med 4 plasser:</div>
    <div class="sixSeats">Bord med 6 plasser:</div>
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
