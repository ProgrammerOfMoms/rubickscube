import React from 'react';
import c from './Cube.module.css';
import Side from './Side/Side';


const Cube = (props) => {

    const onInputChange = (e) => {
        props.updateInputSuccess(e.target.value);
    }

    const onShuffleBtnClick = () => {
        props.shuffle(props.inputState, props.cube);
    }

    const onSolveBtnClick = () => {
        props.solve(props.cube);
    }

    const onStepBtnClick = () => {
        props.step(props.activeStep,
                   props.cube,
                   props.solve_path);
    }



    return (
        <>
            <div className = {c.cubeContainer}>
                {props.cube.sides.map((side, index) => {
                    return <Side name={side.name}
                                    cells={side.cells}
                                    key={index}/>
                })}
            </div>
            <div className = {c.commandContainer}>
                <input onChange={onInputChange} className={c.input} 
                        value = {props.inputState} 
                        type="text" placeholder="Формула смешивания"/>
                <button onClick={onShuffleBtnClick}
                        disabled={props.disabledBtns.shuffle}
                        className={c.input}>Shuffle</button>
                <button onClick={onSolveBtnClick} 
                        disabled={props.disabledBtns.solve}
                        className={c.input}>Solve</button>
                <button onClick={onStepBtnClick}
                        disabled={props.disabledBtns.step}
                        className={c.input}>Step</button>
                <div >
                    {props.solve_path.map((step, index) =>{
                            if (index === props.activeStep)
                                return <span className={`${c.output} ${c.active}`} key={index}>{step}</span>  
                            else
                                return <span className={c.output} key={index}>{step}</span> 
                    })}
                </div>
            </div>
        </>
    );
}

export default Cube;