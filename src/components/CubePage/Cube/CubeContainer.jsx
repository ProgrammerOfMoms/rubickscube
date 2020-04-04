import React from 'react';
import {connect} from "react-redux";
import Cube from "../Cube/Cube";
import { shuffle, solve, step, updateInputSuccess } from '../../../redux/reducers/CubePageReducer';


class CubeContainer extends React.Component{
    render(){
        debugger;
        return <Cube {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        cube: state.cubePageReducer.cube,
        inputState: state.cubePageReducer.commandsBar.inputState,
        solve_path: state.cubePageReducer.commandsBar.solve_path,
        activeStep: state.cubePageReducer.commandsBar.activeStep,
        stepBtn: state.cubePageReducer.commandsBar.stepBtn,
        disabledBtns: state.cubePageReducer.commandsBar.disabledBtns
    }
}

const mapDispatchToProps = {
    shuffle,
    solve,
    step,
    updateInputSuccess,
}
export default connect(mapStateToProps, mapDispatchToProps)(CubeContainer);

