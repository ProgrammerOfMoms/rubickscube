import React from 'react';
import c from './Side.module.css';
import Cell from '../Cell/Cell';

const Side = (props) =>{

    let sideClass = {
        "top": c.top,
        "left": c.left,
        "front": c.front,
        "right": c.right,
        "back": c.back,
        "bottom": c.bottom
    }


    return (
        <div className = {`${c.container} ${sideClass[props.state.name]}`}>
          {props.state.cells.map((value, index) => {
              return <Cell color={value} key={index}/>
            })}
        </div>
    );
}
export default Side;