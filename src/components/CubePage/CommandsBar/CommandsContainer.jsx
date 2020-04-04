import React from "react";
import {connect} from "react-redux";
import CommandsBar from "./CommandsBar";

import { shuffle, updateInputSuccess } from '../../../redux/reducers/CubePageReducer';

class CommandsContainer extends React.Component{

    componentDidUpdate() {
        console.log(this.props.disabledBtns);
    }
    render(){
        return (
            <CommandsBar {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputState: state.cubePageReducer.commandsBar.inputState,
        solve: state.cubePageReducer.commandsBar.solve,
        activeStep: state.cubePageReducer.commandsBar.activeStep,
        stepBtn: state.cubePageReducer.commandsBar.stepBtn,
        disabledBtns: state.cubePageReducer.commandsBar.disabledBtns
    }
}

const mapDispatchToProps = {
        shuffle,
        updateInputSuccess,
}
export default connect(mapStateToProps, mapDispatchToProps)(CommandsContainer);

