let tableOverview = '';

viewCreateBooking()

function viewCreateBooking() {
    createTableOverview();
    let date = new Date();
    
    let html = '';
    html = `
    <div class="page">
        <div class="date">I dag: ${date}</div>
        <div class="inputs">
            <div class="createName"><div>Name:</div> <input></input></div>
            <div class="createNumber"><div>Number:</div> <input></div>
            <div class="createDateAndTime"><input type="date"><input type="time"></div>
            <div class="createGuests"><input type="range"><br>Antall gjester</div>
            <div class="createTableInfo"></div>
            <div class="createChildChair">Barnestol<input type="checkbox"></div>
            <div class="createBooking"><button>Book</button></div>
        </div>
        
        <div class="tableOverview">
            ${tableOverview}
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
}


function createTableOverview() {
    // for (let i = 0; i < )
    // tableOverview += `
    
    // `
}
