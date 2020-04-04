import React from 'react';
import Cube from './CubePage/Cube/Cube';
import Command from './CubePage/Command/Command';

import {connect} from "react-redux";
import CubePage from './CubePage';


class CubePageContainer extends React.Component{
    render(){
        return (
            <CubePage data={this.props.}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sides: state.cubeReducer.cube.sides,
        commandsBar: state.cubeReducer.commandsBar
    }
}


export default connect(mapStateToProps)(CubePageContainer);