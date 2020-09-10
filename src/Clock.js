import React from 'react';

class Clock extends React.Component {

  constructor (props) {
    super(props);
    this.state = {time: new Date(), size: 5, color: "black"};
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({time: new Date()});
    }, 1000);
    this.sizeInterval = setInterval(() => {
      if(this.state.size >= 400) {
        console.log("end");
        clearInterval(this.sizeInterval);
        this.setState({color: "red"});
      }
      let size = this.state.size + 1;
      this.setState({size: size});
    }, 50);
  }

  render () {
    return (
      <div>
        <h3>It's</h3>
        <p style={{fontSize: this.state.size, margin: "0", fontWeight: "bold", color: this.state.color}}>{this.state.time.toLocaleTimeString()}</p>
      </div>
    );
  }

}

export default Clock;
