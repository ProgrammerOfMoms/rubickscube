import React from 'react';
import CommandsContainer from './CommandsBar/CommandsContainer';
import CubeContainer from './Cube/CubeContainer';

class CubePage extends React.Component{

    onShuffleBtnClick = () => {
        this.props.shuffle(this.props.commandsBar.inputState, this.props.cube);
    }

    onSolveBtnClick = () => {
        this.props.solve(this.props.cube);
    }

    onStepBtnClick = () => {
        this.props.step(this.props.commandsBar.activeStep,
                        this.props.cube,
                        this.props.commandsBar.solve);
    }
    render() {
        return (
            <>
                <CubeContainer cube={this.props.reducer.cube}/>
                <CommandsContainer commandsBar={this.props.reducer.commandsBar}
                                   onShuffleBtnClick = {this.onShuffleBtnClick}
                                   onSolveBtnClick = {this.onSolveBtnClick}
                                   onStepBtnClick = {this.onStepBtnClick}/>
            </>
        )
    }
}

export default CubePage