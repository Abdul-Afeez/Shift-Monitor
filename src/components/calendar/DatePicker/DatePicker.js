import React from 'react';
import { pad } from '../../../hoc/Pad/Pad';
export function DatePicker({date, handleChange, min, max, name, disabled}) {
    console.log(parse(date));
    const date_splitted = parse(date)
    function parse(date, increment = true){
       return (date || (date = '0000-00-00')) && date.split('-').map((elem, i) => {
           console.log(date)
            if(i === 1) {
               if(increment) {
                elem = elem * 1 + 1;
               }
               else{
                elem = elem * 1 - 1;
               }
            }
            return pad(2, 0, elem+'')
        } ).join('-');
    }
    return (
        <div className="d-inline-block">
            <input onChange={(event) => {
                 event.target.value = parse(event.target.value, false);
                //  console.log(event.target.value)
                  handleChange(event)
            }} className="" name={name} type='date' value={date_splitted} disabled={disabled}/>
        </div>
    )
}
DatePicker.defaultProps = {
    date: '0',
    min: '0',
    max: '0',
    name: 'name',
    disabled: false,
    handleChange: () => {}
}