let tableOverview = '';
let childBool = false;
let rangeCount;
let multipleTableBool = false;
let checkedChildChair = false;
checkTableStatus()   
function createBookingsView() {
    console.log(model.status)
    let error = '';
    let rangeCount;

    for (let tableCategory in model.tables) {
        if (model.tables[tableCategory].includes(model.app.selectedTable[0])) {
            if (tableCategory != 'allTables') {
                let fitsX = tableCategory;
                rangeCount = (fitsX.substring(5, 4));
            }
        }
    }

    let html = '';
    html = `
    <div>
    <div class="header">
    <h1>Reservering</h1>
    <p>Reserver et bord.</p>
    </div>
    <div class="page-outer">
        <div class="inputs ${(animationSatus == false ? 'animate-fade-in' : '')}">
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
    `;
    html += `
    <div>
        <div class="tables ${(animationSatus == false ? 'animate-slide-in-2' : '')}">
    `;

    for (let tableList in model.tables) {
        const tableFitsX = tableList.match(/(\d+)/);
       

        if(model.tables[tableList].length != 0) {
            
            html += `<div class="table-category-wrapper">`;
            html += `<div class="table-category-label">Plass til: ${tableFitsX[0]}</div>`;
            html += `<div class="col">`;

            for (let i = 0; i < model.tables[tableList].length; i++) {
                const table = model.tables[tableList][i];
                html += `
                <div class="box-outer ${model.app.selectedTable.includes(table) ? 'selectedTable' : ''}">
                    <div class="box ${bookingStatusCheck(table)}" onclick="selectTable('${table}')">
                    ${table}
                    </div>
                </div>
                `;
            }
        }   

        html += `</div></div>`;
    }

    html += `</div></div></div>`
    app.innerHTML = html;
    stopAnimations();
}


function bookingStatusCheck(table) {
    console.log(table)

    if (model.status[table] == undefined) return;
    if (model.status[table].bookingStatus == -1) return;
    if (model.status[table].bookingStatus == 0) return;
    if (model.status[table].bookingStatus == 1) return 'bookedSoon';
    if (model.status[table].bookingStatus == 2) return 'booked';
}

