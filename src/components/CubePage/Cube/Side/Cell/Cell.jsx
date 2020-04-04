import React from 'react';
import c from './Cell.module.css';

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.colorDict = {
            "y": c.yellow,
            "b": c.blue,
            "w": c.white,
            "g": c.green,
            "r": c.red,
            "o": c.orange
        };
    }

    render(){
        return (
            <div className = {`${this.colorDict[this.props.color]} ${c.cell}`}></div>
        );
    }
}

export default Cell;