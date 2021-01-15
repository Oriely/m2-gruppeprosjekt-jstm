


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

    let html = '';
    html = `
    <div class="page">
        <div class="date">I dag: ${date}</div>
        <div class="inputs">
        <div></div>
            <div class="tableInformation">
                <div class="currentTable" id="check">Valgt Bord: <strong>${model.app.selectedTable}</strong></div>
                <div class="maxTableGuests">Bordet har plass til: <strong>${rangeCount || 'Velg bord'}</strong>${rangeCount ? ' personer' : ''}</div>
            </div>

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
        <div class="tableDescription">
        <div class="fourSeats">Bord med 4 plasser:</div><div class="sixSeats">Bord med 6 plasser:</div>
        </div>
        <div class="tableOverview">
        
            <div class="a box" onclick="selectTable('a')">A</div>
            <div class="b box" onclick="selectTable('b')">B</div>
            <div class="c box" onclick="selectTable('c')">C</div>
            <div class="d box" onclick="selectTable('d')">D</div>
            <div class="e box" onclick="selectTable('e')">E</div>
            <div class="f box" onclick="selectTable('f')">F</div>
            <div class="g box" onclick="selectTable('g')">G</div>
            <div class="h box" onclick="selectTable('h')">H</div>
            <div class="i box" onclick="selectTable('i')">I</div>
            <div class="j box" onclick="selectTable('j')">J</div>
            <div class="k box" onclick="selectTable('k')">K</div>
            <div class="l box" onclick="selectTable('l')">L</div>
            <div class="m box" onclick="selectTable('m')">M</div>
            <div class="n box" onclick="selectTable('n')">N</div>
            <div class="o box" onclick="selectTable('o')">O</div>
            <div class="p box" onclick="selectTable('p')">P</div>
            <div class="q box" onclick="selectTable('q')">Q</div>
            <div class="r box" onclick="selectTable('r')">R</div>
            <div class="s box" onclick="selectTable('s')">S</div>
            <div class="t box" onclick="selectTable('t')">T</div>
            
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
}

function checkChildChair() {
    childBool = childBool ? false : true;
    model.inputs.inputChildChair = childBool;
} 