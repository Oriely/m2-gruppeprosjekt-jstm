const  model = {
    app: {
        selectedTable: [],
        selectedDate: '',
        currentPage: ''
        

    },
    selectedTable: {
        selectedTableForEdit: '',
        selectedTableFits: '',
        selectedTableGuests: '',
    },
    tables: {
        fits4: ['a', 'b', 'c', 'd' ],
        fits1: ['u', 'v','e', 'f', 'g', 'h', 'i', 'j'],
        fits10: ['w', 'x'],

        fits6: ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    },
    archiveOnPage: 1,
    archiveInputs: {
        searchBy:'name',
        onPage: 1,
        searchInput: '',
    },

    statisticMode: 'year',
    inputStatsYear: '',
    inputStatsMonth: null,
    inputStatsDate: '',
    inputTime : {
        fromInputTime: '',
        fromInputDate: '',
        toInputTime: '',
        toInputDate: '',
    },
    inputs: {
        inputName: '',
        inputNumber: '',
        inputTime:  '',
        inputTimeEnd: '',
        inputNumberOfGuests: '',
        inputChildChair: '',
        inputMessage: '',
    },
    inputsEdit:{
        editIndex: '',
        editName: '',
        editNumber: '',
        editTime: '',
        editTimeEnd: '',
        editNumberOfGuests: '',
        editChildChair: '',
        editTable: '',
        editChair: '',
    },
    status: {},
    bookingTimes: [

        {
            table: 'a',
            chairCount: 4,
            extraTable: '',
            bookedInfo: {
                bookedName: 'Per Larsen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-04T13:20',
                bookedTimeEnd: '',
                bookedChild: false,
                bookedGuestCount: 5,
            }
        }
    ],
    expiredBookings: [
        
    ],
    stats: [],
    statsYear: [],
    statsMonth: [],
    searchResultCount: 0,
    archiveAmountOfRows: 10
};

let archive = [
    {
        table: 'a',
        chairCount: 4,
        extraTable: '',
        bookedInfo: {
            bookedName: 'Per Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-01T13:20',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    }
];

let searchResult = [];

let errors = [];
let animationSatus = false;
function randomDate(start, end) {
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    let dateString =  date.toISOString().substring(0, 16);

    return dateString;
}

let count = 0;

const num = 8;
async function randomData() {
    const randomName = await faker.name.findName();
    const randomD =  randomDate(new Date(2020, 0, 0), new Date());
    const randomNumber = getRandomInt(90000000, 99999999).toString();

    archive.push({
        table: randomChair(),
        chairCount: 4,
        extraTable: '', 
        bookedInfo: {
            bookedName: randomName,
            bookedNumber: randomNumber,
            bookedTime: randomD,
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    })
    


}

async function randomData2() {
    const randomName = await faker.name.findName();
    const randomD =  randomDate(new Date(2021, 0, 0), new Date(2021, 4, 0));
    const randomNumber = getRandomInt(90000000, 99999999).toString();

    model.bookingTimes.push({
        table: randomChair(),
        chairCount: 4,
        extraTable: '', 
        bookedInfo: {
            bookedName: randomName,
            bookedNumber: randomNumber,
            bookedTime: randomD,
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 4,
            bookedMessage: ''
        }
    })
    

}

while (count < 3000) {
    randomData();
    count++;
}
let count2 = 0; 

while(count2 < 50) {
    randomData2();
    count2++;
} 

function randomChair() {
    let letters = 'abcdefghjklmonpqrstuvw';
    return letters.charAt(Math.floor(Math.random() * 21) + 1)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// window.addEventListener('mousemove', function (e) {
//     yAxis = (window.innerHeight - e.clientY);
//     xAxis = (window.innerWidth - e.clientX);

//     document.getElementById('app').style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
// });


// getStatsFromMonth();
// getStatsFromYear();