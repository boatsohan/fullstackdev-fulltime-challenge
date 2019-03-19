import React, { Component } from 'react';
const text = {
    'fontSize': '2vw',
    'textAlign': 'center'
};
const numberbox = {
    'fontSize': '25px',
    'textAlign': 'center',
    'width': '300px',
    'height': '50px',
};
class Payment extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            money: 0,
            price: [0, 0],
            txt: ""
        };
        this.addmoney = this.addmoney.bind(this);
    }
    componentDidMount() {
        console.log(this.props.size)
        fetch("https://enigmatic-cove-84570.herokuapp.com/price", {
            mode: 'cors',
            method: 'post',
            cache: "no-cache",
            credentials: "same-origin",
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "size": this.props.size})
        }).then(res => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    price: result
                });
                // console.log("Payment"+this.state.locker.size)
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }
    addmoney(money) {
        var summoney = this.state.money
        summoney += money;
        this.setState({
            money: summoney
        });
    }
    submit = () => {
        if (this.state.money >= this.state.price[0]) {
            this.props.setMoney(this.state.money);
            this.props.setPage(4, this.props.id);
        }
        else {
            this.setState({
                txt: "*ยอดเงินขั้นต่ำ" + this.state.price[0] + "THB"
            });
        }
    }
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Size</th>
                                        <th scope="col">First 60 minutes</th>
                                        <th scope="col">Next minutes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{this.props.size}</th>
                                        <td>{this.state.price[0]} THB</td>
                                        <td>{this.state.price[1]} THB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <h5 className="text-danger">{this.state.txt}</h5>
                        </div>
                    </div>
                    <div className="row m-2 justify-content-center text-center">
                        <h1>$</h1>
                        <div className="ml-4 shadow bg-white rounded border border-primary" style={numberbox}>
                            {this.state.money}
                        </div>
                    </div>
                    <div className="row mt-4 justify-content-center text-center">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">
                                    <button onClick={() => this.addmoney(1)} className="btn btn-default border border-secondary"> 1 bath</button>
                                </div>
                                <div className="col-3">
                                    <button onClick={() => this.addmoney(2)} className="btn btn-default border border-secondary"> 2 bath</button>
                                </div>
                                <div className="col-3">
                                    <button onClick={() => this.addmoney(5)} className="btn btn-default border border-secondary"> 5 bath</button>
                                </div>
                                <div className="col-3">
                                    <button onClick={() => this.addmoney(10)} className="btn btn-default border border-secondary"> 10 bath</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <div className="m-4">
                                    <button onClick={() => this.addmoney(20)} className="btn btn-default border border-secondary"> 20 bath</button>
                                </div>
                                <div className="m-4">
                                    <button onClick={() => this.addmoney(50)} className="btn btn-default border border-secondary"> 50 bath</button>
                                </div>
                                <div className="m-4">
                                    <button onClick={() => this.addmoney(100)} className="btn btn-default border border-secondary"> 100 bath</button>
                                </div>
                                <div className="m-4">
                                    <button onClick={() => this.addmoney(500)} className="btn btn-default border border-secondary"> 500 bath</button>
                                </div>
                                <div className="m-4">
                                    <button onClick={() => this.addmoney(1000)} className="btn btn-default border border-secondary"> 1000 bath</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 text-center justify-content-center">
                        <button onClick={this.submit} className="btn-sm btn-success col-6" style={text}><h4>ยืนยัน</h4></button>
                    </div>
                    <div className="row m-2 text-center justify-content-center">
                        <button onClick={() => this.props.cancel(this.props.id)} className="btn-sm btn-danger col-6" style={text}><h4>ยกเลิก</h4></button>
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
                </div>
            );
        }
    }
}
export default Payment;