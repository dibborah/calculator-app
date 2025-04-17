import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import Button from './Button'

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const MyKeyboard = () => {
  const [result, setResult] = useState<null | number>(null);
  const [viewPanel, setViewPanel] = useState<string>("")

  const handleNumberPress = (num: string) => {
    setViewPanel((viewPanel + num).replace(/^0+(?=\d)/, '').replace(/^[*\/%](\d+)/, '$1'));
    if (result) {
        setResult(null);
    }
  }

  const handleOperationPress = (op: string) => {
    setViewPanel((viewPanel + op)
     .replace(/[-+*/%.]+/g, op)
    );
  }

  const deleteLastDigit = () => {
    setViewPanel((previous: string) => previous.slice(0, -1));
  }

  const clear = () => {
    setResult(null);
    setViewPanel('');
  }

  const getResult = () => {
    if (viewPanel) {
        let temp = '';
        let lastChar = '';
        let answer = null;

        if (viewPanel.includes('%')){
          temp = viewPanel.replace('%', '/100*')
          lastChar = temp.slice(-1);

          if (!numbers.includes(lastChar)) {
            let k = (temp.slice(0, -1))
            answer = eval(k);
          } else {
            answer = eval(temp);
          };

        } else {
          lastChar = viewPanel.slice(-1);
          if (!numbers.includes(lastChar)) {
            temp = (viewPanel.slice(0, -1))
            answer = eval(temp);
          } else {
            answer = eval(viewPanel);
          };
          
        }

        setResult(answer);
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
        <Button title="⌫" isGray onPress={deleteLastDigit} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
    </View>

    <View style={styles.row}>
        <Button title="7" isGray onPress={() => handleNumberPress("7")} />
        <Button title="8" isGray onPress={() => handleNumberPress("8")} />
        <Button title="9" isGray onPress={() => handleNumberPress("9")} />
        <Button title="x" isBlue onPress={() => handleOperationPress("*")} />
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
        <Button title="00" isGray onPress={() => handleNumberPress("00")} />
        <Button title="0" isGray onPress={() => handleNumberPress("0")} />
        <Button title="." isGray onPress={() => handleOperationPress(".")} />
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
