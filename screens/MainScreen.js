import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

const MainScreen = () => {
  const [defaultCADCurrency, setDefaultCADCurrency] = useState('CAD');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [value, setValue] = useState('1');
  const [currencyConversion, setCurrencyConversion] = useState(null);
  const [error, setError] = useState(null);

  const validCurrencies = ['USD', 'GBP', 'AUD', 'CAD']; 

  // API
  const apiKey = 'fca_live_7Pyh6zUBKQt18lfmbU51WEAkHrroXK0ZPoWyRYvH';
  const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=USD,AUD,GBP&base_currency=${defaultCADCurrency}`;

  const handleConvertCurrency = async () => {
    setCurrencyConversion(null); 
    setError(null); 

    if (!validCurrencies.includes(selectedCurrency.toUpperCase())) {
      setError('Error: Enter one of these following currencies (USD, CAD, GBP, AUD)');
      return;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.data && data.data[selectedCurrency]) {
        const rate = data.data[selectedCurrency];
        const result = (parseFloat(value) * rate).toFixed(2);
        setCurrencyConversion(result);
      } else {
        setError('Error: Invalid destination currency.');
      }
    } catch (err) {
      setError('Error getting exchange rates from the API.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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

