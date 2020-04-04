import React from 'react';
import c from './Cube.module.css';
import Side from './Side/Side';


class Cube extends React.Component{
    render(){
        return (
            <div className = {c.container}>
               {this.props.cube.sides.map((side, index) => {
                   return <Side name={side.name}
                                cells={side.cells}
                                key={index}/>
               })}
            </div>
        );
    }
}

export default Cube;