import React from 'react';
import c from './Command.module.css';


const Command = (props) =>{
    return (
        <div className = {c.container}>
            <input onChange={props.onChangeInput} className={c.input} value = {props.state.inputState} type="text" placeholder="Формула смешивания"/>
            <button onClick={props.onShuffleButtonClick} disabled={props.state.disabledBtns.shuffle} className={c.input}>Shuffle</button>
            <button onClick={props.onSolveButtonClick} disabled={props.state.disabledBtns.solve} className={c.input}>Solve</button>
            <button onClick={props.onStepButtonClick} disabled={props.state.disabledBtns.step} className={c.input}>Step</button>
            <div >
                {props.state.solve.map((step, index) =>{
                    {
                        if (index == props.state.activeStep)
                            return <span className={`${c.output} ${c.active}`} key={index}>{step}</span>  
                        else
                            return <span className={c.output} key={index}>{step}</span> 
                    }  
                })}
            </div>
        </div>
    );
}

export default Command;