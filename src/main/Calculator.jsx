import React, { Component } from 'react';
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initial = {
    display: '0',
    clear: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initial }

    constructor(props){
        super(props)
        this.clear = this.clear.bind(this)
        this.operation = this.operation.bind(this)
        this.add = this.add.bind(this)
    }

    clear(){
        this.setState({...initial})
    }

    operation(operation){
        if(this.state.current === 0) {
            this.setState({
                operation,
                current: 1,
                clear: true
            })
        } else {
            const equals = operation === '='
            const currentOp = this.state.operation;
            const values = [...this.state.values];
            try {
                values[0] = eval(`${values[0]} ${currentOp} ${values[1]}`)
            } catch (error) {
                values[0] = this.state.values[0]
            }

            this.setState({
                display: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clear: !equals,
                values
            })
        }
    }

    add(n){
        if(n === '.' && this.state.display.includes('.')) return
        const clear = this.state.display === '0'
            || this.state.clear
        const current = clear ? '' : this.state.display;
        const display = current + n;
        this.setState({display, clear: false})

        if( n !== '.') {
            const i = this.state.current;
            const v = parseFloat(display);
            const values = [...this.state.values];
            values[i] = v;
            this.setState({ values })
        }
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.display}/>
                <Button label="AC" click={this.clear} triple/>
                <Button label="/" click={this.operation} operation/>
                <Button label="7" click={this.add}/>
                <Button label="8" click={this.add}/>
                <Button label="9" click={this.add}/>
                <Button label="*" click={this.operation} operation/>
                <Button label="4" click={this.add}/>
                <Button label="5" click={this.add}/>
                <Button label="6" click={this.add}/>
                <Button label="-" click={this.operation} operation/>
                <Button label="1" click={this.add}/>
                <Button label="2" click={this.add}/>
                <Button label="3" click={this.add}/>
                <Button label="+" click={this.operation} operation/>
                <Button label="0" click={this.add} double/>
                <Button label="." click={this.add}/>
                <Button label="=" click={this.operation} operation/>
            </div>
        )
    }
}