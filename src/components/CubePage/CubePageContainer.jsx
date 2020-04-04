import React from "react";
import {connect} from "react-redux";
import { shuffle, solve, step } from '../../redux/reducers/CubePageReducer';
import CubePage from "./CubePage";

class CubePageContainer extends React.Component{

    render(){
        return (
            <CubePage {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        commandsBar: state.cubePageReducer.commandsBar,
        cube: state.cubePageReducer.cube,
    }
}

const mapDispatchToProps = {
        shuffle,
        solve,
        step
}
export default connect(mapStateToProps, mapDispatchToProps)(CubePageContainer);

