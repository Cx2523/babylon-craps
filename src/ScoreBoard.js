import React, { Component } from 'react';
import './App.css';

class ScoreBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      rollDataArray: [{dice1: null, dice2: null}],
      rollMatch: 0,
      gameStatus: ''
    }
    this.handleRollData = this.handleRollData.bind(this);
    this.checkRules = this.checkRules.bind(this);
  }

  handleRollData() {
      this.setState(prevState => {
        return {
          rollDataArray: [...prevState.rollDataArray, window.rollData]
        }
      });
  }

  componentDidMount(){
      window.addEventListener('rollCompleted', this.handleRollData);
  }

  checkRules(){
    var lastRoll = this.state.rollDataArray[this.state.rollDataArray.length - 1].dice1 + this.state.rollDataArray[this.state.rollDataArray.length - 1].dice2;

    if(this.state.rollMatch === 0){
      switch (lastRoll) {
        case 7:
        case 11:
          this.state.gameStatus = 'Win';
          break;
        case 3:
        case 2:
          this.state.gameStatus = 'Lose';
          break;
        default:
          this.state.rollMatch = lastRoll;
      }
    }
    else {
      switch (lastRoll) {
        case 7:
        case 11:
          this.state.gameStatus = 'Lose';
          break;
        default:
          if(lastRoll === this.state.rollMatch){
            this.state.gameStatus = 'Win'
          }
      }
    }
  }


  render() {
    this.checkRules();
    return (
      <div className="ScoreBoard">
        <div>You rolled a&nbsp;
          {
            this.state.rollDataArray[this.state.rollDataArray.length - 1].dice1
            + this.state.rollDataArray[this.state.rollDataArray.length - 1].dice2
          }
        </div>

      {this.state.rollMatch !== 0 ? 
        <div>You must get a {this.state.rollMatch} before a 7 or 11!</div>
        : null
      }
      {this.state.gameStatus === 'Lose' ? 
        <div className={'loseMessage'}>you lose ...</div>
        : null
      }
      {this.state.gameStatus === 'Win' ? 
        <div className={'winMessage'}>YOU WON!! ...humanity thanks you!</div>
        : null
      }
      
      </div>
    );
  }
}

export default ScoreBoard;
