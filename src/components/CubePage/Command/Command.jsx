import React from 'react';
import c from './Command.module.css';
import { updateInputActionCreator, shuffleActionCreator, solveActionCreator, stepActionCreator, updateActionCreator } from '../../../redux/CubePageReducer';


class Command extends React.Component{
    
    onChangeInput = (e) => {
        let text = e.target.value;
        let action = updateInputActionCreator(text);
        this.props.dispatch(action);
    }

    onShuffleButtonClick = (e) =>{
        let action = shuffleActionCreator();
        this.props.dispatch(action);
    }

    onSolveButtonClick = (e) =>{
        let action = solveActionCreator();
        this.props.dispatch(action);
    }

    onStepButtonClick = (e) =>{
        let action = stepActionCreator();
        this.props.dispatch(action);
    }

    render(){
        return (
            <div className = {c.container}>
                <input onChange={this.onChangeInput} className={c.input} 
                        value = {this.props.state.commandsBar.inputState} 
                        type="text" placeholder="Формула смешивания"/>
                <button onClick={this.onShuffleButtonClick}
                        disabled={this.props.state.commandsBar.shuffleDisabled}
                        className={c.input}>Shuffle</button>
                <button onClick={this.onSolveButtonClick} 
                        disabled={this.props.state.commandsBar.disabledBtns.solve}
                        className={c.input}>Solve</button>
                <button onClick={this.onStepButtonClick}
                        disabled={this.props.state.commandsBar.disabledBtns.step}
                        className={c.input}>Step</button>
                <div >
                    {this.props.state.commandsBar.solve.map((step, index) =>{
                        {
                            if (index == this.props.state.commandsBar.activeStep)
                                return <span className={`${c.output} ${c.active}`} key={index}>{step}</span>  
                            else
                                return <span className={c.output} key={index}>{step}</span> 
                        }  
                    })}
                </div>
            </div>
        );
    }
}

export default Command;