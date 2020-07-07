import React, { Component } from "react";
import { connect } from "react-redux";
import { drawCards } from "./store/actions/index.js";
import Async from "react-async";
import SingleCard from "./components/SingleCard";

class App extends Component {
  render() {
    console.log(this.props);

    return (
      <>
        <div className="container">
          <Async promiseFn={this.props.drawCards}>
            {({ data, err, isLoading }) => {
              if (isLoading) return "Loading...";
              if (err) return `Something went wrong: ${err.message}`;

              if (data) {
                return data.payload.cards.map((x) => {
                  return <SingleCard key={x.code} cardObject={x} />;
                });
              }
            }}
          </Async>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player1: state.player1,
  };
};

export default connect(mapStateToProps, { drawCards })(App);
