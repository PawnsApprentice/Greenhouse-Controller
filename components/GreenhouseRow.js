import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GreenhouseRow = ({name, icon, status}) => {
  const [iconName, setIconName] = useState('fan');
  const [statusValue, setStatusValue] = useState('');

  useEffect(() => {
    setStatusValue(status);
    if (icon === 'fan') {
      setIconName('fan');
    } else if (icon === 'door') {
      setIconName('door');
    } else if (icon === 'light') {
      setIconName('lightbulb-on-outline');
    } else if (icon === 'valve') {
      setIconName('valve');
    } else if (icon === 'fog') {
      setIconName('weather-fog');
    }
  }, []);

  const toggleState = () => {
    if (statusValue === 'CLOSED') {
      setStatusValue('OPEN');
    } else {
      setStatusValue('CLOSED');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        toggleState();
      }}
      style={{
        backgroundColor: '#3EB489',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 4,
        width: '80%',
        height: 75,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
          {name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Icon name={iconName} size={50} />
      </View>
      <View style={{flex: 1}}>
        {statusValue === 'CLOSED' ? (
          <Text style={{fontWeight: 'bold', fontSize: 25, color: '#CD5C5C'}}>
            {statusValue}
          </Text>
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
            {statusValue}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GreenhouseRow;
