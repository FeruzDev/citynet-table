import react, {Component} from 'react'


class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.date = new Date();
        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.days = [
            "sunday",
            "monday",
            "tuesday",
            "wednesdey",
            "thursday",
            "friday",
            "saturday"
        ]; // Should add keys for each item
        this.listWeekDays = this.days.map(day => (
            <li key={day}> {day.slice(0, 2)}</li>
        )); // su mo tu we th fr sa
        this.state = {
            month: this.date.getMonth(),
            year: this.date.getFullYear(),
            monthDays: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31
            ]
        };

        this.month = () => this.getMonth(this.state.month);

        this.year = () => this.getYear(this.state.year);

        // ***************** days of month
        this.monthDays = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31
        ];

        /* ******************* EventHandling Binding *****************    */
        this.getNext = this.getNext.bind(this);
        this.getPrevious = this.getPrevious.bind(this);
        /* ***********************************************************    */
    }

    getPrevious() {
        if (this.state.month >= 1) {
            this.setState(prevState => ({ month: prevState.month - 1 }));
        } else {
            this.setState(prevState => ({ month: 11 }));
            this.setState(prevState => ({ year: prevState.year - 1 }));
        }
    }

    getNext() {
        if (this.state.month < 11) {
            this.setState(prevState => ({ month: prevState.month + 1 }));
        } else {
            this.setState(prevState => ({ month: 0 }));
            this.setState(prevState => ({ year: prevState.year + 1 }));
        }
    }

    getWeekDays() {
        return <li>{this.listWeekDays}</li>;
    }

    getFirstDay() {
        // console.log(typeof(this.month()));
        // 		console.log(typeof(this.year()));
        const year = this.year().toString();
        const month = this.state.month;
        const firstDay = new Date(year, month, "01");
        return firstDay.getDay();
    }

    getMonth(month) {
        switch (month) {
            case 0:
                return this.months[0];
            case 1:
                return this.months[1];
            case 2:
                return this.months[2];
            case 3:
                return this.months[3];
            case 4:
                return this.months[4];
            case 5:
                return this.months[5];
            case 6:
                return this.months[6];
            case 7:
                return this.months[7];
            case 8:
                return this.months[8];
            case 9:
                return this.months[9];
            case 10:
                return this.months[10];
            case 11:
                return this.months[11];
        }
    }

    getYear(year) {
        return year;
    }

    displayDays = (days, month, year, firstDay) => {
        let tr = document.createElement("tr");
        let td;
        let table = document.createElement("table");
        let body = document.getElementsByTagName("body")[0];
        let i = 0;
        let textNode;

        const emptyTds = () => {
            for (let j = 0; j < firstDay; j++) {
                days.unshift("");
            }
            return days;
        };
        const checkMonthDays = () => {
            if (month === 3 || month === 5 || month === 8 || month === 10) {
                days = days.splice(0, 30);
            } else if (month === 1) {
                // Check if leap year or not
                if (year % 4 === 0) {
                    if (year % 100 === 0) {
                        if (year % 400 === 0) {
                            days = days.splice(0, 29);
                        } else days = days.splice(0, 28);
                    } else days = days.splice(0, 29);
                } else days = days.splice(0, 28);
            }
            return days;
        };
        const displayDaysTable = () => {
            days.forEach(day => {
                i++;
                td = document.createElement("td");
                textNode = document.createTextNode(day);

                td.appendChild(textNode);
                tr.appendChild(td);
                if (i % 7 === 0) {
                    tr = document.createElement("tr");
                }
                table.appendChild(tr);
                body.appendChild(table);
            });
        };

        checkMonthDays();
        emptyTds();
        displayDaysTable();
    };

    render() {
        return (
            <div>
                <div className="ympicker-container">
                    <div>
                        <input
                            type="button"
                            className="month-button"
                            value="<"
                            onClick={this.getPrevious}
                        />
                    </div>
                    <div className="monthyear-container">
                        {this.month()} {this.year()}
                    </div>
                    <div>
                        <input
                            type="button"
                            className="month-button"
                            value=">"
                            onClick={this.getNext}
                        />
                    </div>
                </div>
                <div className="week-days-container">
                    <ul className="days-ul"> {this.listWeekDays} </ul>
                </div>
                <div>
                    {this.getFirstDay()} //this is the first weekday of the month
                </div>
                <div>
                    {
                        this.displayDays(
                        this.monthDays,
                        this.state.month,
                        this.state.year,
                        this.firstDay
                    )
                    }
                </div>
            </div>
        );
    }
}

const DaysTable = () => {
    return <div />;
};

 export default DatePicker;