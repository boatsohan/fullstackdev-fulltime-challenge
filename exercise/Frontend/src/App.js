import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="container App-header">
        <h1><Link to="/" >Home</Link></h1>
        <h1><Link to="/Headers">Headers</Link></h1>
        <h1><Link to="/Content">Content</Link></h1>
        <h1><Link to="/Footer">Footer</Link></h1>
      </div>
    );
  }
}
export default App;
