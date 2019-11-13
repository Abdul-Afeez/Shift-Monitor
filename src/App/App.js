import React, {Component} from 'react';
import { Splash } from '../components/Splash/Splash';
import './App.css';
import Calendar from '../components/calendar/calendar';
import {monthsAbbr} from '../constants/months'

export const MyContext = new React.createContext({})
class App extends Component {
  month =  monthsAbbr
  isNextSensor = false;
  hasSelectedDate = false;

  state = {
    loading: true,
    selectedDate: new Map(),
    configDay: {},
    visitedMonths: new Map(),
    lastMonthWorkingStatus: null,
    handleChangeDate: (date) => this.handleChangeDate(date),
    calendar: {
      monthLabel: null,
      monthStartDayOfWeek: null,
      monthDays: null,
      lastMonthDays: null,
      currentYear: null,
      currentMonth: null,
      currentDay: null,
      storeCurrentMonth: null,
      storeCurrentDay: null,
      storeCurrentYear: null,
      selectedDate: new Map()
     },
     getNext: (a, b) =>  this.getNext(a, b),
     getPrev: (a, b) => this.getPrev(a, b)
  }
  persistState = (state) => {
    // const {selectedDate, visitedMonths, lastMonthWorkingStatus} = state;
    // const stateData = {selectedDate: selectedDate || new Map(), visitedMonths: visitedMonths || new Map(), lastMonthWorkingStatus:lastMonthWorkingStatus}
    // console.log('saving', stateData)
    // window.localStorage.setItem('state', JSON.stringify(stateData));
  }
  retrieveState = () => {
    // console.log('retrieval',JSON.parse(window.localStorage.getItem('state')))
    // return JSON.parse(window.localStorage.getItem('state')) || {};
  }
 
  getLastMonthDays = (current_year, current_month) => {
    const {last_month, last_year} = this.getPrev(current_year, current_month);
    return this.getNumberOfDays(last_year, last_month);
  }
  getNumberOfDays = (year, month) => {
    return 32 - new Date(year, month, 32).getDate();  
  }
  getPrev = (current_year, current_month) => {
    this.isNextSensor = false;
    let last_month, last_year;
    if(current_month > 0){
      last_month = current_month - 1;
      last_year = current_year;
    }
    else {
      last_month = 11;
      last_year = current_year - 1;
    }
    return {last_month: last_month, last_year: last_year}
  }
  getNext = (current_year, current_month) => {
    this.isNextSensor = true;
    let next_month, next_year;
    if(current_month === 11){
      next_month = 0;
      next_year = current_year + 1;
    }
    else {
      next_month = current_month + 1;
      next_year = current_year;
    }
    return {next_month: next_month, next_year: next_year}
  }
  setCalenderTime = (full_date) => {
    // console.log(this.state)
    // {year: last_year, month: last_month, day: 1
    if(full_date && this.isNextSensor && this.hasSelectedDate) {
      const first_date = `${full_date.year}-${full_date.month}-1`;
      let {selectedDate, visitedMonths, lastMonthWorkingStatus} = this.state;

      // console.log(full_date, {date: first_date, selectedDate: selectedDate, visitedMonths: visitedMonths, lastMonthWorkingStatus: lastMonthWorkingStatus})
    this.paintMonthDaysForBatoro(
      {date: first_date, selectedDate: selectedDate, visitedMonths: visitedMonths, lastMonthWorkingStatus: lastMonthWorkingStatus}
    );
    }
    let date, year, month, day, store;
    if(typeof full_date === 'object') {
       year = full_date.year;
       month = full_date.month;
       day = full_date.day;
       date = new Date(year, month, day);
       store = {};
    } else{
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
      store = {storeCurrentYear: year, storeCurrentMonth: month, storeCurrentDay: day}
    }
   
    const m = this.month[date.getMonth()];

    const month_days = this.getNumberOfDays(year, month);
    const month_start_day_of_week = new Date(year, month, 1).getDay();
    const last_month_days = this.getLastMonthDays(year, month);
    const rawState = {...this.state , calendar: {
      monthLabel: m,
      monthDays: month_days,
      monthStartDayOfWeek: month_start_day_of_week,
      lastMonthDays: last_month_days,
      currentYear: year,
      currentMonth: month,
      currentDay: day,
      ...store
    }};
    this.persistState(rawState);
    this.setState(rawState)
  }

