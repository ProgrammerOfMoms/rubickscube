import React from 'react';
import {connect} from "react-redux";
import Cube from "./Cube";


class CubeContainer extends React.Component{
    render(){
        return <Cube {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        sides: state.cubePageReducer.cube.sides
    }
}
export default connect(mapStateToProps)(CubeContainer);

