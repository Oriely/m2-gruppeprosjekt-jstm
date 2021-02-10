const model = {
    app: {
        selectedTable: '',
        selectedDate: '',
        currentPage: '',

    },
    tables: {
        fits4: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        fits6: ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        allTables: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
    },

    inputStatsDate: '',
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
            bookedInfo: {
                bookedName: 'Per Larsen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-04T13:20',
                bookedTimeEnd: '',
                bookedChild: false,
                bookedGuestCount: 5,
            }
        },

        {
            table: 't',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Pål Larsen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-05T10:07',
                bookedTimeEnd: '',
                bookedChild: false,
                bookedGuestCount: 5,
            }
        },
        {
            table: 'g',
            chairCount: 4,
            bookedInfo: {
                bookedName: 'Stig Larsen',
                bookedNumber: '96127639',
                bookedTime: '2021-02-06T17:10',
                bookedTimeEnd: '',
                bookedChild: true,
                bookedGuestCount: 4,
            }
        },
        {
            table: 's',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Espen Askeladden',
                bookedNumber: '98126143',
                bookedTime: '2021-02-04T17:30',
                bookedTimeEnd: '2021-02-04T20:30',
                bookedChild: true,
                bookedGuestCount: 6,
            }
        },
        {
            table: 's',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Martin Pettersen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-05T14:30',
                bookedTimeEnd: '2021-02-05T17:30',
                bookedChild: true,
                bookedGuestCount: 6,
            }
        },
        {
            table: 's',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Håvard Gundersen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-06T15:00',
                bookedTimeEnd: '2021-02-06T18:00',
                bookedChild: true,
                bookedGuestCount: 6,
            }
        },
        {
            table: 'r',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Marte Kåsa',
                bookedNumber: '98126143',
                bookedTime: '2021-02-07T16:00',
                bookedTimeEnd: '',
                bookedChild: true,
                bookedGuestCount: 5
            }
        },
        {
            table: 'q',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Sondre Hem',
                bookedNumber: '98126143',
                bookedTime: '2021-02-04T17:30',
                bookedTimeEnd: '2021-02-04T19:30',
                bookedChild: true,
                bookedGuestCount: 6,
            }
        },
        {
            table: 'j',
            chairCount: 4,
            bookedInfo: {
                bookedName: 'Karl',
                bookedNumber: '37423865',
                bookedTime: '2021-02-05T18:50',
                bookedTimeEnd: '',
                bookedChild: true,
                bookedGuestCount: 3,
            }
        },

    ],
    expiredBookings: [
        
    ],
    stats: []
};

const archive = [

    {
        table: 'a',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Per Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T13:20',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },

    {
        table: 't',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Pål Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T10:07',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },
    {
        table: 'g',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Stig Larsen',
            bookedNumber: '96127639',
            bookedTime: '2021-04-06T17:10',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 4,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-04-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Martin Pettersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T14:30',
            bookedTimeEnd: '2021-02-05T17:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Håvard Gundersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-06T15:00',
            bookedTimeEnd: '2021-02-06T18:00',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'r',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Marte Kåsa',
            bookedNumber: '98126143',
            bookedTime: '2021-12-07T16:00',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 5
        }
    },
    {
        table: 'q',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Sondre Hem',
            bookedNumber: '98126143',
            bookedTime: '2021-11-04T17:30',
            bookedTimeEnd: '2021-02-04T19:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'j',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Karl',
            bookedNumber: '37423865',
            bookedTime: '2021-10-04T18:50',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 3,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-09-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-08-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-07-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'a',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Per Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T13:20',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },

    {
        table: 't',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Pål Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T10:07',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },
    {
        table: 'g',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Stig Larsen',
            bookedNumber: '96127639',
            bookedTime: '2021-04-06T17:10',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 4,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-04-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Martin Pettersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T14:30',
            bookedTimeEnd: '2021-02-05T17:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Håvard Gundersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-06T15:00',
            bookedTimeEnd: '2021-02-06T18:00',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'r',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Marte Kåsa',
            bookedNumber: '98126143',
            bookedTime: '2021-12-07T16:00',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 5
        }
    },
    {
        table: 'q',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Sondre Hem',
            bookedNumber: '98126143',
            bookedTime: '2021-11-04T17:30',
            bookedTimeEnd: '2021-02-04T19:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'j',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Karl',
            bookedNumber: '37423865',
            bookedTime: '2021-10-04T18:50',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 3,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-09-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-08-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-07-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    
    {
        table: 'a',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Per Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T13:20',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },

    {
        table: 't',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Pål Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T10:07',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },
    {
        table: 'g',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Stig Larsen',
            bookedNumber: '96127639',
            bookedTime: '2021-04-06T17:10',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 4,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-04-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Martin Pettersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T14:30',
            bookedTimeEnd: '2021-02-05T17:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Håvard Gundersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-06T15:00',
            bookedTimeEnd: '2021-02-06T18:00',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'r',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Marte Kåsa',
            bookedNumber: '98126143',
            bookedTime: '2021-12-07T16:00',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 5
        }
    },
    {
        table: 'q',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Sondre Hem',
            bookedNumber: '98126143',
            bookedTime: '2021-11-04T17:30',
            bookedTimeEnd: '2021-02-04T19:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'j',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Karl',
            bookedNumber: '37423865',
            bookedTime: '2021-10-04T18:50',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 3,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-09-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-08-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-07-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'a',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Per Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T13:20',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },

    {
        table: 't',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Pål Larsen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T10:07',
            bookedTimeEnd: '',
            bookedChild: false,
            bookedGuestCount: 5,
        }
    },
    {
        table: 'g',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Stig Larsen',
            bookedNumber: '96127639',
            bookedTime: '2021-04-06T17:10',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 4,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-04-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Martin Pettersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-05T14:30',
            bookedTimeEnd: '2021-02-05T17:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Håvard Gundersen',
            bookedNumber: '98126143',
            bookedTime: '2021-02-06T15:00',
            bookedTimeEnd: '2021-02-06T18:00',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'r',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Marte Kåsa',
            bookedNumber: '98126143',
            bookedTime: '2021-12-07T16:00',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 5
        }
    },
    {
        table: 'q',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Sondre Hem',
            bookedNumber: '98126143',
            bookedTime: '2021-11-04T17:30',
            bookedTimeEnd: '2021-02-04T19:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 'j',
        chairCount: 4,
        bookedInfo: {
            bookedName: 'Karl',
            bookedNumber: '37423865',
            bookedTime: '2021-10-04T18:50',
            bookedTimeEnd: '',
            bookedChild: true,
            bookedGuestCount: 3,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-09-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-08-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-07-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
    {
        table: 's',
        chairCount: 6,
        bookedInfo: {
            bookedName: 'Espen Askeladden',
            bookedNumber: '98126143',
            bookedTime: '2021-05-04T17:30',
            bookedTimeEnd: '2021-02-04T20:30',
            bookedChild: true,
            bookedGuestCount: 6,
        }
    },
];

let errors = [];
let animationSatus = false;