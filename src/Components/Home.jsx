import React, {Component} from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: 0,
      score: [0, 0, 0, 0, 0],
      questions: [
        ['Grand Central Terminal, Park Avenue, New York is the world\'s', 'Entomology is the science that studies', 'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of', 'Garampani sanctuary is located at', 'For which of the following disciplines is Nobel Prize awarded?'],
        ['Hitler party which came into power in 1933 is known as', 'FFC stands for', 'Fastest shorthand writer was', 'Epsom (England) is the place associated with', 'First human heart transplant operation conducted by Dr. Christiaan Barnard on Louis Washkansky, was conducted in'],
        ['Galileo was an Italian astronomer who', 'Habeas Corpus Act 1679', 'Exposure to sunlight helps a person improve his health because', 'Golf player Vijay Singh belongs to which country?', 'Guarantee to an exporter that the importer of his goods will pay immediately for the goods ordered by him, is known as'],
      ],
      options: [
        [
          ['Largest railway station easy', 'Highest railway station', 'Longest railway station', 'None of the above'],
          ['Behavior of human beings', 'Insects', 'The origin and history of technical and scientific terms', 'The formation of rocks'],
          ['Asia', 'Africa', 'Europe', 'Australia'],
          ['Junagarh, Gujarat', 'Diphu, Assam', 'Kohima, Nagaland', 'Gangtok, Sikkim'],
          ['Physics and Chemistry', 'Physiology or Medicine', 'Literature, Peace and Economics', 'All of the above'],
        ],
        [
          ['Labour Party', 'Nazi Party', 'Ku-Klux-Klan', 'Democratic Party'],
          ['Foreign Finance Corporation', 'Film Finance Corporation', 'Federation of Football Council', 'None of the above'],
          ['Dr. G. D. Bist', 'J.R.D. Tata', 'J.M. Tagore', 'Khudada Khan'],
          ['Horse racing', 'Polo', 'Shooting', 'Snooker'],
          ['1967', '1968', '1958', '1922'],
        ],
        [
          ['developed the telescope', 'discovered four satellites of Jupiter', 'discovered that the movement of pendulum produces a regular time measurement', 'All of the above'],
          ['states that no one was to be imprisoned without a writ or warrant stating the charge against him', 'provided facilities to a prisoner to obtain either speedy trial or release in bail', 'safeguarded the personal liberties of the people against arbitrary imprisonment by the king\'s orders', 'All of the above'],
          ['the infrared light kills bacteria in the body', 'resistance power increases', 'the pigment cells in the skin get stimulated and produce a healthy tan', 'the ultraviolet rays convert skin oil into Vitamin D'],
          ['USA', 'Fiji', 'India', 'UK'],
          ['Letter of Credit (L/C)', 'laissezfaire', 'inflation', 'None of the above'],
        ],
      ]
    }
  }

  render() {

    const { step, selectDifficulty, restartGame, nextStep, prevStep, difficulty, selectedOptionsList, selectChoice, correctOptions, showResult, time } = this.props;

    const { selectedOption, questions, options, score } = this.state;

    const renderResult = () => {

      let output = [];

      for(let i=0; i<5; i++) {
        output.push(<p>Question {i + 1}: {score[i] !== 0 ? <i className={'fas fa-check'} /> : <i className={'fas fa-times'} /> }</p>);
      }
      return output;
    };

    const renderAccToStep = () => {
      console.log(selectDifficulty, step);

      for(let i=0;i<5;i++) {
        if (selectedOptionsList[i] === correctOptions[difficulty-1][i]) {
          let newScore = this.state.score;
          newScore[i] = 1;

          const temp = () => this.setState({
            score: newScore,
          });
        } else {
          let newScore = this.state.score;
          newScore[i] = 0;

          const temp = () => this.setState({
            score: newScore,
          });
        }
      }

      const finalScore = score.filter((value) => {return value === 1}).length;
      let userResult = 'Dumb';
      if(finalScore === 5) {
        userResult = 'Very Strong';
      } else if(finalScore === 4) {
        userResult = 'Strong';
      } else if(finalScore === 3) {
        userResult = 'Good';
      } else if(finalScore === 2) {
        userResult = 'Bad';
      } else if(finalScore === 1) {
        userResult = 'Poor';
      } else {
        userResult = 'Dumb';
      }

      switch (step) {
        case 0:
          return <div className={'content'}>
            <h3 className={'choose-heading'}>Please select a difficulty</h3>
            <div className={'diff-buttons'}>
              <button onClick={() => selectDifficulty(1)}>EASY</button>
              <button onClick={() => selectDifficulty(2)}>MEDIUM</button>
              <button onClick={() => selectDifficulty(3)}>HARD</button>
            </div>
          </div>;
        case 6:
          return <div className={'content'}>
            <h1 className={'choose-heading'}>RESULT</h1>
            <div className={'diff-buttons'}>
              <h3>Your score is: {finalScore}/5</h3>
              <h3>Your level is: {userResult}</h3>
              <h2>Evaluation: </h2>
              {renderResult()}
            </div>
          </div>;
        default:
          return <div className={'content'}>
            <h4>Time remaining: {time} seconds</h4>
            <h3 className={'question'}>{step}) {questions[difficulty - 1][step - 1]}</h3>
            <ul className={'options'}>
              {options[difficulty - 1][step - 1].map((option, index) => (
                <li key={index} className={selectedOptionsList[step - 1] === index + 1 ? 'selected' : ''}
                    onClick={() => selectChoice(step - 1, index + 1)}><span
                  className="option-tag">{index + 1}</span> {option}</li>
              ))}
            </ul>
          </div>;
      }
    };

    return (
      <div className={'container'}>
        <h1 className={'main-heading'}>QUIZ APP</h1>
        {renderAccToStep()}
        <div className={'prev-next-container'}>
          {step !== 0 && step !== 6 ?
            <button onClick={() => {this.setState({selectedOption: 0}); prevStep()}} disabled={step === 1} className={'prev-btn'}>PREVIOUS</button> : null}
          {step !== 0 && step !== 6 ? <button onClick={() => {this.setState({selectedOption: 0}); nextStep()}} className={'next-btn'}>{step !== 5 ? 'NEXT' : 'SUBMIT' }</button> : null}
        </div>
        {step !== 0 ? <button onClick={() => {
          window.location.reload();
        }} className={'restart-btn'}>RESTART</button> : null}
      </div>
    );
  }
}