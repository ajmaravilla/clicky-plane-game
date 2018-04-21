//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import plane from "./plane.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    plane,
    clickedPlane: [],
    score: 0
  };

//when you click on a card ... the plane is taken out of the array
  imageClick = event => {
    const currentPlane = event.target.alt;
    const PlaneAlreadyClicked =
      this.state.clickedPlane.indexOf(currentPlane) > -1;

//if you click on a plane that has already been selected, the game is reset and cards reordered
    if (PlaneAlreadyClicked) {
      this.setState({
        plane: this.state.plane.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPlane: [],
        score: 0
      });
        alert("All flights grounded. Play again?");

//if you click on an available plane, your score is increased and cards reordered
    } else {
      this.setState(
        {
          plane: this.state.plane.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPlane: this.state.clickedPlane.concat(
            currentPlane
          ),
          score: this.state.score + 1
        },
// Select 12 planes correctly will display a congratulations message and restart the game
      () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              plane: this.state.plane.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPlane: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.plane.map(plane => (
            <FriendCard
              imageClick={this.imageClick}
              id={plane.id}
              key={plane.id}
              image={plane.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;