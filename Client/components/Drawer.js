import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { theme } from "../core/theme";

const Drawer = ({ children, step }) => {
  // Needed in order to use .show()
  const bottomSheet = useRef();

  const [height, setHeight] = useState(300);
  const changeHeight = () => {
    if (step !== 1) {
      setHeight(600);
    } else {
      setHeight(300);
    }
  };
  useEffect(() => {
    changeHeight();
    console.log(height, "height");
    console.log(step, "step");
  }, [step]);

  return (
    <>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={height}>
        {children}
      </BottomSheet>
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      ></TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 20,
    width: 150,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});

export default Drawer;
