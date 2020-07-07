import React, { Component } from "react";
import { connect } from "react-redux";
import { drawCards } from "./store/actions/index.js";
import SingleCard from "./components/SingleCard";

class App extends Component {
  componentDidMount() {
    this.props.drawCards();
  }

  render() {
    if (
      this.props.player1 === [] ||
      this.props.table === [] ||
      this.props.player2 === []
    ) {
      return (
        <div className="container">
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <>
        <div className="container">
          {/* PLAYER ONE CARDS */}
          <div className="player1">
            {this.props.player1.map((x) => {
              return (
                <SingleCard
                  order="player1"
                  type="SELECT_PLAYER1_CARD"
                  key={x.code}
                  cardObject={x}
                />
              );
            })}
          </div>
          {/* TABLE CARDS */}
          <div className="board">
            {this.props.table.map((x) => {
              // console.log(x.value);

              return (
                <SingleCard
                  order="board"
                  type="ADD_TO_SELECTED"
                  key={x.code}
                  cardObject={x}
                />
              );
            })}
          </div>
          {/* PLAYER TWO CARDS */}
          <div className="player2">
            {this.props.player2.map((x) => {
              return (
                <SingleCard
                  order="player2"
                  type="SELECT_PLAYER2_CARD"
                  key={x.code}
                  cardObject={x}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player1: state.player1,
    table: state.table,
    player2: state.player2,
    selected: state.selectedCards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    drawCards: () => dispatch(drawCards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
