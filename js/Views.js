let tableOverview = '';
let childBool = false;
let rangeCount;
let multipleTableBool = false;
let checkedChildChair = false;
  
function viewCreateBooking() {

    let error = '';
    let rangeCount;
    for (let tableCategory in model.tables) {
        if (model.tables[tableCategory].includes(model.app.selectedTable[0])) {
            if (tableCategory != 'allTables') {
                var fitsX = tableCategory;
                rangeCount = (fitsX.substring(5, 4));
            }
        }
    }
    // if (model.tables.fits4.includes(model.app.selectedTable)) {
    //     rangeCount = 4;
    // } else if (model.tables.fits6.includes(model.app.selectedTable)) {
    //     rangeCount = 6;
    // }

    let date = new Date();
    date = date.toISOString()
    var date1 = date.substring(0, 10);
    date1 = new Date(date1).toLocaleDateString()
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`;


    let html = '';
    html = `
    <div class="page-outer">
        <div class="${(animationSatus == false ? 'animate-fade-in' : '')}">
                <div class="inputs ">
                    <div class="input-name">
                        <div>
                            <label>Navn:</label>
                            <input oninput="model.inputs.inputName = this.value" value="${model.inputs.inputName}">
                        </div>
                        
                    </div>
                    <div class="input-number">
                        <div>
                            <label>Mobil Nummer:</label>
                            <input oninput="model.inputs.inputNumber = this.value" value="${model.inputs.inputNumber}">
                        </div>
                       
                    </div>
                    <div class="input-date">
                        <div>
                        <label>Reservert fra </label>
                        <input type="time" onchange="model.inputTime.fromInputTime = this.value" value="${model.inputTime.fromInputTime}"></input>
                        <input type="date" oninput="model.inputTime.fromInputDate = this.value" value="${model.inputTime.fromInputDate}"></input>
                        <button onclick="setTimeToCurrentTime()">Nåværende Tid</button>
                        </div>
                        <div>
                        <label>til</label>
                        <input type="time" onchange="model.inputTime.toInputTime = this.value" value="${model.inputTime.toInputTime}"></input>
                        <input type="date" oninput="model.inputTime.toInputDate = this.value" value="${model.inputTime.toInputDate}"></input>
                        </div>
                        
                    </div>
                    
                    <div>
                       
                    </div>
                    <div class="input-guest">
                        <div class="input-guest-label">
                            <label>Antall gjester ${(addUpTotGuests() ? addUpTotGuests() + ' Max' : '<i>Velg bord</i>')}</label><label></label>
                        </div>
                        <div>
                            <input type="number" min="1" max="${addUpTotGuests()}" oninput="model.inputs.inputNumberOfGuests = this.value" value="${model.inputs.inputNumberOfGuests}">
                            
                        </div>
                    </div>
                    <div>
                        <label>TillegsBeskjed</label>
                        <input type="form" oninput="model.inputs.inputMessage = this.value"></input>
                    </div>
                    <div>
                        <label>Barnestol</label>
                        <input type="checkbox" ${childBool ? 'checked' : ''} onclick="checkChildChair()" >
                    </div>
                    
                    <div class="errors">
                    </div>
                    <div class="add-booking">
                        <button class="" onclick="createBooking()">Reserver</button>
                    </div>
            </div>


        </div>

        
`
    html += `<div class="tables ${(animationSatus == false ? 'animate-slide-in-2' : '')}">
    Plass til
    `;

    for (let tableList in model.tables) {
        const tableFitsX = tableList.match(/(\d+)/);

        if(model.tables[tableList].length != 0) {
            html+= `<div class="table-category-wrapper">`;
            html+= `<div class="table-category-label"> ${tableFitsX[0]}</div>`;
            html+= `<div class="col">`;
    
            for (let i = 0; i < model.tables[tableList].length; i++) {
                
                const table = model.tables[tableList][i];
    
                html += `
                <div class="box-outer ${model.app.selectedTable.includes(table) ? 'selectedTable' : ''}">
                    <div class="box" onclick="selectTable('${table}')">
                        ${table}
                    </div>
                </div>
                `;
               
            }
            html += `</div>`;
            html += `</div>`;
        }
    }

    document.getElementById('app').innerHTML = html;
    stopAnimations();
}


function bookingStatusCheck(i) {
    var allTables = model.tables.allTables;
    if (model.status[allTables[i]].bookingStatus == 0) return;
    if (model.status[allTables[i]].bookingStatus == 1) return 'bookedSoon';
    if (model.status[allTables[i]].bookingStatus == 2) return 'booked';
}

function addUpTotGuests() {
    var guestCount = 0;
    for (let tableList in model.tables) {
        for (let i = 0; i < model.app.selectedTable.length; i++) {
            if (model.tables[tableList].includes(model.app.selectedTable[i])) {
                guestCount += parseInt(tableList.substring(4))
            }
        }
        
    }
    return guestCount;
}

function checkChildChair() {
    childBool = childBool ? false : true;
    model.inputs.inputChildChair = childBool;
}

function checkMultipleTables() {
    multipleTableBool = multipleTableBool ? false : true;

    model.app.selectMultipleTables = multipleTableBool;

}

let dateSelect = new Date();
dateSelect = dateSelect.toISOString().substr(0, 16)

function viewCheckBookingsDate() {
    let date = new Date();
    date = date.toISOString()
    var date1 = date.substring(0, 10);
    date1 = new Date(date1).toLocaleDateString()
    var date2 = date.substring(11, 16);
    date = `${date1}  ${date2}`;


    var inputEdit = model.inputsEdit;

    let html = '';
    html = `
    <div class="page  ${(animationSatus == false ? 'animate-fade-in' : '')}">
            <div class="chosenTable  ">
                <div class="inputs">

                <div>
                    <div>
                        <label>Nummer:</label>
                    </div>
                    <div>
                        <input oninput="model.inputsEdit.editName = this.value" value="${model.inputsEdit.editName}">
                    </div>
                </div>

                <div>
                    <div>
                        <lable>Nummer:</label>
                    </div>
                    
                    <div>
                        <input oninput="model.inputsEdit.editNumber = this.value" value="${model.inputsEdit.editNumber}">
                    </div>
                </div>

                <div>

                    <div>
                        <label>Dato fra:</label>
                    </div>
                    <div>
                    <input type="datetime-local" oninput="model.inputsEdit.editTime = this.value" value="${model.inputsEdit.editTime}">
                    </div>
                </div>

                <div>
                    <div>
                        <label>Dato til:</label>
                    </div>
                    <div>
                        <input type="datetime-local" oninput="model.inputsEdit.editTimeEnd = this.value" value="${model.inputsEdit.editTimeEnd}">
                    </div>
                </div>

                <div>
                    <div>
                        <label>Antall Gjester: ${inputEdit.editNumberOfGuests}</label>
                    </div>

                </div>

                <div class="saveBooking">
                    <button onclick="editBookingsSave()">
                    Lagre endringer</button>
                </div>  

                <div class="tableInfo">
                    <div>Valgt Bord: ${inputEdit.editTable}</div>
                    <div>Dette border har ${inputEdit.editChair} plasser</div>       
                </div>

                <div>
                    Barnestol:
                    <input type="checkbox" ${inputEdit.editChildChair ? 'checked' : ''} onclick="checkChildChair()" >            
                    </div>
            </div>
            
                    <div id="bookingsOverview">
                    `;
    html += `
                    <div class="booked-tables-outer ${(animationSatus == false ? 'animation' : '')}">
                    <div class="table-labels">
                    <div>Bord</div>
                    <div>Navn</div>
                    <div>Mobil Nummer</div>
                    <div>Booket fra</div>
                    <div>Booket til</div>
                    
                
                </div>
                        <div class="booked-tables ">
                
                    `;
    for (let i = 0; i < model.bookingTimes.length; i++) {
        var bookingTimes = model.bookingTimes;
        html += `
                        <div class="table-row  " >
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].table}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedName}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()"><a href="tel:${bookingTimes[i].bookedInfo.bookedNumber}">${model.bookingTimes[i].bookedInfo.bookedNumber}</a></div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedTime}</div>
                            <div onclick="editBookingsSelect(${i}), updateView()">${bookingTimes[i].bookedInfo.bookedTimeEnd}</div>
                            <div><button onclick="editBookingsSelect(${i}), updateView()">Velg</button><button onclick="endBooking(${i})">Slett booking</button></div>
                            
                            
                        </div>
                        `;
    }
    html += `</div></div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('app').innerHTML = html;
    stopAnimations();
}

