import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { FetchLanguages } from './lib/FetchCode';
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [code, setCode] = useState('print("Hello, World!")')
  const [selectedLanguage, setSelectedLanguage] = useState({})
  const [languagesAvailable, setLanguagesAvailable]=useState(null)
  useEffect(() => {
   fethchData()  
  }, [])
  const fethchData = async () => {
    const response = await fetch('https://emkc.org/api/v2/piston/runtimes')
    const data = await response.json()
    setLanguagesAvailable(data);
    
  }
console.log( "languages Available", languagesAvailable);
  return (
    <View style={styles.container}>
      {Array.isArray(languagesAvailable) && (
        <Text>{languagesAvailable.length} languages</Text>
      )}
      <Picker
        selectedValue={selectedLanguage}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        {Array.isArray(languagesAvailable) &&
          languagesAvailable.map((language, index) => (
            <Picker.Item
              label={`${language.language} ${language.version}`}
              value={language.name}
              key={index}
            />
          ))}
      </Picker>
      <TextInput
        style={styles.Coding}
        autoCorrect={false}
        numberOfLine={20}
        multiline={true}
      />
      <Text>Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Coding: {
    backgroundColor: 'red'
  }
});
