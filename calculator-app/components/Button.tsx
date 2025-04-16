import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/store'

interface ButtonProps {
    onPress: () => void;
    title: any;
    isBlue?: boolean;
    isGray?: boolean;
}

const Button = ({ onPress, title, isBlue, isGray }: ButtonProps) => {
  const isDarkMode = useSelector((state: RootState) => {
    return state?.theme?.isDarkMode;
  })
  return (
    <TouchableOpacity
      style={[
        styles?.button,
        isBlue
        ? styles?.btnBlue
        : isGray
        ? styles?.btnGray
        : isDarkMode
        ? styles?.btnDark
        : styles?.btnLight,
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        isBlue || isGray ? styles?.textWhite : isDarkMode ? styles?.textLight : styles?.textDark
      ]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    btnBlue: {
        backgroundColor: '#007BFF',
    },
    btnGray: {
        backgroundColor: '#A6A6A6',
    },
    btnLight: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    btnDark: {
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#555'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textLight: {
        color: '#fff',
    },
    textWhite: {
        color: '#fff',
    },
    textDark: {
        color: '#000',
    }
})

export default Button;
