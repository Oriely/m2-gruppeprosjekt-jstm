

let tableOverview = '';
let childBool = false;
let rangeCount;
let checkedChildChair = false;

console.log(checkedChildChair)


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
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`

    let html = '';
    html = `

    <div class="page">

    <div class="date">I dag: ${date}</div>

    <div class="inputs">
        <div class="inputs-col1">

            <div class="createName"><div>Navn:</div> <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}"></input></div>
            <div class="createNumber"><div>Nummer:</div> <input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}"></div>
            Starttid:
            <div class="createDateAndTime"><input type="datetime-local" oninput="model.inputs.inputTime = this.value" value="${model.inputs.inputTime}"></div>
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
    <div class="tableOverview">

        <div class="fourSeats">
            <div class="col1">
                <div class="box" onclick="selectTable('a')">A</div>
                <div class="box" onclick="selectTable('b')">B</div>
                <div class="box" onclick="selectTable('c')">C</div>
                <div class="box" onclick="selectTable('d')">D</div>
                <div class="box" onclick="selectTable('e')">E</div>
                
            </div>

            <div class="col2">
                <div class="box" onclick="selectTable('f')">F</div>
                <div class="box" onclick="selectTable('g')">G</div>
                <div class="box" onclick="selectTable('h')">H</div>
                <div class="box" onclick="selectTable('i')">I</div>
                <div class="box" onclick="selectTable('j')">J</div>
            </div>
        </div>
        <div class="sixSeats">
            <div class="col1">
                <div class="box" onclick="selectTable('k')">K</div>
                <div class="box" onclick="selectTable('l')">L</div>
                <div class="box" onclick="selectTable('m')">M</div>
                <div class="box" onclick="selectTable('n')">N</div>
                <div class="box" onclick="selectTable('o')">O</div>
            </div>
            <div class="col2">
                <div class="box" onclick="selectTable('p')">P</div>
                <div class="box" onclick="selectTable('q')">Q</div>
                <div class="box" onclick="selectTable('r')">R</div>
                <div class="box" onclick="selectTable('s')">S</div>
                <div class="box" onclick="selectTable('t')">T</div>
            </div>
        </div>
    </div>
</div>
    `;
    document.getElementById('app').innerHTML = html;
}

function checkChildChair() {
    childBool = childBool ? false : true;
    model.inputs.inputChildChair = childBool;
} 