  handleChangeDate = (date) => {  //When you click the date
    this.hasSelectedDate = true;
    let {selectedDate, visitedMonths, lastMonthWorkingStatus} = this.state;
    selectedDate = new Map();
    lastMonthWorkingStatus = null;
    visitedMonths = new Map();
    this.paintMonthDaysForBatoro(
      {date: date, selectedDate: selectedDate, visitedMonths: visitedMonths, lastMonthWorkingStatus: lastMonthWorkingStatus}
    );

  }
  paintMonthDaysForBatoro = ({date, selectedDate, visitedMonths, lastMonthWorkingStatus}) => {
    const [year, month, day] = date.split('-');
    const monthDays = this.getNumberOfDays(year, month);
    // console.log('lastWorking = '+ lastMonthWorkingStatus)

    const monthIdentifier = `${year}-${month}`;
    if(visitedMonths.get(monthIdentifier)) {
      return {selectedDate: selectedDate, visitedMonths: visitedMonths, lastMonthWorkingStatus: lastMonthWorkingStatus}
    }
    let indicator = lastMonthWorkingStatus && lastMonthWorkingStatus !== 3 ? lastMonthWorkingStatus + 1 : 1;
    // alert('indicator = '+ indicator + ' workdays = ' + monthDays)
    visitedMonths.set(monthIdentifier, true);
    function getDate(day) {
      return `${monthIdentifier}-${day}`;
    }
    for(let i = day; i <= monthDays; i++) {
        switch(indicator) {
          case 1:
            indicator++;
            // console.log(`${i} = full`)

            if(i === monthDays) {
              // console.log(i + 'case 1')

              lastMonthWorkingStatus = 1;
            }
            selectedDate.set(getDate(i), {background: 'red', type: 'full'});
            break;
          case 2:
              indicator++;
              // console.log(`${i} = mid`)

              if(i === monthDays) {
                // console.log(i + 'case 2')

                lastMonthWorkingStatus = 2;
              }
            selectedDate.set(getDate(i), {background: 'yellow', type: 'mid'});
            break;
          case 3:
              indicator = 1;
              // console.log(`${i} = free`)
              if(i === monthDays) {
                // console.log(i + 'case 3')
                lastMonthWorkingStatus = 3;
              }
            selectedDate.set(getDate(i), {background: 'green', type: 'free'});
            break;
          default:
            break;
        }
    }
    // console.log('sending lastMonthWorkingStatus to state = ' + lastMonthWorkingStatus)
    const rawState = {selectedDate: selectedDate, visitedMonths: visitedMonths, lastMonthWorkingStatus: lastMonthWorkingStatus}
   setTimeout(() => {
    this.persistState(rawState);
    this.setState(rawState)
   }, 0)
  }

  componentDidMount() {
    this.setCalenderTime(false)
    setTimeout(() => {
      const rawState = {...this.state , loading: false}
      this.persistState(rawState);
      this.setState({...rawState});
    }, 10000)
git
    // setTimeout(() => {
    //   this.setState({...this.state, ...this.retrieveState()});
    // }, 0)
  }
  render () {
    return (
      <MyContext.Provider value={this.state}>
            <div  className="no-padding  body border">
                <div className="w-100">
                  <div className="col-md-3 mx-auto no-padding">
                      {this.state.loading ? <Splash></Splash>:  <Calendar 
                      handleChangeDate ={this.handleChangeDate}
                      selectedDate={this.state.selectedDate}
                      calendar = {this.state.calendar}
                      getNext = {this.getNext}
                      getPrev = {this.getPrev}
                      setCalenderTime = {(date) => this.setCalenderTime(date)}
                      />
                      }
                  </div>
                </div>
            </div>
      </MyContext.Provider>
    );
  } 
}

export default App;