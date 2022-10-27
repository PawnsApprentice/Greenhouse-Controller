import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ControllerRow = ({name, constraints, status}) => {
  const [toggleNotify, setToggleNotify] = useState(false);
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    if (status === 1) {
      setToggleState(true);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#3EB489',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        width: '88%',
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: '900', fontSize: 20, color: 'white'}}>
        {name}
      </Text>
      <View>
        {constraints.map((constraints, index) => {
          if (constraints.high !== '') {
            return (
              <Text style={{fontWeight: '900', color: 'white'}} key={index}>
                {constraints.low}
                {'<'}
                {constraints.name}
                {'<'}
                {constraints.high}
              </Text>
            );
          } else {
            return (
              <Text style={{fontWeight: '900', color: 'white'}} key={index}>
                {constraints.low}
                {'<'}
                {constraints.name}
              </Text>
            );
          }
        })}
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
          Notify
        </Text>
        <CheckBox
          disabled={false}
          value={toggleNotify}
          onValueChange={newValue => setToggleNotify(newValue)}
          tintColors={{true: '#CD5C5C', false: 'black'}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
          Active/Passive
        </Text>
        <CheckBox
          disabled={false}
          value={toggleState}
          onValueChange={newValue => setToggleState(newValue)}
          tintColors={{true: '#CD5C5C', false: 'black'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ControllerRow;
