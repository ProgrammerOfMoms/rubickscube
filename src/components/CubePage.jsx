import React from 'react';
import Cube from './CubePage/Cube/Cube';
import Command from './CubePage/Command/Command';

class CubePage extends React.Component{
    render() {
        return (
            <>
                <Cube cube={this.props.cube}/>
                <Command commandsBar={this.props.commandsBar}
                         dispatch={this.props.dispatch}/>
            </>
        )
    }
}

export default CubePage