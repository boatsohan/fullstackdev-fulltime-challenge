import React, { Component } from 'react';
const numberpad = {
    'fontSize': '2vw',
    'textAlign': 'center',
    'width': '4vw',
    'height': '4vw',
    'minWidth': '50px',
    'minHeight': '50px',
    'margin': '0.1vw 0.2vw 0.1vw 0.2vw'
};
const numberpad2 = {
    'fontSize': '2vw',
    'textAlign': 'center',
    'width': '8.4vw',
    'height': '4vw',
    'minWidth': '100px',
    'minHeight': '50px',
    'margin': '0.1vw 0.4vw 0.1vw 0.2vw'
};
class Numberpad extends Component {
    constructor() {
        super();
        this.state = {
            phone: [],
            value: 0
        };
    }
    addnumber(id) {
        if (id === -1 && this.state.value > 0) {
            this.setState({
                // eslint-disable-next-line
                value: --this.state.value
            });
            this.state.phone.splice(this.state.value);
        }
        else if (id >= 0 && this.state.value < this.props.max) {
            this.state.phone.push(id);
            this.setState({
                phone: id,
                // eslint-disable-next-line
                value: ++this.state.value
            });
        }
        else if (id === -2) {
            this.setState({
                // eslint-disable-next-line
                value: this.state.value = 0
            });
            this.state.phone.splice(0);
        }
        this.setState(
            this.state
        )
        this.props.phone(this.state.phone);
    }
    render() {
        return (
            <div>
                <div className="row my-2 justify-content-center">
                    <div onClick={() => this.addnumber(7)} className="btn btn-secondary" style={numberpad}>7</div>
                    <div onClick={() => this.addnumber(8)} className="btn btn-secondary" style={numberpad}>8</div>
                    <div onClick={() => this.addnumber(9)} className="btn btn-secondary" style={numberpad}>9</div>
                    <div onClick={() => this.addnumber(-1)} className="btn btn-secondary" style={numberpad}>
                        <i className='fas fa-backspace'></i></div>
                </div>
                <div className="row my-2 justify-content-center">
                    <div onClick={() => this.addnumber(4)} className="btn btn-secondary" style={numberpad}>4</div>
                    <div onClick={() => this.addnumber(5)} className="btn btn-secondary" style={numberpad}>5</div>
                    <div onClick={() => this.addnumber(6)} className="btn btn-secondary" style={numberpad}>6</div>
                    <div className="btn btn-secondary" style={numberpad}></div>
                </div>
                <div className="row my-2 justify-content-center">
                    <div onClick={() => this.addnumber(1)} className="btn btn-secondary" style={numberpad}>1</div>
                    <div onClick={() => this.addnumber(2)} className="btn btn-secondary" style={numberpad}>2</div>
                    <div onClick={() => this.addnumber(3)} className="btn btn-secondary" style={numberpad}>3</div>
                    <div className="btn btn-secondary" style={numberpad}></div>
                </div>
                <div className="row my-2 justify-content-center">
                    <div className="btn btn-secondary" style={numberpad}></div>
                    <div onClick={() => this.addnumber(0)} className="btn btn-secondary" style={numberpad}>0</div>
                    <div onClick={() => this.addnumber(-2)} className="btn btn-secondary" style={numberpad2}>Clear</div>
                </div>
            </div>
        );
    }
}
export default Numberpad;