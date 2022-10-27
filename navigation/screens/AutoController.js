import {Fragment} from 'react';
import {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {FAB, Button, Input, ButtonGroup} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ControllerRow from '../../components/ControllerRow';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const status = [
  {label: 'Active', value: 1},
  {label: 'Passive', value: 0},
];

function AutoController({navigation}) {
  const [greenhouses, setGreenhouses] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const [greenhouseSelected, setGreenhouseSelected] = useState('');
  const [controllerStatus, setControllerStatus] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const sheetRef = useRef(null);
  const mutationRef = useRef(greenhouseSelected);
  const controllerSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isControllerOpen, setIsControllerOpen] = useState(false);
  const [greenhouseValue, setGreenhouseValue] = useState('');
  const [constraint1, setConstraint1] = useState('');
  const [constraintName, setConstraintName] = useState('');
  const [constraint2, setConstraint2] = useState('');
  const [controllerName, setControllerName] = useState('');
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const snapPointsController = useMemo(() => ['80%', '100%'], []);

  useEffect(() => {
    mutationRef.current = greenhouseSelected;
  }, [greenhouseSelected]);

  //renders label for the dropdown
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

  //bottom sheet JSX for the add greenhouse button
  const bottomGreenhouse = (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        setIsOpen(false);
        clearFormGreenhouse();
      }}>
      <BottomSheetView>
        <View style={{paddingLeft: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
            Create a new Greenhouse
          </Text>
          <Input
            onChangeText={value => setGreenhouseValue(value)}
            inputStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
            }}
            inputContainerStyle={{
              marginTop: 10,
              marginLeft: -10,
              borderWidth: 1,
              height: 40,
              width: '50%',
              borderColor: '#2F4972',
              borderRadius: 10,
              backgroundColor: '#E2E2E2',
            }}
            placeholder="Name"
          />
          <Button
            buttonStyle={{width: '30%'}}
            color="#3EB489"
            onPress={() => {
              addGreenhouse();
            }}>
            Accept
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );

  //adds a greenhouse for the dropdown
  const addGreenhouse = value => {
    if (greenhouseValue !== '') {
      let greenhouseObject = {label: greenhouseValue, value: greenhouseValue};
      setGreenhouses(greenhouses => [...greenhouses, greenhouseObject]);
      setIsOpen(false);
      clearFormGreenhouse();
    } else {
      showToast('Greenhouse name cannot be empty!');
    }
  };

  //opens the bottom sheet for the purpose of adding a greenhouse
  const openGreenhouseForm = useCallback(index => {
    setIsOpen(true);
    sheetRef.current?.snapToIndex(index);
  }, []);

  //clears the greenhouse state in the greenhouse bottom sheet
  const clearFormGreenhouse = () => {
    setGreenhouseValue('');
  };

  //bottom sheet component for the controller add button
  const bottomControllers = (
    <BottomSheet
      ref={controllerSheetRef}
      snapPoints={snapPointsController}
      enablePanDownToClose={true}
      onClose={() => {
        setIsControllerOpen(false);
        clearFormController();
      }}>
      <BottomSheetView>
        <View style={{paddingLeft: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
            Create a new Controller
          </Text>
          <Input
            onChangeText={value => setControllerName(value)}
            inputStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
            }}
            inputContainerStyle={{
              marginTop: 10,
              marginLeft: -10,
              borderWidth: 1,
              height: 40,
              width: 150,
              borderColor: '#2F4972',
              borderRadius: 10,
              backgroundColor: '#E2E2E2',
            }}
            placeholder="Controller Name"
          />
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'gray'}}>
            Constraints
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Input
                onChangeText={value => setConstraint1(value)}
                inputStyle={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'black',
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  marginLeft: -10,
                  borderWidth: 1,
                  height: 40,
                  width: 60,
                  borderColor: '#2F4972',
                  borderRadius: 10,
                  backgroundColor: '#E2E2E2',
                }}
                placeholder="Value"
                keyboardType="number-pad"
              />
            </View>
            <View>
              <Text style={{marginTop: 15, fontSize: 30}}>{'<'}</Text>
            </View>
            <View>
              <Input
                onChangeText={value => setConstraintName(value)}
                inputStyle={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'black',
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  marginLeft: 0,
                  borderWidth: 1,
                  height: 40,
                  width: 150,
                  borderColor: '#2F4972',
                  borderRadius: 10,
                  backgroundColor: '#E2E2E2',
                }}
                placeholder="Name"
              />
            </View>
            <View>
              <Text style={{marginTop: 15, fontSize: 30}}>{'<'}</Text>
            </View>
            <View>
              <Input
                onChangeText={value => setConstraint2(value)}
                inputStyle={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'black',
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  marginLeft: 0,
                  borderWidth: 1,
                  height: 40,
                  width: 60,
                  borderColor: '#2F4972',
                  borderRadius: 10,
                  backgroundColor: '#E2E2E2',
                }}
                placeholder="Value"
                keyboardType="number-pad"
              />
            </View>
          </View>
          {/*ControllerRows*/}
          <View style={{paddingBottom: 10}}>
            {constraints.map((constraints, index) => {
              return (
                <Text style={{fontWeight: 'bold'}} key={index}>
                  {constraints.low}
                  {'<'}
                  {constraints.name}
                  {'<'}
                  {constraints.high}
                </Text>
              );
            })}
          </View>

          <Button
            buttonStyle={{width: '30%'}}
            color="#3EB489"
            onPress={() => {
              addConstraints();
            }}>
            Add Constraint
          </Button>

          <View style={{marginTop: 20, width: '80%'}}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'green'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={status}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Status' : '...'}
              searchPlaceholder="Search..."
              value={controllerStatus}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setControllerStatus(item.value);
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

          <Button
            buttonStyle={{width: '30%', marginTop: 70}}
            color="#3EB489"
            onPress={() => {
              saveController();
            }}>
            Save
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );

  //controller delete function takes in index as param
  const deleteController = index => {
    let itemsCopy = [...controllers];
    itemsCopy.splice(index, 1);
    setControllers(itemsCopy);
  };

  //constraint add function for the component bottom sheet
  const addConstraints = () => {
    if (!isFinite(constraint1) || !isFinite(constraint2)) {
      console.log(isFinite(constraint2));
      showToast('Please enter a number as constraints');
      return;
    } else if (
      constraint1 !== '' &&
      constraint2 !== '' &&
      constraintName != ''
    ) {
      if (parseInt(constraint1) < parseInt(constraint2)) {
        let constraintObject = {
          low: constraint1,
          name: constraintName,
          high: constraint2,
        };
        setConstraints(constraints => [...constraints, constraintObject]);
      } else {
        showToast('First constraint greater than second');
      }
    } else if (
      (constraint1 !== '' || constraint2 !== '') &&
      constraintName != ''
    ) {
      let constraintObject = {
        low: constraint1,
        name: constraintName,
        high: constraint2,
      };
      setConstraints(constraints => [...constraints, constraintObject]);
    } else {
      showToast('Constraints cannot be empty');
    }
  };

  //saves controller after controller bottom sheet is filled
  const saveController = () => {
    if (
      constraints.length !== 0 &&
      controllerName != '' &&
      controllerStatus !== ''
    ) {
      let controllerObject = {
        name: controllerName,
        constraints: constraints,
        status: controllerStatus,
      };
      setControllers(controllers => [...controllers, controllerObject]);
      setIsControllerOpen(false);
      clearFormController();
    } else if (controllerName === '') {
      showToast('Controller name is empty');
    } else if (controllerStatus === '') {
      showToast('Set the status of the controller');
    } else {
      showToast('Please add a constraint');
    }
  };

  //opens the bottom sheet for the controller add purposes
  const openControllerForm = useCallback(index => {
    console.log(mutationRef.current);
    if (mutationRef.current !== '') {
      setIsControllerOpen(true);
      sheetRef.current?.snapToIndex(index);
    } else {
      showToast('Please Select a Greenhouse!');
    }
  }, []);

  //clears the controller state in the controller bottom sheet
  const clearFormController = () => {
    setConstraints([]);
    setControllerStatus('');
    setConstraint1('');
    setConstraint2('');
    setControllerName('');
    setConstraintName('');
  };

  //shows a toast depending on the input param
  const showToast = text => {
    Toast.show({
      type: 'error',
      text1: text,
    });
  };

  return (
    <>
      <View
        style={{opacity: isOpen || isControllerOpen ? 0.6 : 1}}
        pointerEvents={isOpen || isControllerOpen ? 'none' : 'auto'}>
        <View style={styles.dropdownContainer}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'green'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={greenhouses}
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
          <Button
            buttonStyle={{
              width: 135,
              marginTop: 10,
              backgroundColor: '#CD5C5C',
              borderRadius: 5,
            }}
            onPress={() => {
              openGreenhouseForm(0);
            }}>
            Add Greenhouse
          </Button>
        </View>
        <View style={{backgroundColor: 'white', height: '81%'}}>
          <ScrollView>
            <View style={styles.controllerContainer}>
              {/*ControllerRows*/}
              {controllers.map((controller, index) => {
                return (
                  <Fragment key={index}>
                    <View style={{flexDirection: 'row'}}>
                      <ControllerRow
                        name={controller.name}
                        constraints={controller.constraints}
                        status={controller.status}
                      />
                      <Button
                        buttonStyle={{
                          borderRadius: 10,
                          marginTop: 40,
                          marginLeft: 10,
                        }}
                        onPress={() => {
                          deleteController(index);
                        }}
                        color="#CD5C5C">
                        <Ionicons name="trash" size={20} />
                      </Button>
                    </View>
                  </Fragment>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FAB
          visible={isOpen | isControllerOpen ? false : true}
          disabled={isOpen | isControllerOpen ? true : false}
          icon={{name: 'add', color: 'green'}}
          color="white"
          size="large"
          buttonStyle={{color: '3EB489'}}
          onPress={() => {
            openControllerForm(0);
          }}
        />
      </View>
      {isOpen ? bottomGreenhouse : <></>}
      {isControllerOpen ? bottomControllers : <></>}
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  controllerContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 50,
    bottom: 40,
    right: 20,
  },

  //DROPDOWN
  dropdownContainer: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
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
    top: 19,
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

export default AutoController;
