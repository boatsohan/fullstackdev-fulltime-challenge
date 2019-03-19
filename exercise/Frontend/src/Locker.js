import React, { Component } from 'react';
class Locker extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            locker: [{ class: '', state: '' }],
            id: 0,
            page: 1
        };
        this.locker = this.locker.bind(this);
    }
    componentDidMount() {
        fetch("https://enigmatic-cove-84570.herokuapp.com/locker").then(res => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    locker: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }
    locker(event) {
        event.persist();
        fetch("https://enigmatic-cove-84570.herokuapp.com/locker", {
            mode: 'cors',
            method: 'post',
            cache: "no-cache",
            credentials: "same-origin",
            withCredentials: true,
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": event.target.id })
        }).then(res => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    locker: result
                });
                // console.log("Locker "+this.state.locker[event.target.id - 1].state);
                // eslint-disable-next-line
                if (this.state.locker[event.target.id - 1].state==0) {
                    this.setState({
                        id: event.target.id
                    })
                    this.props.setSize(this.state.locker[event.target.id - 1].size)
                    this.props.setPage(2, this.state.id)
                    //sent to next page
                }
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    };
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <div className="row mt-4">
                        <div className="col">
                            <h3>กดเพื่อเลือกตู้ล็อกเกอร์</h3>
                        </div>
                    </div>
                    <div className="mt-2 rounded row justify-content-center text-center">
                        <div className=" bg-secondary rounded mr-2 col-1" ></div><h5>ว่าง</h5>
                        <div className=" bg-danger rounded ml-5 mr-2 col-1" ></div><h5>ไม่ว่าง</h5>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <div className="row  text-center justify-content-center my-1" >
                                <div id="1" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[0].class} ><h3 id="1">S1</h3></div>
                                <div id="2" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[1].class} ><h3 id="2">M2</h3></div>
                                <div id="3" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[2].class} ><h3 id="3">L3</h3></div>
                            </div>
                            <div className="row text-center justify-content-center my-1">
                                <div id="4" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[3].class} ><h3 id="4">S4</h3></div>
                                <div id="5" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[4].class} ><h3 id="5">M5</h3></div>
                                <div id="6" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[5].class} ><h3 id="6">L6</h3></div>
                            </div>
                            <div className="row  text-center  justify-content-center my-1">
                                <div id="7" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[6].class} ><h3 id="7">S7</h3></div>
                                <div id="8" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[7].class} ><h3 id="8">M8</h3></div>
                                <div id="9" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[8].class} ><h3 id="9">L9</h3></div>
                            </div>
                            <div className="row  text-center  justify-content-center my-1">
                                <div id="10" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[9].class}  ><h3 id="10">S10</h3></div>
                                <div id="11" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[10].class} ><h3 id="11">M11</h3></div>
                                <div id="12" onClick={this.locker} className={"col-3 p-2 m-1 rounded " + this.state.locker[11].class} ><h3 id="12">L12</h3></div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 text-center justify-content-center">
                        <button onClick={() => this.props.setPage(0, 0)} className="btn-lg btn-danger col-4"><h3>ยกเลิก</h3></button>
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
export default Locker;