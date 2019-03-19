import React, { Component } from 'react';
import Numberpad from './Numberpad';
const numberbox = {
    'fontSize': '25px',
    'textAlign': 'center',
    'width': '300px',
    'height': '50px',
};
const text = {
    'fontSize': '2vw',
    'textAlign': 'center'
};
class Confirm extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            pin: [],
            pin2: "",
            txt: ""
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
            fetch("https://enigmatic-cove-84570.herokuapp.com/confirm", {
                mode: 'cors',
                method: 'post',
                cache: "no-cache",
                credentials: "same-origin",
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": this.props.id, "pin": txt, "money": this.props.money })
            }).then(() => {
                this.props.setPage(5, this.props.id)
            })

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
export default Confirm;