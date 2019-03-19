import React, { Component } from 'react';
class Last extends Component {
    constructor() {
        super();
        this.state = {
            receipt: {
                user: "",
                id: "",
                money: 0,
                time: "",
                price: [0, 0]

            },
            isLoaded: false
        };
    }
    componentDidMount() {
        console.log("Last" + this.props.id)
        fetch("https://enigmatic-cove-84570.herokuapp.com/last", {
            mode: 'cors',
            method: 'post',
            cache: "no-cache",
            credentials: "same-origin",
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": this.props.id })
        }).then(res => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    receipt: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <div className="row mt-5 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">เบอร์โทรที่ลงทะเบียน :</h2><h2>{this.state.receipt.user}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">ล็อคเกอร์ฝากของ :</h2><h2>{this.state.receipt.id}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">จำนวนเงิน :</h2><h2>{this.state.receipt.money} THB</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">เวลานำเข้าฝาก :</h2><h2>{this.state.receipt.time}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">เวลาปัจจุบัน :</h2><h2>{this.state.receipt.time2}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">ราคาตู้ฝาก :</h2><h2>ชั่วโมงแรก {this.state.receipt.price[0]} ชั่วโมงถัดไป {this.state.receipt.price[1]} THB</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">นำฝากไว้ :</h2><h2>{this.state.receipt.time3}ชั่วโมง</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">ยอดเงินที่ใช้:</h2><h2>{this.state.receipt.total}THB</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">ยอดเงินที่ต้องชำระเพิ่มเติม :</h2><h2>{this.state.receipt.charge}THB</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col">
                            <div className="row justify-content-center">
                                <h2 className="mr-2">เงินทอน :</h2><h2>{this.state.receipt.change}THB</h2>
                            </div>
                            <div className="row justify-content-center">
                                <h2>{this.state.receipt.changes}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 text-center justify-content-center">
                        <button onClick={() => this.props.setPage(0,0)} className="btn-sm btn-success col-6"><h4>เสร็จสิ้น</h4></button>
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
export default Last;