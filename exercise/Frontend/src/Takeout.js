import React, { Component } from 'react';
import Numberpad from './Numberpad';
const numberbox = {
    'fontSize': '25px',
    'textAlign': 'center',
    'width': '300px',
    'height': '50px'
};
const text = {
    'fontSize': '2vw',
    'textAlign': 'center'
};
class Takeout extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            pin: [],
            txt: "",
            locker: {}
        };
    }
    setpin = (pin) => {
        var text = "";
        for (let index = 0; index < this.state.pin.length; index++) {
            text += "*"
        }
        this.setState({
            pin: pin,
            pin2: text
        });
    }
    submit = () => {
        if (this.state.pin.length === 4) {
            var txt = "";
            for (let index = 0; index < this.state.pin.length; index++) {
                txt += this.state.pin[index];
            }
            fetch("https://enigmatic-cove-84570.herokuapp.com/takeout", {
                mode: 'cors',
                method: 'post',
                cache: "no-cache",
                credentials: "same-origin",
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": this.props.id, "pin": txt })
            }).then(res => res.json()).then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        locker: result
                    });
                    if (this.state.locker.state) {
                        console.log("Take" + this.props.id)
                        this.props.setPage(8, this.props.id)
                    }
                    else {
                        this.props.setPage(0, 0)
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                });
        }
        else {
            this.setState({
                txt: "*โปรดใส่ pin 4 หลัก"
            });
        }
    }
    render() {
        return (
            <div>
                <div className="row mt-4 justify-content-center">
                    <div className="col">
                        <h2>รหัส 4 หลัก</h2>
                    </div>
                </div>
                <div className="row mt-2 justify-content-center">
                    <div className="col">
                        <h5 className="text-danger">{this.state.txt}</h5>
                    </div>
                </div>
                <div className="mt-2 row justify-content-center">
                    <div className="mx-4"><div className="shadow p-2 bg-white rounded border border-primary" style={numberbox}>{this.state.pin2}</div></div>
                </div>
                <div className="row mt-2 justify-content-center">
                    <div className="col">
                        <Numberpad phone={this.setpin} max={4} />
                    </div>
                </div>
                <div className="row m-2 text-center justify-content-center">
                    <div className="col-6">
                        <button onClick={this.submit} className="btn-sm btn-success col-6" style={text}><h4>ยืนยัน</h4></button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Takeout;