import React from 'react';
import c from './Side.module.css';
import Cell from './Cell/Cell';

class Side extends React.Component{  
    constructor(props){
        super(props);
        this.props = props;
        this.sideClass = {
            "top": c.top,
            "left": c.left,
            "front": c.front,
            "right": c.right,
            "back": c.back,
            "bottom": c.bottom
        };
    }
    render(){
        return (
            <div className = {`${c.container} ${this.sideClass[this.props.name]}`}>
              {this.props.cells.map((value, index) => {
                  return <Cell color={value} key={index}/>
                })}
            </div>
        );
    }
}
export default Side;