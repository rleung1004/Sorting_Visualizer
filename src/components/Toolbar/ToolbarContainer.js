import { connect } from "react-redux";
import Toolbar from "./Toolbar.jsx";
import { setArray } from "../../reducers/array";
import { setAlgorithm } from "../../reducers/algorithm";
import { setCurrentSorted } from "../../reducers/sorted";
import { setRunning } from "../../reducers/running";
import bubbleSort from "../../SortingAlgorithms/bubbleSort";
import mergeSort from "../../SortingAlgorithms/mergeSort";
import heapSort from "../../SortingAlgorithms/heapSort";
import quickSort from "../../SortingAlgorithms/quickSort";

const mapStateToProps = ({ array, algorithm, isRunning }) => ({
  array,
  algorithm,
  isRunning,
});

const mapDispatchToProps = () => (dispatch) => ({
  generateArray: (length) => {
    let array = [];
    while (array.length < length) {
      array.push(Math.floor(Math.random() * 200) + 10);
    }
    dispatch(setArray(array));
    dispatch(setCurrentSorted([]));
  },

  updateAlgorithm: (algorithm) => {
    dispatch(setAlgorithm(algorithm));
  },

  sort: (algorithm, array, speed) => {
    let doSort =
      algorithm === "bubbleSort"
        ? bubbleSort
        : algorithm === "mergeSort"
        ? mergeSort
        : algorithm === "heapSort"
        ? heapSort
        : algorithm === "quickSort"
        ? quickSort
        : null;
    dispatch(setCurrentSorted([]));
    dispatch(setRunning(true));
    doSort(array, dispatch, speed);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);