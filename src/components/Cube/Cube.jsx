import React from 'react';
import c from './Cube.module.css';
import Side from './Side/Side';

const Cube = (props) =>{
    console.log(props)
    return (
        <div className = {c.container}>
           {props.state.sides.map((side, index) => {
               return <Side state={side} key={index}/>
           })}
        </div>
    );
}

export default Cube;