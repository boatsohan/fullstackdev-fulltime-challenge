import React, { Component } from 'react';
// import { setTimeout } from 'timers';
class Headers extends Component {
    constructor() {
        super();
        this.state = {
            name: "Boat",
            count: 0
        };
    }
    render() {
        // setTimeOut(() => this.setState({ name: "Bad" })), 1000)
        // setTimeout(()=>{
        //     this.setState({name:"Bad"});
        // },1000);
        // setInterval(()=>{
        //     this.setState({count:this.state.count+1});
        // },1000);
        return (
            <div>
                <h1>BoatEiei</h1>
                <h2>{this.state.name}</h2>
                <h2>{this.state.count}</h2>
            </div>
        );
    }
}
export default Headers;