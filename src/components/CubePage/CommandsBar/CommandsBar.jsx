import React from 'react';
import c from './CommandsBar.module.css';


class CommandsBar extends React.Component{

    onInputChange = (e) => {
        this.props.updateInputSuccess(e.target.value);
    }
    
    // onShuffleBtnClick = () => {
    //     this.props.onTest();
    // }



    render(){
        return (
            <div className = {c.container}>
                <input onChange={this.onInputChange} className={c.input} 
                        value = {this.props.commandsBar.inputState} 
                        type="text" placeholder="Формула смешивания"/>
                <button onClick={this.props.onShuffleBtnClick}
                        disabled={this.props.commandsBar.disabledBtns.shuffle}
                        className={c.input}>Shuffle</button>
                <button onClick={this.props.onSolveBtnClick} 
                        disabled={this.props.commandsBar.disabledBtns.solve}
                        className={c.input}>Solve</button>
                <button onClick={this.props.onStepBtnClick}
                        disabled={this.props.commandsBar.disabledBtns.step}
                        className={c.input}>Step</button>
                <div >
                    {this.props.commandsBar.solve.map((step, index) =>{
                            if (index === this.props.commandsBar.activeStep)
                                return <span className={`${c.output} ${c.active}`} key={index}>{step}</span>  
                            else
                                return <span className={c.output} key={index}>{step}</span> 
                    })}
                </div>
            </div>
        );
    }
}

export default CommandsBar;