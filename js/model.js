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
    inputs: {
        inputName: '',
        inputNumber: '',
        inputTime: '',
        inputTimeEnd: '',
        inputNumberOfGuests: '',
        inputChildChair: '',
    },
    status: {},
    bookingTimes: [

        {
            table: 'a',
            chairCount: 4,
            bookedInfo: {
                bookedName: 'Per Larsen',
                bookedNumber: '98126143',
                bookedTime: '2021-01-28T13:20:19.567Z',
                bookedTimeEnd: '',
                bookedChild: false,
                bookedGuestCount: 5,
            }
        },

        {
            table: 't',
            chairCount: 6,
            bookedInfo: {
                bookedName: 'Per Larsen',
                bookedNumber: '98126143',
                bookedTime: '2021-02-27T10:07:19.567Z',
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
                bookedTime: '2021-02-16T17:10:00.000Z',
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
                bookedTime: '2021-02-16T17:30:00.000Z',
                bookedTimeEnd: '2021-02-16T20:30:00.000Z',
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
                bookedTime: '2021-02-16T17:30:00.000Z',
                bookedTimeEnd: '2021-02-16T20:30:00.000Z',
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
                bookedTime: '2021-02-15T16:00:00.000Z',
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
                bookedTime: '2021-02-16T17:30:00.000Z',
                bookedTimeEnd: '2021-02-16T19:30:00.000Z',
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
                bookedTime: '2021-02-17T18:50:00.000Z',
                bookedTimeEnd: '',
                bookedChild: true,
                bookedGuestCount: 3,
            }
        },

    ]
};
