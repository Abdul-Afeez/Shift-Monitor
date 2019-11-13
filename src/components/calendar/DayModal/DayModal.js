import React, { Component } from 'react';
import { DAY_OF_THE_WEEK } from '../../../constants';
import { monthsAbbr } from '../../../constants/months';
import { Ranger } from '../Ranger/Ranger';
import { DatePicker } from '../DatePicker/DatePicker';
import { MyContext } from '../../../App/App';
export class DayModal extends Component{
    // const [mp, md] = ['1990-9-09', '12344']
    theDate;
    dayFragment;

    updateComponentData = () => {
        const {w_start_date} = this.props.configDay;
        this.dayFragment = w_start_date && w_start_date.split('-');
        this.theDate = this.define(this.dayFragment && new Date(this.dayFragment[0], this.dayFragment[1], this.dayFragment[2]));
    }
    
    
    define(date) {
       return {
           name: date && ` ${DAY_OF_THE_WEEK[date.getDay()]} ${this.dayFragment[2] + this.pref( this.dayFragment[2])} of  ${monthsAbbr[date.getMonth()]} ${date.getFullYear()}`,
        }
     }

    pref(day) {
        const len = (day+='') && day.length; 
        let last_two_digits = +((len > 1 ? day[len - 2] + '': '') + day[len - 1]);
        const two_digit_length = (last_two_digits+='') && last_two_digits.length;
        switch(+(last_two_digits[two_digit_length - 1])) {
            case 1:
                return two_digit_length === 2 && last_two_digits[0] === '1' ? 'th' : 'st';
            case 2:
                return two_digit_length === 2 && last_two_digits[0] === '1' ? 'th' : 'nd';
            case 3:
                return two_digit_length === 2 && last_two_digits[0] === '1' ? 'th' : 'rd';
            default:
                return 'th';
        }
     }
     render = () => {
        this.updateComponentData();
        return (
            <MyContext.Consumer>
                  {(context) => <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.theDate.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <h3>Work Time</h3>
                          <div>
                                <div className="d-inline-block">
                                    <div>Start Date</div>
                                    <DatePicker date={context.configDay.w_start_date}  name={'w_start_date'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>     
                                <div className="d-inline-block">
                                    <div>Hours</div>
                                    <Ranger defaultValue={context.configDay.w_start_hours} min={'0'} max={'24'} fill={'0'} name={'w_start_hours'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>

                                <div className="d-inline-block pl-2">
                                    <div>Minutes</div>
                                    <Ranger defaultValue={context.configDay.w_start_minutes} min={'0'} max={'60'} fill={'0'}  name={'w_start_minutes'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>
                          </div>  

                          <div>
                                <div className="d-inline-block">
                                    <div>End Date</div>
                                    <DatePicker date={context.configDay.w_end_date} name={'w_end_date'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>     
                                <div className="d-inline-block">
                                    <div>Hours</div>
                                    <Ranger defaultValue={context.configDay.w_end_hours} min={'0'} max={'24'} fill={'0'} name={'w_end_hours'}  handleChange = {(event) => context.updateDayProperty(event)}/>
                                </div>

                                <div className="d-inline-block pl-2">
                                    <div>Minutes</div>
                                    <Ranger defaultValue={context.configDay.w_end_minutes} min={'0'} max={'60'} fill={'0'}  name={'w_end_minutes'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>
                          </div>  
                          
                         <h3>Free Time</h3>

                          {/* <div>
                                <div className="d-inline-block">
                                    <div>Start Date</div>
                                    <DatePicker date={context.configDay.f_start_date}  name={'f_start_date'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>     
                                <div className="d-inline-block">
                                    <div>Hours</div>
                                    <Ranger defaultValue={context.configDay.f_start_hours} min={'0'} max={'24'} fill={'0'} name={'f_start_hours'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>

                                <div className="d-inline-block pl-2">
                                    <div>Minutes</div>
                                    <Ranger defaultValue={context.configDay.f_start_minutes} min={'0'} max={'60'} fill={'0'}  name={'f_start_minutes'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>
                          </div>   */}

                          <div>
                                <div className="d-inline-block">
                                    <div>End Date</div>
                                    <DatePicker date={context.configDay.f_end_date} name={'f_end_date'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>     
                                <div className="d-inline-block">
                                    <div>Hours</div>
                                    <Ranger defaultValue={context.configDay.f_end_hours} min={'0'} max={'24'} fill={'0'} name={'f_end_hours'}  handleChange = {(event) => context.updateDayProperty(event)}/>
                                </div>

                                <div className="d-inline-block pl-2">
                                    <div>Minutes</div>
                                    <Ranger defaultValue={context.configDay.f_end_minutes} min={'0'} max={'60'} fill={'0'}  name={'f_end_minutes'} handleChange = {(event) => context.updateDayProperty(event)} />
                                </div>
                          </div>  
                          
               
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => context.handleDayConfig()} data-dismiss="modal">Automate</button>
                        </div>
                    </div>
                </div>
            </div>
                  }
               </MyContext.Consumer>
            
    )
  }
}