function editBookingsSelect(i) {
    var bookingTimesInfo = model.bookingTimes[i].bookedInfo;
    model.inputsEdit = (
        {
            editIndex: i,
            editName: bookingTimesInfo.bookedName,
            editNumber: bookingTimesInfo.bookedNumber,
            editTime: bookingTimesInfo.bookedTime,
            editTimeEnd: bookingTimesInfo.bookedTimeEnd,
            editNumberOfGuests: bookingTimesInfo.bookedGuestCount,
            editChildChair: bookingTimesInfo.bookedChild,
            editTable: model.bookingTimes[i].table,
            editChair: model.bookingTimes[i].chairCount,
        }
    );
}

function editBookingsReset() {
    model.inputsEdit = (
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
    dateSelect = dateSelect.toISOString().substr(0, 16)
}

function editBookingsSave() {
    var inputsEdit = model.inputsEdit;
    model.bookingTimes[inputsEdit.editIndex] = (
        {
            table: inputsEdit.editTable,
            chairCount: inputsEdit.editChair,
            bookedInfo: {
                bookedName: inputsEdit.editName,
                bookedNumber: inputsEdit.editNumber,
                bookedTime: inputsEdit.editTime,
                bookedTimeEnd: inputsEdit.editTimeEnd,
                bookedGuestCount: inputsEdit.editNumberOfGuests,
                bookedChild: inputsEdit.editChildChair,
            }
        }
    );
    editBookingsReset();
    updateView();
}

function archiveBookingList() {
    let html = '';

    html += `
    
    
    `;



    if (archive.length != 0) {
        let onpage =  model.archiveOnPage;
        onpage--;
        const bookings = (searchResult.length > 0 ? searchResult : archive)
        html += `
        <div class="page-archive  ${(animationSatus == false ? 'animate-fade-in' : '')}">
        
        <div class="search">
            <div class="search-input">
                <input autofocus value="${model.archiveInputs.searchInput}"  type="text" oninput="model.archiveInputs.searchInput =  this.value" onkeyup="search(event)" placeholder="eks: Johnny">
            </div>
            <div>
                <select onchange="model.archiveInputs.searchBy = this.value" name="searchby " id="searchby">
                    <option ${(model.archiveInputs.searchBy == 'name' ? 'selected' : '')}  value="name">Navn</option>
                    <option ${(model.archiveInputs.searchBy == 'date' ? 'selected' : '')} value="date">Dato</option>
                    <option ${(model.archiveInputs.searchBy == 'number' ? 'selected' : '')}  value="number">Mobil Nummer</option>
                </select>
            </div>
            <div>
                <button onclick="resetSearchQuery();">Reset søk</button>
            </div>
        </div>
        ${(searchResult.length > 0 ? `<div>Fant <i>${searchResult.length}</i> reserveringer med det søket.</div>` : '')}
        
        `;
        
        let count = 0;
        let page_count = Math.ceil(bookings.length / rows); 
        let range = pageRange(model.archiveOnPage, page_count);

        let start = rows * onpage;
        
        let end = start + rows;

        let paginatedBookings = bookings.slice(start, end);

        let pageStart = range.start;

        let pageEnd = range.end;
        
        html += `<div class="pagination-buttons">`
        
        html += (page_count > 1 ? `<div><button onclick="decPagination(${page_count});"><</button></div>` : '');
        let i;
        for (i = pageStart; i <= pageEnd; i++) {
            if(i != model.archiveOnPage) {
                html +=  paginationButton(i);
            } else  {
               html += paginationButton(i)
            }
         
           

        }

        html +=  (page_count > 1 ? `<div><button onclick="incPagination(${page_count})">></button></div>` : '');
        html += `</div>`
        html += `
        <div class="booked-tables">
        <div class="table-labels">
            <div>Bord</div>
            <div>Navn</div> 
            <div>Mobil Nummer</div>
            <div>Booket fra</div>
            <div>Booket til</div>
        </div>
        `;
       
        for(let i = 0; i < paginatedBookings.length; i++ ) {
            const item = paginatedBookings[i];
            html += `
            <div class="table-row">
                <div>${item.table}</div>
                <div>${item.bookedInfo.bookedName}</div>
                <div><a href="tel:${item.bookedInfo.bookedNumber}">${item.bookedInfo.bookedNumber}</a></div>
                <div>${item.bookedInfo.bookedTime}</div>
                <div>${item.bookedInfo.bookedTimeEnd}</div>
                <div><button onclick="removeFromArchive(${count})">Fjern fra arkiv</button></div>
                
                
            </div>
            `;
            count++;
        }
    } else {
        html += 'Arkivet er tomt.'
    }

    html += `
    </div>
    `;
    document.getElementById('app').innerHTML = html;
    stopAnimations();

}

/* Pagination Navigation */
function checkPrevious(id) {
    if (id > 1) {
        return (id - 1);
    }
    return 1;
}

/* Pagination Navigation */
function checkNext(id, pageCount) {
    if (id < pageCount) {
        return (id + 1);
    }
    return id;
}


function pageRange(page, pageCount) {

    var start = page - 2,
        end = page + 2;

    if (end > pageCount) {
        start -= (end - pageCount);
        end = pageCount;
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return {
        start: start,
        end: end
    };
}   

function paginationButton(page, alt) {
    alt = alt || '';
    
    return `
        <div><button onclick="changePaginationPage(${page})" class="${(model.archiveOnPage == page?  'archive-current-page' : '')}">${page}</button></div>
    `;
}

function decPagination() {
    console.log(3)
    let bookings = model.bookingTimes;
    let page_count = Math.ceil(bookings.length / rows);
    let page = model.archiveOnPage
    if((page - 1) < 0) return;
    page - 1;
    model.archiveOnPage = page;
    updateView();
}

function incPagination() {
    console.log(model.archiveOnPage, ' inc')
    let bookings = model.bookingTimes;
    let page_count = Math.ceil(bookings.length / rows);
    let page = model.archiveOnPage;
    if(model.archiveOnPage + 1 > page_count) return;
    if(model.archiveOnPage )
    model.archiveOnPage++;
    updateView();
}
function changePaginationPage(page) {
    model.archiveOnPage = page;
    updateView();
}

function editTablesView() {
    let html = '';
    var selectedTable = model.selectedTable;


    html += `<div class="tables ${(animationSatus == false ? 'animate-fade-in' : '')}">`;

    for (let tableList in model.tables) {
        const tableFitsX = tableList.match(/(\d+)/);

        html+= `<div class="table-category-wrapper">`;
        
        html+= `<div class="table-category-label">${tableFitsX[0]}</div>`;
        html+= `<div class="col">`;

        for (let i = 0; i < model.tables[tableList].length; i++) {
            
            const table = model.tables[tableList][i];

            html += `
            <div class="box-outer ${selectedTable.selectedTableForEdit == table ? 'selectedTable' : ''}">
                <div class="box" onclick="selectTableForEdit('${model.tables[tableList][i]}')">
                    ${table}
                </div>
            </div>
            `;
           
        }
        html += `</div>`;
        html += `</div>`;
    }


    html += `
    <hr>
    <div>
    <div>${selectedTable.selectedTableForEdit ? `Bord ${selectedTable.selectedTableForEdit.toUpperCase()}` : ''}</div>
    <div>${selectedTable.selectedTableFits ? `Bordet har plass til ${selectedTable.selectedTableFits}` : ''}</div>
    
    <div>${selectedTable.selectedTableForEdit ? `
    <div></div>
    <input type="range" min="1" max="10" oninput="model.selectedTable.selectedTableGuests = this.value; document.getElementById('slider').innerHTML = this.value" value="model.selctedTable.selectedTableFits"></input>
    <div>Endre bordet til:
        <div id="slider">${selectedTable.selectedTableFits}</div>
        Personer
    </div>`
            : ''}</div>
    <button onclick="deleteTable(model.app.selectedTableForEdit)">Slette Bord</button>
    <button onclick="changeTableInformation(model.app.selectedTableForEdit)">Endre Bord</button>
    `;

    document.getElementById('app').innerHTML = html;
}

function changeDateValue(e, value) {
    model.inputStatsDate = value;
    statsFixDataMonth();
    updateView();
}


function changeDateMonthValue(e, value) {
    model.inputStatsMonth = value;
    statsFixDataMonth();
    updateView();
}

function statisticsView() {
    statsFixData();
    testing();

    let html = '';
    let svgWidth = 500;
    let statHeight = 200;

     html += `
     <div class="${(animationSatus == false ? 'animate-fade-in' : '')}">
     <h1>Statistikk</h1>
    <label>Velg år</label><input autofocus type="number" oninput="changeDateValue(event, this.value)" value="${(model.inputStatsDate === '' ? new Date().getFullYear() : model.inputStatsDate)}">
 

    `;  

    if(model.statisticMode == 'year') {

    }

    svgWidth = 600;
    html += `<div class="statistic-outer" style="width:${svgWidth}px" >
            <div class="statistic-header"><h2>Års statistikk for ${(model.inputStatsDate === '' ? new Date().getFullYear() : model.inputStatsDate)}</h2><span>Klikk på en av månedene for og se månedlig statistikk.</span></div>
            <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">`;
    let barWidth = (svgWidth / model.stats.length);
    
    for (const hm in model.stats) {

        html += `<div class="stat-bar-outer"><div class="stat-bar" onclick="changeDateMonthValue(event, ${hm})" style="${model.stats[hm] == 0 ? '; background: rgb(210, 210, 210) !important; color:black;' : `height:${testing(hm) + '%'}`}; width:${barWidth}px;">
                    <div>${model.stats[hm]}</div>
                </div></div>
                `;
    }          
    html += `</div>`;
    html += `<div class="labels"  style="width:${svgWidth}px">`;
    for (const hm in model.stats) {
        html += `
        <div class="stat-label" style="width:${barWidth}px">${monthName(hm)}</div>
        `;
    }
    html += `</div></div>`;

    // check if month mode
    if(model.statisticMode == 'month') {

    }
    
    svgWidth = 800;

    html += `<div></div><div class="statistic-outer">
            <h2> ${(model.inputStatsMonth != null  ? 'Måndedlig statistikk for <i>' + monthName(model.inputStatsMonth) + '</i>': '')}</h2>
    <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">`;
    barWidth = (svgWidth / model.statsMonth.length);

    for (const hm in model.statsMonth) {
        html += `<div class="stat-bar-outer"><div class="stat-bar"  style="${model.statsMonth[hm] == 0 ? 'height:4%; background: rgb(210, 210, 210) !important; color:black;' : `height:${statisticBarHeights(hm) + '%'}`}; width:${barWidth}px;">
                    <div style="">${(model.statsMonth[hm] != 0 ? model.statsMonth[hm] : '')}</div>
                </div></div>`;
    }

    html += `</div>`;
    html += `<div class="labels" style="width:${svgWidth}px">`;
    let day = 0;
    for (const hm in model.statsMonth) {
        day++;
        html += `
        <div class="stat-label-days" style="width:${barWidth}px;">${day}</div>
        `;

    }
    html += '</div></div>';

    document.getElementById('app').innerHTML = html;
    stopAnimations();
}


function statsFixDataMonth() {
    const selectedYear = (!model.inputStatsDate ? new Date() : model.inputStatsDate );
    const selectedMonth = (!model.inputStatsMonth  && model.inputStatsMonth != 0 ? new Date().getMonth() : model.inputStatsMonth);

    let test = new Date(findYear(selectedYear), selectedMonth, 1);
 
    const bookings = archive;
    const stats = new Array(daysInMonth((selectedYear.length === 4 ? selectedYear : findYear(selectedYear)), findMonth(test))).fill(0);
    
    if (model.statsMonth) {
        bookings.forEach(item => {
            const time = item.bookedInfo.bookedTime;
            if (findYear(time) === findYear(selectedYear) && findMonth(time) === selectedMonth) {
                let count = 1;

               if(findDay(time) === 0) {
                   alert('testing')
               }
                while(count < stats.length) {

                    if (findDay(time) === count) { stats[findDay(time) -1 ] = stats[findDay(time)- 1 ] + 1; }

                    count++;
               
                }
            }

        }); 
        model.statsMonth = stats;
    }

}


function statsFixData() {

    const bookings = archive;

    const stats = new Array(12).fill(0);

    const selectedDate = (!model.inputStatsDate ? new Date() : model.inputStatsDate);

    if (model.stats) {

        bookings.forEach(item => {

            const time = item.bookedInfo.bookedTime

            if (findYear(time) === findYear(selectedDate)) {

                let count = 0;

                while(count < 12) {

                    if (findMonth(time) === count) { stats[findMonth(time)] = stats[findMonth(time)] + 1; }

                    count++

                }

            }

        });

        model.stats = stats;

    }


}

function testing(a) {
    const stats = model.stats;
    var timesIndex;

        var highestValue = Math.max.apply(Math, stats);
        if (highestValue < 10) { timesIndex = 100 / highestValue };
        if (highestValue > 10) { timesIndex = highestValue / 100 }
        

        var calculatedArray = new Array(stats.length).fill(0);
        for (let i = 0; i < stats.length; i++) {
            if (highestValue < 10) {

                calculatedArray[i] = Math.floor(stats[i] * timesIndex);

            }
            else {
                calculatedArray[i] = Math.floor(stats[i] / timesIndex);

            }


        }

    return calculatedArray[a];
}


function statisticBarHeights(a) {
    const stats = model.statsMonth;
    var timesIndex;

        var highestValue = Math.max.apply(Math, stats);
        if (highestValue < 10) { timesIndex = 100 / highestValue };
        if (highestValue > 10) { timesIndex = highestValue / 100 }
        

        var calculatedArray = new Array(stats.length);
        for (let i = 0; i < stats.length; i++) {
            if (highestValue < 10) {

                calculatedArray[i] = Math.floor(stats[i] * timesIndex);

            }
            else {
                calculatedArray[i] = Math.floor(stats[i] / timesIndex);

            }


        }
    

    return calculatedArray[a];
}


function monthName(month) {
    if (month == 0) return 'Januar';
    if (month == 1) return 'Februar';
    if (month == 2) return 'Mars';
    if (month == 3) return 'April';
    if (month == 4) return 'Mai';
    if (month == 5) return 'Juni';
    if (month == 6) return 'Juli';
    if (month == 7) return 'August';
    if (month == 8) return 'September';
    if (month == 9) return 'Oktober';
    if (month == 10) return 'November';
    if (month == 11) return 'Desember';
}

function findMonth(datestring) {
    const date = new Date(datestring);
    return date.getMonth();
}
function findYear(datestring) {
    const date = new Date(datestring);
    return date.getFullYear();
}
function findDay(datestring) {
    const date = new Date(datestring);
    return date.getDate();
}

