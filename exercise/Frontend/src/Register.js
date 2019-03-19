import React, { Component } from 'react';
import './index.css';
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
class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: true,
            redirect: false,
            phone: [],
            value: 0,
            txt: ""
        };
    }
    componentDidMount() {
    }
    setphone = (phone) => {
        this.setState({
            phone: phone
        });
    }
    submit = () => {
        if (this.state.phone.length === 10) {
            var txt = "";
            for (let index = 0; index < this.state.phone.length; index++) {
                txt += this.state.phone[index];
            }
            fetch("https://enigmatic-cove-84570.herokuapp.com/register", {
                mode: 'cors',
                method: 'post',
                cache: "no-cache",
                credentials: "same-origin",
                withCredentials: true,
                crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": this.props.id, "user": txt })
            }).then(()=>{
                this.props.setPage(3, this.props.id)
            });

        }
        else {
            this.setState({
                txt: "*โปรดใส่เบอร์โทร 10 หลัก"
            });
        }
    }
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <div className="row mt-4 justify-content-center">
                        <div className="col">
                            <h2>ใส่เบอร์โทรเพื่อลงทะเบียน</h2>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <h5 className="text-danger">{this.state.txt}</h5>
                        </div>
                    </div>
                    <div className="mt-2 row justify-content-center">
                        <div className="mx-4"><div className="shadow p-2 bg-white rounded border border-primary" style={numberbox}>{this.state.phone}</div></div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <Numberpad phone={this.setphone} max={10} />
                        </div>
                    </div>
                    <div className="row m-2 text-center justify-content-center">
                        <div className="col-6">
                            <button onClick={this.submit} className="btn-sm btn-success col-6" style={text}><h4>ยืนยัน</h4></button>
                        </div>
                    </div>
                    <div className="row m-2 text-center justify-content-center">
                        <div className="col-6">
                            <button onClick={() => this.props.cancel(this.props.id)} className="btn-sm btn-danger col-6" style={text}><h4>ยกเลิก</h4></button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>);
        }
    }
}
export default Register;