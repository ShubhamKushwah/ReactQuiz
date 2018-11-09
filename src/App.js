import React, {Component} from 'react';
import Home from './Components/Home';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      difficulty: 1,
      selectedOptionsList: [0, 0, 0, 0, 0],
      time: 60,
      correctOptions: [
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3],
      ],
    };
  }

  render() {

    let timer = null;

    const {step, difficulty, selectedOptionsList, correctOptions, time} = this.state;

    const nextStep = () => {
      if (step < 6)
        this.setState(state => ({
          step: state.step + 1,
        }));
    };

    const prevStep = () => {
      if (step > 0)
        this.setState(state => ({
          step: state.step - 1,
        }));
    };

    const selectDifficulty = (diff) => {
      nextStep();

      setTimeout(() => {
        showResult();
      }, 60000);

      timer = setInterval(() => {
        this.setState({
          time: this.state.time - 1,
        });
      }, 1000);

      this.setState({
        difficulty: diff
      });
    };

    const selectChoice = (step, op) => {
      let tempList = this.state.selectedOptionsList;
      tempList[step] = op;

      this.setState({
        selectedOptionsList: tempList,
      });
    };

    const restartGame = () => {
      this.setState({
        step: 0,
        difficulty: 1,
        selectedOptionsList: [0, 0, 0, 0, 0],
        time: 60,
      });

      clearInterval(timer);
    };

    const showResult = () => {
      this.setState({
        step: 6,
      });
    };

    return (
      <div className="App">
        <Home
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          difficulty={difficulty}
          selectDifficulty={selectDifficulty}
          restartGame={restartGame}
          selectChoice={selectChoice}
          selectedOptionsList={selectedOptionsList}
          correctOptions={correctOptions}
          showResult={showResult}
          time={time}
        />
      </div>
    );
  }
}

export default App;
