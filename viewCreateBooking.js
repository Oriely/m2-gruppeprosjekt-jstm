viewCreateBooking()
function viewCreateBooking() {
    let tableOverview = '';
    let html = '';
    html = `
    <div class="page">
        <div class="date">I dag: ${new Date()}</div>
        <div class="inputs">
            <div class="createName">Name: <input></div>
            <div class="createNumber">Number: <input></div>
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

