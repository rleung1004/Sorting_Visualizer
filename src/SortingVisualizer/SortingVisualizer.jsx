import React, { Component } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubbleSort";

// Change this value for the speed of animation
const ANIMATION_SPEED_MS = 5;

// Change this value for the speed of sorting
const SORT_SPEED_MS = 1;

// Change this value for the number of bars (values) in the array
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of array bars
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars when being compared throughout the animation
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomInt(5, 730));
    }
    this.setState({ array });
  }

  animationsHelper(animations) {
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIndex, barTwoIndex] = animations[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;

      setTimeout(() => {
        animations.pop();
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        let tempHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = tempHeight;
      }, (i + 1) * SORT_SPEED_MS);
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {}

  heapSort() {}

  bubbleSort() {
    setTimeout(() => {
      const animations = getBubbleSortAnimations(this.state.array);
      this.animationsHelper(animations);
    });
    return;
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
            ></div>
          ))}
          <div className="menu">
            <button onClick={() => this.resetArray()}>
              Generate New Array
            </button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          </div>
        </div>
      </>
    );
  }
}

// function that generate random numbers based on interval
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
