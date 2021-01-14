let tableOverview = '';
let childBool = false;
viewCreateBooking()

function viewCreateBooking() {
    
    let date = new Date();
    
    let html = '';
    html = `
    <div class="page">
        <div class="date">I dag: ${date}</div>
        <div class="inputs">
            <div class="createName"><div>Name:</div> <input oninput="model.inputs.inputName = this.value"></input></div>
            <div class="createNumber"><div>Number:</div> <input oninput="model.inputs.inputNumber = this.value"></div>
            Starttid:
            <div class="createDateAndTime"><input type="datetime-local" oninput="model.inputs.inputTime = this.value"></div>
            Slutttid:
            <div class="createDateAndTime"><input type="datetime-local" oninput="model.inputs.inputTimeEnd = this.value"></div>
            <div class="createGuests"><input type="range" min="1" max="6" oninput="model.inputs.inputNumberOfGuests = this.value"><br>Antall gjester</div>
            <div class="createTableInfo"></div>
            <div class="createChildChair">Barnestol<input type="checkbox" onclick="checkChildChair()"></div>
            <div class="currentTable" id="check">Valgt Bord: ${model.app.selectedTable}</div>
            <div class="createBooking"><button onclick="createBooking()">Book</button></div>
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