
import React from 'react'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeContext } from './src/Context/ThemeContext'
import { StyleSheet,Text,View,Switch } from 'react-native'
import { myColors } from './src/styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from './src/components/Button'
import MyKeyboard from './src/components/MyKeyboard'


export default function App() {
    const [theme, setTheme] = useState('light');
    return (
      <ThemeContext.Provider value ={theme}>
        <SafeAreaView style={theme === 'light' ? styles.container : [styles.container,{backgroundColor: '#000'}]}>
          <StatusBar style='auto' />
          <Switch  
           value={theme === 'Light'}
           onValueChange={()=> setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        <MyKeyboard/>

        </SafeAreaView>
      </ThemeContext.Provider>
    );
}
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: myColors.light,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
  })
  


