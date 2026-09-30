import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const ACTIVE_CARD_COLOR = '#1D1E33';
const INACTIVE_CARD_COLOR = '#111328';
const BOTTOM_CONTAINER_COLOR = '#EB1555';

export default function BMICalculator() {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(20);
  
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  const [bmiText, setBmiText] = useState('');
  const [bmiInterpretation, setBmiInterpretation] = useState('');

  const calculateBMI = () => {
    const bmi = weight / Math.pow(height / 100, 2);
    setBmiResult(bmi.toFixed(1));

    if (bmi >= 25) {
      setBmiText('OVERWEIGHT');
      setBmiInterpretation('You have a higher than normal body weight. Try to exercise more.');
    } else if (bmi > 18.5) {
      setBmiText('NORMAL');
      setBmiInterpretation('You have a normal body weight. Good job!');
    } else {
      setBmiText('UNDERWEIGHT');
      setBmiInterpretation('You have a lower than normal body weight. You can eat a bit more.');
    }
  };

  const resetCalculator = () => {
    setBmiResult(null);
  };

  if (bmiResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0A0E21" />
        <Text style={styles.title}>Your Result</Text>
        <View style={styles.resultCard}>
          <Text style={[styles.resultText, { color: bmiText === 'NORMAL' ? '#24D876' : '#EB1555' }]}>
            {bmiText}
          </Text>
          <Text style={styles.bmiValue}>{bmiResult}</Text>
          <Text style={styles.interpretation}>{bmiInterpretation}</Text>
        </View>
        <TouchableOpacity style={styles.bottomButton} onPress={resetCalculator}>
          <Text style={styles.bottomButtonText}>RE-CALCULATE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E21" />
      <Text style={styles.header}>BMI CALCULATOR</Text>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: gender === 'male' ? ACTIVE_CARD_COLOR : INACTIVE_CARD_COLOR }]}
          onPress={() => setGender('male')}
        >
          <MaterialCommunityIcons name="gender-male" size={80} color="white" />
          <Text style={styles.label}>MALE</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: gender === 'female' ? ACTIVE_CARD_COLOR : INACTIVE_CARD_COLOR }]}
          onPress={() => setGender('female')}
        >
          <MaterialCommunityIcons name="gender-female" size={80} color="white" />
          <Text style={styles.label}>FEMALE</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.middleCard]}>
        <Text style={styles.label}>HEIGHT</Text>
        <View style={styles.rowBaseline}>
          <Text style={styles.number}>{height}</Text>
          <Text style={styles.label}>cm</Text>
        </View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={100}
          maximumValue={220}
          step={1}
          value={height}
          onValueChange={setHeight}
          minimumTrackTintColor="#EB1555"
          maximumTrackTintColor="#8D8E98"
          thumbTintColor="#EB1555"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>WEIGHT</Text>
          <Text style={styles.number}>{weight}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roundButton} onPress={() => setWeight(w => Math.max(0, w - 1))}>
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} onPress={() => setWeight(w => w + 1)}>
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>AGE</Text>
          <Text style={styles.number}>{age}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roundButton} onPress={() => setAge(a => Math.max(0, a - 1))}>
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} onPress={() => setAge(a => a + 1)}>
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bottomButton} onPress={calculateBMI}>
        <Text style={styles.bottomButtonText}>CALCULATE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E21',
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: INACTIVE_CARD_COLOR,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCard: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: '#8D8E98',
    marginTop: 15,
  },
  number: {
    fontSize: 50,
    fontWeight: '900',
    color: 'white',
  },
  rowBaseline: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  roundButton: {
    backgroundColor: '#4C4F5E',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  bottomButton: {
    backgroundColor: BOTTOM_CONTAINER_COLOR,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 20,
  },
  resultCard: {
    flex: 1,
    backgroundColor: ACTIVE_CARD_COLOR,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bmiValue: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white',
  },
  interpretation: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  }
});
