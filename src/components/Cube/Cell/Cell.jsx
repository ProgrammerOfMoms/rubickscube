import React from 'react';
import c from './Cell.module.css';


const Cell = (props) =>{

    let colorDict = {
        "y": c.yellow,
        "b": c.blue,
        "w": c.white,
        "g": c.green,
        "r": c.red,
        "o": c.orange
    }

    return (
        <div className = {`${colorDict[props.color]} ${c.cell}`}></div>
    );
}

export default Cell;