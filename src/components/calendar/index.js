import React from 'react';
import './style.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const today = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.state = {
            dayList: ['Sun', 'Mon', 'Tue',
                'Wed', 'Thu', 'Fri', 'Sat'],
            monthList: ['Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today, month, year
        }
        this.renderWeekHead = this.renderWeekHead.bind(this);
        this.renderWeeks = this.renderWeeks.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.renderCaption = this.renderCaption.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.prevClick = this.prevClick.bind(this);
    }
    getDaysInMonth() {
        const { month, year } = this.state;
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }


    render() {
        return (<div className='cal'>
            <table>
                {this.renderCaption()}
                <tbody>
                    {this.renderWeekHead()}
                    {this.renderWeeks()}
                </tbody>
            </table>

        </div>);
    }
    renderWeekHead() {
        return <tr>{this.state.dayList.map((day) => <th key={day}>{day}</th>)}</tr>;
    }
    prevClick() {
        let { month, year } = this.state;
        if (month == 0) {
            month = 11;
            year = year - 1;
        } else {
            month = month - 1;
        }
        this.setState({ month, year })
    }
    nextClick() {
        let { month, year } = this.state;
        if (month == 11) {
            month = 0;
            year = year + 1;
        } else {
            month = month + 1;
        }
        this.setState({ month, year })
    }
    renderCaption() {
        const { month, monthList, year } = this.state;
        return (
            <caption>
                <div className='cal-head'>
                    <div onClick={this.prevClick} className='arrow-left'></div>
                    {monthList[month] + '  ' + year}
                    <div onClick={this.nextClick} className='arrow-right'></div>
                </div>
            </caption>
        );
    }
    renderWeeks() {
        const { month, year } = this.state;
        let date = new Date(year, month, 1);
        let rows = [];
        let week = [];
        while (date.getMonth() === month) {
            let curr = new Date(date);
            week = this.pushDay(curr, week, curr.getDate() === 1)
            if (week.length === 7) {
                rows.push(<Week days={week} />);
                week = [];
            }
            date.setDate(date.getDate() + 1);
        }
        rows.push(<Week days={week} />);
        return rows;

    }

    pushDay(day, week, firstDay) {
        week = week || [];
        if (firstDay) {
            week = this.pushEmpty(week, day.getDay())
        }
        week[day.getDay()] = day;
        return week;
    }
    pushEmpty(week, start) {
        while (start > -1) {
            week[start] = null;
            start--;
        }
        return week;
    }
}
class Week extends React.Component {
    render() {
        return <tr>
            {this.props.days &&
                this.props.days.map(
                    (day) => day ? (<td key={day.getDate()}>{day.getDate()}</td>) : <td>  </td>
                )
            }
        </tr>
    }

}
export default Calendar;