


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
            <div class="tableInformation">
                <div class="currentTable" id="check">Valgt Bord: <strong>${model.app.selectedTable}</strong></div>
                <div class0"maxTableGuests">Bordet har plass til: <strong>${rangeCount || 'Velg bord'}</strong>${rangeCount ? ' personer' : ''}</div>
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
        <div>Bord med 4 plasser:</div><div>Bord med 6 plasser:</div>
        </div>
        <div class="tableOverview">
        
            <div class="a box" onclick="select('a')">A</div>
            <div class="b box" onclick="select('b')">B</div>
            <div class="c box" onclick="select('c')">C</div>
            <div class="d box" onclick="select('d')">D</div>
            <div class="e box" onclick="select('e')">E</div>
            <div class="f box" onclick="select('f')">F</div>
            <div class="g box" onclick="select('g')">G</div>
            <div class="h box" onclick="select('h')">H</div>
            <div class="i box" onclick="select('i')">I</div>
            <div class="j box" onclick="select('j')">J</div>
            <div class="k box" onclick="select('k')">K</div>
            <div class="l box" onclick="select('l')">L</div>
            <div class="m box" onclick="select('m')">M</div>
            <div class="n box" onclick="select('n')">N</div>
            <div class="o box" onclick="select('o')">O</div>
            <div class="p box" onclick="select('p')">P</div>
            <div class="q box" onclick="select('q')">Q</div>
            <div class="r box" onclick="select('r')">R</div>
            <div class="s box" onclick="select('s')">S</div>
            <div class="t box" onclick="select('t')">T</div>
            
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
}

function checkChildChair() { 
        childBool = childBool ? false : true; 
        model.inputs.inputChildChair = childBool;
} 