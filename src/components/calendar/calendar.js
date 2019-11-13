import React from 'react';
import CalendarView from './calendar-view';
import {MyContext} from '../../App/App';
class Calendar extends React.Component {

    handleNextMonth = () => {
      const{currentYear, currentMonth} = this.props.calendar;
      const {next_month, next_year} = this.props.getNext(currentYear, currentMonth);
      this.props.setCalenderTime({year: next_year, month: next_month, day: 1})
    }
    handlePreviousMonth = () => {
      const{currentYear, currentMonth} = this.props.calendar;
      const {last_month, last_year} = this.props.getPrev(currentYear, currentMonth);
      this.props.setCalenderTime({year: last_year, month: last_month, day: 1})
    }
    getDate = (date) =>  `${this.props.calendar.currentYear}-${this.props.calendar.currentMonth}-${date}`; 
    render = () => {
      const {monthLabel, monthStartDayOfWeek, monthDays, lastMonthDays, 
              currentYear, currentMonth, currentDay, storeCurrentMonth,
              storeCurrentDay,storeCurrentYear} = this.props.calendar;
      const{handlePreviousMonth, handleNextMonth} = this;     
      return <MyContext.Consumer>
           { (context) => <div style={{height: 308, width: '100%'}}>
                          <CalendarView
                                monthLabel = {monthLabel}
                                monthStartDayOfWeek ={monthStartDayOfWeek}
                                monthDays= {monthDays}
                                lastMonthDays= {lastMonthDays}
                                currentYear= {currentYear}
                                currentMonth= {currentMonth}
                                currentDay= {currentDay}
                                storeCurrentMonth= {storeCurrentMonth}
                                storeCurrentDay= {storeCurrentDay}
                                storeCurrentYear= {storeCurrentYear}
                                onPreviousMonth = {handlePreviousMonth}
                                onNextMonth = {handleNextMonth}
                                getDate = {this.getDate}
                                getNext = {context.getNext}
                                getPrev = {context.getPrev}
                                onPickTime = {this.pickTime}
                                selectedDate = {context.selectedDate}
                                onChangeDate = {context.handleChangeDate}
                      />
                    </div>
          }
        </MyContext.Consumer>
    }
}
 
export default Calendar;