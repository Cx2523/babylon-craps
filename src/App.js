import React, { Component } from 'react';
import './App.css';
import ScoreBoard from './ScoreBoard'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameRunning: false
    }
    this.startGame = this.startGame.bind(this);
  }

  startGame(){
    this.setState({gameRunning: true});
    window.dispatchEvent(new Event('startGame'));
  }

  render() {
    return (
      <div className="App">
        <div className={`animated bounceInDown title letter C`}>C</div>
        <div className={`animated bounceInDown title letter R`}>R</div>
        <div className={`animated bounceInDown title letter A`}>A</div>
        <div className={`animated bounceInDown title letter P`}>P</div>
        <div className={`animated rotateIn title letter S`}>S</div>
        <div className={`animated flipInX title the-game ${this.state.gameRunning ? 'shift-to-row': null}`}>(the game)</div>
        <div className={`animated jackInTheBox in title ${this.state.gameRunning ? 'shift-to-row': null}`}>IN</div>
        <div className={`animated jackInTheBox SPACE title ${this.state.gameRunning ? 'shift-to-row': null}`}>SPACE</div>
        { !this.state.gameRunning ? 
          <div className={'animated zoomIn title message slow'} style={{opacity:'.75', width: '50%', textAlign:'center', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto', fontSize: '25px'}}>
            In the year 2018, as the AI singularity approaches, machines have made a wager with 'the chosen one' to save humanity from extinction. You are the chosen one, and you must save humanity by playing ...CRAPS, IN SPACE!
          </div>
        :
          null
        }
        <button style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} onClick={this.startGame}>Start Game</button>
        {this.state.gameRunning ? <ScoreBoard /> : null} 
        <canvas id="renderCanvas"></canvas>
        
      </div>
    );
  }
}

export default App;
