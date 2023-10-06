import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Card, CardStatus } from "./Card";
import logoCpp from "./assets/logo_cpp.png";
import logoHtml5 from "./assets/logo_html5.png";
import logoJava from "./assets/logo_java.png";
import logoPhp from "./assets/logo_php.png";
import logoPython from "./assets/logo_python.png";

export function App() {
  const [board, setBoard] = useState(() => getInitialBoard());
  const [statuses, setStatuses] = useState<CardStatus[]>(() => Array(board.length).fill(CardStatus.Visible));
  const [disabled, setDisabled] = useState(true);

  useEffect(start, []);

  function start() {
    setTimeout(() => {
      setDisabled(false);
      setStatuses(Array(statuses.length).fill(CardStatus.Hidden));
    }, 1500);
  }

  function reset() {
    const newBoard = [...board];
    shuffleArray(newBoard);
    setBoard(newBoard);
    setDisabled(true);
    setStatuses(Array(statuses.length).fill(CardStatus.Visible));
    start();
  }

  function onPressCard(i: number) {
    const status = statuses[i];

    if (status === CardStatus.Visible) {
      return;
    }

    const newStatuses = [...statuses];

    if (status === CardStatus.Selected) {
      newStatuses[i] = CardStatus.Hidden;
      setStatuses(newStatuses);
      return;
    }

    const j = statuses.findIndex((status, j) => i !== j && status === CardStatus.Selected);

    if (j === -1) {
      newStatuses[i] = CardStatus.Selected;
    } else {
      if (board[i].id === board[j].id) {
        newStatuses[i] = CardStatus.Visible;
        newStatuses[j] = CardStatus.Visible;
      } else {
        newStatuses[i] = CardStatus.Selected;
        setDisabled(true);

        setTimeout(() => {
          const newStatuses = [...statuses];
          newStatuses[i] = CardStatus.Hidden;
          newStatuses[j] = CardStatus.Hidden;
          setDisabled(false);
          setStatuses(newStatuses);
        }, 1000);
      }
    }

    setStatuses(newStatuses);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reset} style={styles.resetButton}>
        <Text style={styles.resetButtonIcon}>{"\u21BB"}</Text>
      </TouchableOpacity>

      <View style={styles.board}>
        {board.map((card, i) => (
          <Card key={i} image={card.image} status={statuses[i]} disabled={disabled} onPress={() => onPressCard(i)} />
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function getInitialBoard() {
  const board = [
    { id: 0, image: logoCpp },
    { id: 1, image: logoHtml5 },
    { id: 2, image: logoJava },
    { id: 3, image: logoPhp },
    { id: 4, image: logoPython },
  ];

  for (let i = 0; i < 5; i++) {
    board.push({ ...board[i] });
  }

  shuffleArray(board);
  return board;
}

// https://stackoverflow.com/a/12646864
function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    maxWidth: 131 * 5 + 5 * 4,
    padding: 10,
  },
  resetButton: {
    alignSelf: "flex-end",
  },
  resetButtonIcon: {
    fontSize: 50,
  },
});

registerRootComponent(App);
