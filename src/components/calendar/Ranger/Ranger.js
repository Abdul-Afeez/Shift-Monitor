import React from 'react';
import { pad } from '../../../hoc/Pad/Pad';
export function Ranger({min, max, fill, name, handleChange, defaultValue }) {

    return (
        <div>
            <select value={defaultValue === null ? 0: defaultValue} onChange={(event) => handleChange(event)} name={name}>
                {new Array(max - min).fill(0).map((elem, i) => {
                    return <option key={i} value={i} >{pad(2, fill, i+'')}</option>
                })}
            </select>
        </div>
    )
}
Ranger.defaultProps = {
    min: '0',
    fill: '0',
    max: '0',
    name: 'name',
    defaultValue: '0',
    handleChange: () => {}
}
