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

function editBooking() {
    /*model.bookingTimes[table].table.splice(0,1,model.bookingTimes[table].bookedInfo.bookedName,test); jeg vet ikke hvordan jeg skal splice alt dette her :v*/
    model.bookingTimes[table]= (
        {
            table: model.bookingTimes[table].table,
            chairCount: model.bookingTimes[table].chairCount,
            bookingInfo: {
                bookedName: editName,
                bookedNumber: editNumber,
                bookedTime: 'Test',
                bookedTimeEnd: 'Test',
                bookedGuestCount: editNumberOfGuests,
                bookedChild: editChildChair,
            }
        });
};