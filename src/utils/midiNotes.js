

const midiNoteArr = () => {
    const letters = ["A", "B", "C", "D", "E", "F", "G"];
    let newArr = [];

    for (let octave = -1; octave < 8; octave++) {
      letters.forEach((letter, index) => {
        if (letter === "B" || letter === "E") {
          newArr.push(letter + octave);
        } else {
          newArr.push(letter + octave);
          newArr.push(letter + "#" + octave);
        }
        letter = letters[index];
      });
    }
    console.log("this is called!!!!!")
    return newArr;
  };

  const midiNotes = midiNoteArr()

  export default midiNotes