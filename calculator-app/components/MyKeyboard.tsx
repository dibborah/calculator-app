import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import Button from './Button'

const MyKeyboard = () => {
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [result, setResult] = useState<null | number>(null);
  const [viewPanel, setViewPanel] = useState<string>("")

  // Bugs
  // multiple operation cannot be performed just can be seen

  const handleNumberPress = (num: string) => {
    setViewPanel((viewPanel + num).replace(/^0+(?=\d)/, ''));
    if (result) {
        setFirstNumber(num);
        setResult(null);
    } else {
        setFirstNumber(firstNumber + num);
    }
  }

  const handleOperationPress = (op: string) => {
    setViewPanel(viewPanel + op);
    if (firstNumber) {
        setOperation(op);
        setSecondNumber(firstNumber);
        setFirstNumber("");
    }
  }

  const toggleSign = () => {
    if (firstNumber) {
        setFirstNumber((previous) => previous.startsWith("-") ? previous.substring(1) : `${previous}`);
    }    
  }

  const deleteLastDigit = () => {
    setFirstNumber((previous: string) => previous.slice(0, -1));
  }

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
    setViewPanel('');
  }

  // const getResult = () => {
  //   if (firstNumber && secondNumber) {
  //       const num1 = parseFloat(secondNumber);
  //       const num2 = parseFloat(firstNumber);

  //       let answer: number | null = null;

  //       switch(operation) { 
  //           case "+":
  //               answer = num1 + num2;
  //               break;
  //           case "-" :
  //               answer = num1 - num2;
  //               break; 
  //           case "x" :
  //               answer = num1 * num2;
  //               break; 
  //           case "÷" :
  //               answer = num2 !== 0 ? num1 / num2 : null;
  //               break; 
  //           case "%" :
  //               answer = (num1 / 100) * num2;
  //               break; 
  //           default: 
  //             break;
  //       }

  //       setResult(answer);
  //       setFirstNumber(answer?.toString() ?? '');
  //       setSecondNumber('');
  //       setOperation('');   
  //       setViewPanel('');
  //   }
  // }


  // eval will solve my problem
  // To make the multi calculation possible
  // There are some issue with this function
  const getResult = () => {
    if (viewPanel) {
        let answer = eval(viewPanel);
        setResult(answer);
        setFirstNumber(answer?.toString() ?? '');
        setSecondNumber('');
        setOperation('');   
        setViewPanel('');
    }
  }

  return (
    <View>

    <View style={styles.display}>
      <Text style={styles.resultText}>
        {viewPanel || (result ?? 0)}
      </Text>
    </View>

    <View style={styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="+/-" isGray onPress={toggleSign} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("÷")} />
    </View>

    <View style={styles.row}>
        <Button title="7" isGray onPress={() => handleNumberPress("7")} />
        <Button title="8" isGray onPress={() => handleNumberPress("8")} />
        <Button title="9" isGray onPress={() => handleNumberPress("9")} />
        <Button title="x" isBlue onPress={() => handleOperationPress("x")} />
    </View>

    <View style={styles.row}>
        <Button title="4" isGray onPress={() => handleNumberPress("4")} />
        <Button title="5" isGray onPress={() => handleNumberPress("5")} />
        <Button title="6" isGray onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
    </View>

    <View style={styles.row}>
        <Button title="1" isGray onPress={() => handleNumberPress("1")} />
        <Button title="2" isGray onPress={() => handleNumberPress("2")} />
        <Button title="3" isGray onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
    </View>
    
    <View style={styles.row}>
        <Button title="0" isGray onPress={() => handleNumberPress("0")} />
        <Button title="." isGray onPress={() => handleOperationPress(".")} />
        <Button title="⌫" isGray onPress={deleteLastDigit} />
        <Button title="=" isBlue onPress={getResult} />
    </View>

    </View>
  )
}

export default MyKeyboard;

const styles = StyleSheet.create({
    display: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#eeee',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        margin: 2
    },

    resultText: {
        fontSize: 36,
        color: '#000',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
})
