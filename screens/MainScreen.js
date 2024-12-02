// Imports
import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Creating a constant for the MainScreen
const MainScreen = () => {
  const [defaultCADCurrency, setDefaultCADCurrency] = useState('CAD'); // Handle currency, setting the defult curr to CAD
  const [selectedCurrency, setSelectedCurrency] = useState(''); // initialized this to handle user-inputs 
  const [value, setValue] = useState('1'); // Handle values, setting the default value to 1
  const [currencyConversion, setCurrencyConversion] = useState(null); // sotring the currency result
  const [error, setError] = useState(null); // error handling

  // listing the valid currency a user can choose
  const validCurrencies = ['USD', 'GBP', 'AUD', 'CAD']; 

  // API implementation
  // API key
  const apiKey = 'fca_live_7Pyh6zUBKQt18lfmbU51WEAkHrroXK0ZPoWyRYvH'; 
  // API endpoint
  const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=USD,AUD,GBP&base_currency=${defaultCADCurrency}`;

  // THis function will hadle the conversion process when the button is activated
  const handleConvertCurrency = async () => {
    setCurrencyConversion(null); // the curr will get reset before new request
    setError(null); // clearing the error messages displayd

    // checking to see if the curr entered by the user is valid
    if (!validCurrencies.includes(selectedCurrency.toUpperCase())) {
      // if invalid input error is displayed
      setError('Error: Enter one of these following currencies (USD, CAD, GBP, AUD)');
      return; // exists if not valid
    }

    try {
      const response = await fetch(apiUrl); // getting curr data from API 
      const data = await response.json(); // parse into a json

      // if valid response
      if (data && data.data && data.data[selectedCurrency]) {
        const rate = data.data[selectedCurrency]; // getting the conversion rate
        const result = (parseFloat(value) * rate).toFixed(2); // cal the currency and rounding to 2 decimals
        setCurrencyConversion(result); // updatating the result
      } else {
        setError('Error: Invalid destination currency.'); // throwing error if curr in API not found
      }
    } catch (err) {
      setError('Error getting exchange rates from the API.');// throeing error if API response fails
    }
  };
// keybord disappears when clecked elsewhere
  const dismissKeyboard = () => {
    Keyboard.dismiss(); 
  };

  // keyboard handling
  // user input handling
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.heading}>Currency Converter</Text>
        
        <Text>Base Currency (e.g. CAD, USD, GBP, AUD):</Text>
        <TextInput
          style={styles.input}
          value={defaultCADCurrency}
          onChangeText={setDefaultCADCurrency}
          placeholder="CAD, USD, GBP, AUD"
        />

        <Text>Destination Currency (e.g. CAD, USD, GBP, AUD):</Text>
        <TextInput
          style={styles.input}
          value={selectedCurrency}
          onChangeText={setSelectedCurrency}
          placeholder="CAD, USD, GBP, AUD"
        />

        <Text>Value (default 1):</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="1"
          keyboardType="numeric"
        />

        <Button title="Convert" onPress={handleConvertCurrency} />

        {currencyConversion && (
          <Text style={styles.result}>
            Converted Amount: {currencyConversion} {selectedCurrency}
          </Text>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

  // ux and ui 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    margin: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default MainScreen;

