import {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {FAB, Button, Input, ButtonGroup} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GreenhouseRow from '../../components/GreenhouseRow';
import Ionicons from 'react-native-vector-icons/Ionicons';

function GreenhouseController({navigation}) {
  const data = [
    {label: 'Greenhouse 1', value: 'Greenhouse 1'},
    {label: 'Greenhouse 2', value: 'Greenhouse 2'},
    {label: 'Greenhouse 3', value: 'Greenhouse 3'},
  ];

  const [greenhouseSelected, setGreenhouseSelected] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [controllers, setControllers] = useState([
    {
      greenhouse: 'Greenhouse 1',
      name: 'Fan 1',
      icon: 'fan',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 1',
      name: 'Door 1',
      icon: 'door',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 1',
      name: 'Light 1',
      icon: 'light',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 1',
      name: 'Valve 1',
      icon: 'valve',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 1',
      name: 'Fog 1',
      icon: 'fog',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Door 3',
      icon: 'door',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Door 3',
      icon: 'door',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Door 3',
      icon: 'door',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Fog 3',
      icon: 'fog',
      status: 'CLOSED',
    },

    {
      greenhouse: 'Greenhouse 3',
      name: 'Valve 3',
      icon: 'valve',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Fan 3',
      icon: 'fan',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 2',
      name: 'Fan 2',
      icon: 'fan',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 1',
      name: 'Fog 1',
      icon: 'fog',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Door 3',
      icon: 'door',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Fog 3',
      icon: 'fog',
      status: 'CLOSED',
    },

    {
      greenhouse: 'Greenhouse 3',
      name: 'Valve 3',
      icon: 'valve',
      status: 'OPEN',
    },
    {
      greenhouse: 'Greenhouse 3',
      name: 'Fan 3',
      icon: 'fan',
      status: 'CLOSED',
    },
    {
      greenhouse: 'Greenhouse 2',
      name: 'Fan 2',
      icon: 'fan',
      status: 'CLOSED',
    },
  ]);

  // useEffect(() => {
  //   {
  //   }
  // }, [greenhouseSelected]);

  const renderLabel = () => {
    if (greenhouseSelected || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'green'}]}>
          Greenhouses
        </Text>
      );
    }
    return null;
  };

  const deleteController = index => {
    let itemsCopy = [...controllers];
    itemsCopy.splice(index, 1);
    setControllers(itemsCopy);
  };

  return (
    <>
      <View style={styles.dropdownContainer}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'green'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Greenhouse' : '...'}
          searchPlaceholder="Search..."
          value={greenhouseSelected}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setGreenhouseSelected(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'green' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View style={{backgroundColor: 'white', height: '89%'}}>
        <ScrollView>
          {greenhouseSelected !== '' ? (
            controllers.map((controllers, index) => {
              if (controllers.greenhouse === greenhouseSelected) {
                return (
                  <View
                    key={index}
                    style={{flexDirection: 'row', marginLeft: 10}}>
                    <GreenhouseRow
                      name={controllers.name}
                      icon={controllers.icon}
                      status={controllers.status}
                    />
                    <Button
                      buttonStyle={{
                        borderRadius: 10,
                        marginTop: 20,
                        marginLeft: 10,
                      }}
                      onPress={() => {
                        deleteController(index);
                      }}
                      color="#CD5C5C">
                      <Ionicons name="trash" size={20} />
                    </Button>
                  </View>
                );
              }
            })
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <View></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default GreenhouseController;
