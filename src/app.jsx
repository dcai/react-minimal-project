import React, { Component } from 'react';
import { connect } from 'react-redux';

const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000) .toString(16) .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

class App extends Component {
    render() {
        // const counterValue = this.props.store.getState().counter;
        const counterValue = this.props.store.getState().counter.counter;
        return (
            <div>
                <h1>Hot loading in action!</h1>
                <div>
                    <label>Counter: </label>
                    <span>{counterValue}</span>
                </div>
                <ul>
                    <li><button>Add todo</button></li>
                    <li><button onClick={ () => {
                        this.props.add();
                    }}>INCRESE Counter</button></li>
                </ul>
        </div>
        );
    }
}

const mapStateToProps = state => ({counter: state.counter});
const mapDispatchToProps = dispatch => ({add: () => dispatch({type: 'INCREASE'})});

export default connect(mapStateToProps, mapDispatchToProps)(App);
