import React, { Component } from 'react';
import './App.css';

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
        <button onClick={this.startGame}>Start Game</button>
        <canvas id="renderCanvas"></canvas> 
      </div>
    );
  }
}

export default App;
