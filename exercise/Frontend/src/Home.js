import React, { Component } from 'react';
import Locker from './Locker';
import Register from './Register';
import Payment from './Payment';
import Confirm from './Confirm';
import Receipt from './Receipt';
import Signin from './Signin';
import Takeout from './Takeout';
import Last from './Last';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            redirect: 0,
            page: 0,
            id: 0,
            size: '',
            money: 0
        };
    }
    setMoney = (money) => {
        this.setState({
            money: money
        });
    }
    setPage = (page, id) => {
        this.setState({
            page: page,
            id: id
        });
    }
    setSize = (size) => {
        this.setState({
            size: size
        });
    }
    cancel = (id) => {
        fetch("https://enigmatic-cove-84570.herokuapp.com/cancel", {
            mode: 'cors',
            method: 'post',
            cache: "no-cache",
            credentials: "same-origin",
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": id })
        });
        this.setPage(0, 0)
    }
    render() {
        if (this.state.page === 0) {
            return (
                <div>
                    <div className="row m-2 justify-content-center">
                        <div className="col-8">
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
                                        <th scope="row">S</th>
                                        <td>50 THB</td>
                                        <td>25 THB</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">M</th>
                                        <td>100 THB</td>
                                        <td>50 THB</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">L</th>
                                        <td>200 THB</td>
                                        <td>100 THB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row m-2 justify-content-center">
                        <button onClick={() => this.setPage(1, 0)} className="btn-lg m-auto btn-secondary col-4"><h3>ฝากของ</h3></button>
                    </div>
                    <div className="row m-4 justify-content-center">
                        <button onClick={() => this.setPage(6, 0)} className="btn-lg m-auto btn-secondary col-4"><h3>รับของ</h3></button>
                    </div>
                </div>
            );
        }
        else if (this.state.page === 1) {
            return (
                <div>
                    <Locker setPage={this.setPage} setSize={this.setSize} />
                </div>
            );
        }
        else if (this.state.page === 2) {
            return (
                <div>
                    <Register setPage={this.setPage} id={this.state.id} cancel={this.cancel} />
                </div>
            );
        }
        else if (this.state.page === 3) {
            return (
                <div>
                    <Payment setPage={this.setPage} id={this.state.id} size={this.state.size} cancel={this.cancel} setMoney={this.setMoney} />
                </div>
            );
        }
        else if (this.state.page === 4) {
            return (
                <div>
                    <Confirm setPage={this.setPage} id={this.state.id} money={this.state.money} />
                </div>
            );
        }
        else if (this.state.page === 5) {
            return (
                <div>
                    <Receipt setPage={this.setPage} id={this.state.id} />
                </div>
            );
        }
        else if (this.state.page === 6) {
            return (
                <div>
                    <Signin setPage={this.setPage} id={this.state.id} />
                </div>
            );
        }
        else if (this.state.page === 7) {
            return (
                <div>
                    <Takeout setPage={this.setPage} id={this.state.id} />
                </div>
            );
        }
        else if (this.state.page === 8) {
            return (
                <div>
                    <Last setPage={this.setPage} id={this.state.id} />
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
export default Home;