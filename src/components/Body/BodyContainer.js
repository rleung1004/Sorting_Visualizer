import { connect } from "react-redux";
import Body from "./Body.jsx";

const mapStateToProps = ({
  array,
  currentBubble,
  currentHeap,
  currentMerge,
  currentQuick,
  pivot,
  currentSorted,
  currentSwappers,
}) => ({
  array,
  currentBubble,
  currentHeap,
  currentMerge,
  currentQuick,
  pivot,
  currentSorted,
  currentSwappers,
});

const mapDispatchToProps = () => (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
