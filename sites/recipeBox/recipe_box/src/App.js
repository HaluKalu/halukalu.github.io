import React from 'react';
import './App.scss';
import RecipeBlock from './RecipeBlock.js';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: null };
    this.removeElem = this.removeElem.bind(this);
  }
  removeElem(index) {
    this.setState((state) => {
      state.content = state.content.slice(state.content.findIndex((el) => el.id === index) + 1, 1);
      // console.log(this.state);
      localStorage.setItem('content', JSON.stringify(this.state.content));
      return { content: state.content };
    });
  }
  componentDidMount() {
    let cont = localStorage.getItem('content');
    console.log(cont);
    if (cont && cont != "[]") {
      this.setState({
        content: JSON.parse(cont)
      });
    } else {
      let default_content = JSON.stringify([
        {
          "id": 0,
          'title': 'My super test title',
          'img': 'https://picsum.photos/200',
          'ingredients': ['Milk', 'Sugar', 'Chocolate', 'Coffee', 'Tea', 'Some sleep']
        }
      ]);
      localStorage.setItem('content', default_content);
      this.setState({
        content: JSON.parse(default_content)
      });
    }
  }
  render() {
    return (
      <div className="app">
        <header>
          <button className="btn__add"> + </button>
        </header>
        { this.state.content === null ? <div className="loader"> Loading... </div> :
          this.state.content.map((elem, index) => {
            return <RecipeBlock key={index}
              title={elem.title} img={elem.img}
              ingredients={elem.ingredients}
              remove={() => this.removeElem(elem.id)} />;
          })
        }
      </div>
    );
  }
}

// export default App;
