
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