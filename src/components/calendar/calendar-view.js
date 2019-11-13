import React from 'react';
import {monthsAbbr} from '../../constants/months'
import './Calendar-view.css';
import picture from  '../../pic2.jpg';
import { DAY_OF_THE_WEEK_ABBR } from '../../constants';
import { MyContext } from '../../App/App';
class CalendarView extends  React.Component { 
  months = monthsAbbr;
      renderDays() {
        // console.log(this.props)
        const {lastMonthDays, monthDays, monthStartDayOfWeek,
              onChangeDate} = this.props;
        const extra = !!monthStartDayOfWeek ? monthStartDayOfWeek : 0;
        const start_at = lastMonthDays - (extra);
        const calendar = new Array(lastMonthDays * 1).fill('').map((e, i) => i + 1)
                          .concat(new Array(monthDays * 1).fill('').map((e, i) => i + 1))
                          .concat(new Array(7).fill('').map((e, i) => i + 1))
                          .slice(start_at, start_at + 35);
        return  calendar.map((data, i) => {
            if((i < monthStartDayOfWeek) || (i >= (monthDays + extra))) {
              return <div key={i} className="day-box text-center" >
                         <span>{data}</span>
                     </div>
            }
            const isSpecial  = this.isSpecialDay(data);
          return (
            <div  key={i} className={'day-box text-center '+ isSpecial[0]}>

           <button className="w-100" data-toggle="modal" data-target="#dayModal" onClick={() => {
             onChangeDate(this.props.getDate(data))
            }} >
              {/* {isSpecial[1] ? isSpecial[1].background: ''} */}
              {/* {isSpecial[0] ? <span><i className="icon-star-full"></i>&nbsp;</span>: null}  */}
              <span style={{color: '#D7754B '}}>{data}</span>
           </button>
           </div>
          )
        })
    }

    isSpecialDay(data) {
      const {currentMonth, currentYear, storeCurrentDay, storeCurrentMonth, storeCurrentYear} = this.props;
      const style = [];
      // console.log('today ==', (currentYear === storeCurrentYear) && (currentMonth === storeCurrentMonth) && (data === storeCurrentDay) ? 'today': '')
      style.push((currentYear === storeCurrentYear) && (currentMonth === storeCurrentMonth) && (data === storeCurrentDay) ? 'today': '');
      const marked = this.props.selectedDate.get(this.props.getDate(data))
      // console.log(marked)
      style.push(marked ? marked.background: '');   
      return [style.join(' ')];
    }
  
    renderControls = () => {
      if(!this.props.onPreviousMonth || !this.props.onNextMonth) {
        return
      }

       const {monthLabel, onPreviousMonth, onNextMonth, currentYear, currentMonth, getNext, getPrev} = this.props;
       const next_month = getNext(currentYear, currentMonth);
       const prev_month = getPrev(currentYear, currentMonth);
       return <div className="row no-margin calendar-month bg-white" >
                  <div className="col faded">
                    <button className="w-100"  color="black"  onClick={onPreviousMonth}>
                    <i className=" icon-calendar"></i> {this.months[prev_month.last_month]}
                    </button>  
                  </div>
                  <div className="col">
                     <div className="text-center"><i className=" icon-calendar"></i> <span>{`${monthLabel} ${currentYear}`}</span></div>
                  </div>
                  <div className="col faded">
                     <button className="w-100"  onClick={onNextMonth}> 
                     <i className=" icon-calendar"></i> {this.months[next_month.next_month]}
                     </button>
                  </div>
         </div> 
    }
    renderDaysOfTheWeek() {
      return DAY_OF_THE_WEEK_ABBR.map((day, i) => {
        return <div className="day-box text-center" key={i}>
                  <span className="text-capitalize">{day}</span>
               </div>
      })
    }
   render() { 
       return (<MyContext.Consumer>
                  {(context) => <div className=" mt-5">
                            {/* <NavBar></NavBar> */}
                            <div className="text-center mb-1">
                                <img className="" alt="uufu" style={{'maxWidth': '60px', 'borderRadius': '100%'}} src={picture} />
                             </div>
                            {this.renderControls()} 
                            <div  style={{'background': 'white'}}>
                                <div className="d-flex flex-wrap justify-content-center">
                                  {this.renderDaysOfTheWeek()}
                                  {this.renderDays()}
                                </div>
                            </div>
                            <div className="text-center mb-1">
                                <img className="" alt="uufu" style={{'maxWidth': '60px', 'borderRadius': '100%'}} src={picture} />
                             </div>
                           {/* {<DayModal handleDayConfig={(config) => context.handleDayConfig(config)} configDay = {context.configDay}></DayModal>} */}
                   </div>
                  }
               </MyContext.Consumer>
          ) 
      }
  }


 
export default CalendarView;