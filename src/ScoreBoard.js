import React, { Component } from 'react';
import './App.css';

class ScoreBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      rollData: [{dice1: null, dice2: null}]
    }
    this.handleRollData = this.handleRollData.bind(this);
  }

  handleRollData() {
      console.log('handle roll data');
      this.setState(prevState => {
          return {
              rollData: prevState.rollData.push(window.rollData)
          };
      })
  }

  componentDidMount(){
      window.addEventListener('rollCompleted', this.handleRollData);
  }

  render() {
    return (
      <div className="ScoreBoard">
        <div>This is react. You rolled a {console.log(this.state.rollData)}</div>
      </div>
    );
  }
}

export default ScoreBoard;
