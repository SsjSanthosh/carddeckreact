import React, { Component } from "react";
import Card from "./Card.js";
class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = { cards: [], deck_id: "", done: false };
  }
  async componentDidMount() {
    const data = await fetch(
      "https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    const deck = await data.json();
    this.state.deck_id = deck.deck_id;
  }

  handleClick = async () => {
    const url = `https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`;
    const data = await fetch(url);
    const card = await data.json();
    console.log(card.success);
    if (card.success) {
      const img = card.cards[0].image;
      this.setState({ cards: [...this.state.cards, <Card img={img} />] });
    } else {
      this.setState({ done: true });
    }
  };
  render() {
    return (
      <div>
        <h1 className="title">React Card Dealer! </h1>
        <h2 className="subtitle">A little demo with react</h2>
        {!this.state.done ? (
          <button onClick={this.handleClick} className="btn">
            Deal a card!
          </button>
        ) : (
          "ALL CARDS DEALT!"
        )}
        {this.state.cards}
      </div>
    );
  }
}

export default Deck;