function addUpTotGuests() {
    let guestCount = 0;
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

// View for managing registered bookings.
function manageBookingsView() {
    let inputEdit = model.inputsEdit;

    let html = '';
    html = `
    <div class="page  ${(animationSatus == false ? 'animate-fade-in' : '')}">
            <div class="chosenTable">
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
                    let onpage = model.bookingsPaginationPage;
                    onpage--; 
                    let bookings = model.bookingTimes;
                    let count = 0;
                    let page_count = Math.ceil(bookings.length / model.archiveAmountOfRows); 
                    let range = pageRange(model.bookingsPaginationPage, page_count);
                    let start = model.archiveAmountOfRows * onpage;
                    let end = start + model.archiveAmountOfRows;
                    let paginatedBookings = bookings.slice(start, end);
                    let pageStart = range.start;
                    let pageEnd = range.end;
                    html += `<div class="archive-page-inputs">`
                    html += `<div class="pagination-buttons">`;
                    if(page_count > 1) {
                        html += `
                        <div>
                            <button onclick="decPagination2(${page_count});">
                            <i class="fas fa-chevron-left"></i>
                            </button>
                        </div>
                        `;
                    }
                    if(pageStart > 3 ) {
                        html += paginationButton2(1);
                    }
                    // make buttons betweeen pageStart and pageEnd
                    for (let i = pageStart; i <= pageEnd; i++) {
                        if(i != model.bookingsPaginationPage) {
                            html +=  paginationButton2(i);
                        } else  { html += paginationButton2(i) }
                    }
                   
                            // next page in pagination
                    if(page_count > 1) {
                        html += `<div><button onclick="selectPaginationPage2()">...</button></div>`;
                     }
            
                    // button for last page
                    if(pageEnd < page_count ) {
                        html += paginationButton2(page_count);
                    }
                    // next page in pagination
                    if(page_count > 1) {
                        html += `<div><button onclick="incPagination2(${page_count})"><i class="fas fa-chevron-right"></i></button></div>`;
                    }
            
                    html += `</div>`;
                    html += `
                        <div>
                            <label for="rows">Rader</label>
                            <select onchange="changeAmountOfRowsInTable(this.value)" name="rowsCount" id="rows">
                                <option ${(model.archiveAmountOfRows == '5' ? 'selected' : '')} value="5">5</option>
                                <option ${(model.archiveAmountOfRows == '10' ? 'selected' : '')} value="10">10</option>
                                <option ${(model.archiveAmountOfRows == '15' ? 'selected' : '')} value="15">15</option>
                                <option ${(model.archiveAmountOfRows == '20 ' ? 'selected' : '')} value="20">20</option>
                                <option ${(model.archiveAmountOfRows == '25' ? 'selected' : '')} value="25">25</option>
                                <option ${(model.archiveAmountOfRows == '50' ? 'selected' : '')} value="50">50</option>
                                <option ${(model.archiveAmountOfRows == '100' ? 'selected' : '')} value="100">100</option>
                            </select> 
                        </div>
                        </div>
                    `;
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
    for (let i = 0; i < paginatedBookings.length; i++) {
        console.log(pageStart)
        let bookingTimes = paginatedBookings;
        var tableIndex;
        if (model.bookingsPaginationPage > 1) {
            tableIndex = ( i + (model.archiveAmountOfRows * (model.bookingsPaginationPage - 1)));
        } else {
            tableIndex = i;
        }
        console.log(tableIndex)
        html += `
                        <div class="table-row  " >
                            <div onclick="editBookingsSelect(${tableIndex}), updateView()">${bookingTimes[i].table}</div>
                            <div onclick="editBookingsSelect(${tableIndex}), updateView()">${bookingTimes[i].bookedInfo.bookedName}</div>
                            <div onclick="editBookingsSelect(${tableIndex}), updateView()"><a href="tel:${bookingTimes[i].bookedInfo.bookedNumber}">${model.bookingTimes[i].bookedInfo.bookedNumber}</a></div>
                            <div onclick="editBookingsSelect(${tableIndex}), updateView()">${bookingTimes[i].bookedInfo.bookedTime}</div>
                            <div onclick="editBookingsSelect(${tableIndex}), updateView()">${bookingTimes[i].bookedInfo.bookedTimeEnd}</div>
                            <div><button onclick="editBookingsSelect(${tableIndex})">Velg</button><button onclick="endBooking(${i})">Slett booking</button></div>
                            
                            
                        </div>
                        `;
    }
    html += `</div></div>
            </div>
        </div>
    </div>
    `;
    app.innerHTML = html;
    stopAnimations();
}

// View for archive page
function archiveView() {
    let html = '';
    if (archive.length != 0) {
        let onpage =  model.archiveOnPage;
        onpage--;
        const bookings = (searchResult.length > 0 ? searchResult : archive)
        html += `
        <div class="page-archive  ${(animationSatus == false ? 'animate-fade-in' : '')}">
            <div class="header">
            <h1>Arkiv</h1>
            <p>Har kan du gå gjennom arkiverte reservasjoner</p> 
            </div>

            <div class="search">
                <div class="search-input">
                    <input class="testing" onload="this.focus()" value="${model.archiveInputs.searchInput}"  type="text" oninput="model.archiveInputs.searchInput =  this.value" onkeyup="search(event)" placeholder="eks: Johnny">
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
            ${(searchResult.length > 0 ? `<div>Fant <i>${searchResult.length}</i> reserveringer med det søket.</div>` : '')}`;
        
        let count = 0;
        let page_count = Math.ceil(bookings.length / model.archiveAmountOfRows); 
        let range = pageRange(model.archiveOnPage, page_count);
        let start = model.archiveAmountOfRows * onpage;
        let end = start + model.archiveAmountOfRows;
        let paginatedBookings = bookings.slice(start, end);
        let pageStart = range.start;
        let pageEnd = range.end;
        
        html += `<div class="archive-page-inputs">`
        html += `<div class="pagination-buttons">`;
        if(page_count > 1) {
            html += `
            <div>
                <button onclick="decPagination(${page_count});">
                <i class="fas fa-chevron-left"></i>
                </button>
            </div>
            `;
        }
        if(pageStart > 3 ) {
            html += paginationButton(1);
        }
        // make buttons betweeen pageStart and pageEnd
        for (let i = pageStart; i <= pageEnd; i++) {
            if(i != model.archiveOnPage) {
                html +=  paginationButton(i);
            } else  { html += paginationButton(i) }
        }
       
                // next page in pagination
        if(page_count > 1) {
            html += `<div><button onclick="selectPaginationPage()">...</button></div>`;
         }

        // button for last page
        if(pageEnd < page_count ) {
            html += paginationButton(page_count);
        }
        // next page in pagination
        if(page_count > 1) {
            html += `<div><button onclick="incPagination(${page_count})"><i class="fas fa-chevron-right"></i></button></div>`;
        }

        html += `</div>`;
        html += `
            <div>
                <label for="rows">Rader</label>
                <select onchange="changeAmountOfRowsInTable(this.value)" name="rowsCount" id="rows">
                    <option ${(model.archiveAmountOfRows == '5' ? 'selected' : '')} value="5">5</option>
                    <option ${(model.archiveAmountOfRows == '10' ? 'selected' : '')} value="10">10</option>
                    <option ${(model.archiveAmountOfRows == '15' ? 'selected' : '')} value="15">15</option>
                    <option ${(model.archiveAmountOfRows == '20 ' ? 'selected' : '')} value="20">20</option>
                    <option ${(model.archiveAmountOfRows == '25' ? 'selected' : '')} value="25">25</option>
                    <option ${(model.archiveAmountOfRows == '50' ? 'selected' : '')} value="50">50</option>
                    <option ${(model.archiveAmountOfRows == '100' ? 'selected' : '')} value="100">100</option>
                </select> 
            </div>
            </div>
        `;
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
                <div><button onclick="removeFromArchive(${i})">Fjern fra arkiv</button></div>
                
                
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

    app.innerHTML = html;
    stopAnimations();

}

function pageRange(page, pageCount) {

    let start = page - 2,
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

function paginationButton(page) {
    return `
        <div>
            <button onclick="changePaginationPage(${page})" class="${(model.archiveOnPage == page?  'archive-current-page' : '')}">${page}</button></div>
    `;
}

function paginationButton2(page) {
    return `
        <div>
            <button onclick="changePaginationPage2(${page})" class="${(model.bookingsPaginationPage == page?  'archive-current-page' : '')}">${page}</button></div>
    `;
}



function editTablesView() {
    let html = '';
    let selectedTable = model.selectedTable;
    html += `
        <div class="manage-tables-page  ">
        <div class="header">
        <h1>Administrere bord</h1>
        <p>Her kan du endre og legge til nye bord i systemet.
        </div>
    `;


html += `
<div class="manage-tables  ${(animationSatus == false ? 'animate-fade-in' : '')}">
<div class="edit-tables-input">
    <div>Endre bord:</div>
    <div>
        <label>Seter: </label>
    </div>
    <div class="input-range">
        <input type="range" min="1" max="10" oninput="model.selectedTable.selectedTableGuests = this.value; document.getElementById('slider').innerHTML = this.value;" value="${(selectedTable.selectedTableFits ? selectedTable.selectedTableFits : '1')}"><span id="slider">${(selectedTable.selectedTableFits ? selectedTable.selectedTableFits : '1')}</span>
    </div>

    <div>
        <button onclick="deleteTable(model.app.selectedTableForEdit)">Slette Bord</button>
        <button onclick="changeTableInformation(model.app.selectedTableForEdit)">Endre Bord</button>
    </div>
    </div>
    <div class="new-table-inputs">
        <div>Nytt bord</div>
        <div class="abcdef">
        <div>
            <div>
                <input oninput="model.selectedTable.selectedTableLetter = this.value" placeholder="E">
            </div>
        </div>
        <div class="input-range">
            <label>Seter:&nbsp;</label> 
            <input type="range" min="1" max="10" oninput="model.selectedTable.selectedTableGuests = this.value; document.getElementById('slider2').innerHTML = this.value;" value="${(model.selectedTable.selectedTableGuests ? model.selectedTable.selectedTableGuests : '1') }"><span id="slider2">${(model.selectedTable.selectedTableGuests ? model.selectedTable.selectedTableGuests : '1') }</span>

        </div>
        </div>

        <div>
            <button onclick="createNewTable()">Lag nytt bord</button>
        </div>
        <div id="sliderInput"></div>    
        

    </div>
</div>
    `;
    html += `<div class="tables" style="margin-left: 0 !important;">`;

    for (let tableList in model.tables) {
        const tableFitsX = tableList.match(/(\d+)/);
        html += `<div class="table-category-wrapper">`;
        html += `<div class="table-category-label">Plass til: ${tableFitsX[0]}</div>`;
        html += `<div class="col">`;


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
    html += `</div>`;


    app.innerHTML = html;
    stopAnimations();
}



function statisticsView() {
    getStatsFromYear();

    let html = '';
    let svgWidth = 500;
    let statHeight = 200;
    let barWidth = (svgWidth / model.stats.length);

    html += `
    <div class="statistics-page">
    <div class="header">
    <h1>Statistikk</h1>
    <p>Årlig og månedlig statistikk</p>
    </div>

    `;  

    svgWidth = 600;
    html += `
    <div class="statistic-outer" style="width:${svgWidth}px" >
        <div class="statistic-header">
   
        <div class="stats-year-title">
        <span>
            Års statistikk for 
        <span>
            <input autofocus type="number" oninput="changeDateValue(this.value)" value="${(model.inputStatsDate === '' ? new Date().getFullYear() : model.inputStatsDate)}"></div>
            <span>Klikk på en av månedene for og se månedlig statistikk.</span>
        </div>
        <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">`;

    for (const hm in model.stats) {
        html += `
        <div class="stat-bar-outer">
            <div class="stat-bar" onclick="changeDateMonthValue('${hm}')" style="${model.stats[hm] == 0 ? '; background: rgb(210, 210, 210) !important; color:black;' : `height:${getBarHeightFromYearStats(hm) + '%'}`}; width:${barWidth}px; background:${getRandomColor()};">
                <div>${model.stats[hm]}</div>
            </div>
        </div>`;
    }

    html += `</div>`;
    html += `<div class="labels"  style="width:${svgWidth}px">`;
    for (const hm in model.stats) {
        html += `
            <div class="stat-label" style="width:${barWidth}px">${monthName(hm)}</div>
        `;
    }
    html += `</div></div>`;
    
    svgWidth = 800;

    html += `
    <div class="statistic-outer">
        <h2> ${(model.inputStatsMonth != null  ? 'Måndedlig statistikk for <i>' + monthName(model.inputStatsMonth) + '</i>': '')}</h2>
        <div class="statistic" style="height: ${statHeight}px;width:${svgWidth}px">`;
    
        barWidth = (svgWidth / model.statsMonth.length);

    for (const hm in model.statsMonth) {
        html += `<div class="stat-bar-outer testingg">
                    <div class="stat-bar"  style="${model.statsMonth[hm] == 0 ? 'height:4%; background: rgb(210, 210, 210) !important; color:black;' : `height:${getBarHeightFromMonthStats(hm) + '%'}`}; width:${barWidth}px;  background:${getRandomColor()};">
                        <div style="">
                            ${(model.statsMonth[hm] != 0 ? model.statsMonth[hm] : '')}
                        </div>
                    </div>
                </div>`;
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

    app.innerHTML = html;
}


function getStatsFromMonth() {
    model.statsMonth = [];
    const bookingsArchive = archive;
    const selectedYear = parseInt(model.inputStatsDate) || new Date().getFullYear();
    const selectedMonth = parseInt(model.inputStatsMonth);
    const stats= new Array(daysInMonth(selectedYear, selectedMonth)).fill(0);
    
    if (model.statsMonth) {
        bookingsArchive.forEach(item => {
            const bookedDate = item.bookedInfo.bookedTime;

            // find bookings that are registered at the selected year and selected month  
            if (findYear(bookedDate) === selectedYear && findMonth(bookedDate) === selectedMonth) {

                let countDays = 0;  

                // count through the days in selected month
                while(countDays < daysInMonth(selectedYear, selectedMonth)) {
                    countDays++;
                    const day = findDay(bookedDate)

                    // checks if day in booking is equal "countDays" then
                    // increments the amount of orders on the correct day/position in the stats Array
                    // since day can be equal to findDay return a date which doesnt start 
                    // at 1 we need to use day - 1 to get the correct position in the array

                    if (day === countDays) { stats[day - 1] = stats[day - 1] + 1; }

                }
            }

        }); 
        model.statsMonth = stats;
    }
}
