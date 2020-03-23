import React from 'react';
import c from './Command.module.css';


const Command = (props) =>{
    return (
        <div className = {c.container}>
            <input onChange={props.state.callbacks.onChangeInput} className={c.input} type="text" placeholder="Формула смешивания"/>
            <button onClick={props.state.callbacks.onShuffleButtonClick} className={c.input}>Shuffle</button>
            <button onClick={props.state.callbacks.onSolveButtonClick} className={c.input}>Solve</button>
            <button onClick={props.state.callbacks.onStepButtonClick} disabled={props.state.stepBtn} className={c.input}>Step</button>
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