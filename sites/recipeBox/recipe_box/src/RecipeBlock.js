import React from 'react';
import './RecipeBlock.scss';

export default class RecipeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.toggleClass = this.toggleClass.bind(this);
  }
  toggleClass() {
    this.setState((state) => {
      return { hidden: !state.hidden }
    });
  }
  render() {
    return (
      <div className={`recipe ${this.state.hidden ? 'hidden' : 'show'}`}>
        <div className="title" onClick={this.toggleClass}> {this.props.title} </div>
        <div className="content">
          <div className="image"> <img src={this.props.img} /> </div>
          <ul className="ingredients">
            {
              this.props.ingredients.map((elem, index) => {
                return (
                  <li className="ingredient" key={index}>
                    {elem}
                  </li>
                )
              })
            }
          </ul>
          <div className="btns">
            <button className="btn__edit"> Edit </button>
            <button className="btn__remove" onClick={this.props.remove}> Remove </button>
          </div>
        </div>
      </div>
    );
  }
}