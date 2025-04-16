import { Text, View, Switch, StatusBar, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/features/store";
import { toggleTheme } from "@/features/themeSlice";
import MyKeyboard from "@/components/MyKeyboard";

const { width, height } = Dimensions.get('window');
export default function Index() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggle = (value: boolean) => {
    dispatch(toggleTheme(value))
  }
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' } 
    ]}>
      <StatusBar barStyle={"dark-content"}  backgroundColor="#f5f5f5" />
  
      <View style={styles.switchContainer}>
        <Text style={[styles.text, {color: isDarkMode ? '#fff' : '#000'}]}>{ isDarkMode ? 'Dark mode' : 'Light mode' }</Text>
        <Switch value={isDarkMode} onValueChange={handleToggle} />
      </View>

      <View style={styles.keyboardContainer}>
        <MyKeyboard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  keyboardContainer: {
    justifyContent: 'flex-end',
  },
})
