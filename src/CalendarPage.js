import {useState, useEffect, useContext} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {Avatar, Icon, Input, Text} from '@rneui/themed';

import {HeaderBackButton} from 'react-navigation-stack';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';

import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';
import {Button} from '@rneui/base';
import {Swipeable} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import {decode} from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import DropDownPicker from 'react-native-dropdown-picker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {class_locations, locations} from './consts/locations';

const GOOGLE_MAPS_APIKEY =
  Platform.OS === 'ios' ? 'AIzaSyARf2igtbS8271pg878R9U9Pvq5iUy4zSc' : 'AIzaSyCTYqSzJ6Cu8TEaSSI6AVheBAXBKeGCqMs';

export function CalendarPage({navigation}) {
  const userData = useContext(AppContext);
  const [key, setKey] = useState(moment().day());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [mapVisible, setMapVisible] = useState(false);
  const [coords, setCoords] = useState([]);
  const [origin, setOrigin] = useState({
    latitude: 33.990890860794124,
    longitude: -81.02403298291603,
  });
  const [addClassVisible, setAddClassVisible] = useState(false);
  const [startTime, setStartTime] = useState({nativeEvent: {timestamp: 1671469200000}});
  const [endTime, setEndTime] = useState({nativeEvent: {timestamp: 1671469200000}});
  const [destination, setDestination] = useState(locations.carolina_coliseum);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedClassLocation, setSelectedClassLocation] = useState();
  const [selectedClassLocationName, setSelectedClassLocationName] = useState('');
  const [className, setClassName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [value, setValue] = useState(new Date(1671469200000));
  const [value2, setValue2] = useState(new Date(1671469200000));
  const [reRender, setReRender] = useState(false);
  var transactionStarted = false;

  const [classes, setClasses] = useState({
    1: [
      //Monday
    ],
    2: [
      //Tuesday
    ],
    3: [
      //Wednesday
    ],
    4: [
      //Thursday
    ],
    5: [
      //Friday
    ],
    6: [
      //Saturday
    ],
    0: [
      //Sunday
    ],
  });

  const datesWhiteList = [
    moment(),
    {start: moment().startOf('isoWeek'), end: moment().startOf('isoWeek').add(7, 'day')},
  ];

  const renderClasses = ({item, index}) => {
    return (
      <Swipeable
        overshootLeft={true}
        ref={ref => {
          this.swipeable = ref;
        }}
        overshootRight={true}
        leftThreshold={105}
        containerStyle={{backgroundColor: 'white'}}
        rightThreshold={105}
        friction={2.5}
        renderLeftActions={() => (
          <View style={{justifyContent: 'center', marginLeft: 15}}>
            <Icon type="entypo" name="edit" size={30} color="black"></Icon>
          </View>
        )}
        renderRightActions={() => (
          <TouchableOpacity
            onPress={() => {
              removeClass(index);
            }}
            style={{justifyContent: 'center', marginRight: 15}}>
            <Icon type="MaterialIcons" name="delete" color={'red'} size={30}></Icon>
          </TouchableOpacity>
        )}>
        <Pressable
          onPress={() => {
            setDestination(item.coordinates);
            if (!transactionStarted) {
              getDirections();
            }
            setSelectedClassLocationName(item.location);
          }}>
          <View
            style={{
              backgroundColor: '#a8a1a6',
              flex: 1,
              padding: 10,
              borderRadius: 10,
              margin: 15,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{item.name + '\n' + item.professor}</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>{item.location + ' ' + item.room}</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>{item.time}</Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  };
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: value,
      onChange: setStartTime,
      mode: 'time',
      is24Hour: false,
    });
  };
  const showTimePicker2 = () => {
    DateTimePickerAndroid.open({
      value: value2,
      onChange: setEndTime,
      mode: 'time',
      is24Hour: false,
    });
  };
  const setTime = (event, date) => {
    setStartTime(event);
    setValue(date);
  };
  const setTime2 = (event, date) => {
    setValue2(date);
    setEndTime(event);
    console.log(event);
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const value = await AsyncStorage.getItem('@users_classes');
        if (value !== null) {
          setClasses(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
      }
    };
    getClasses();

    navigation.setOptions({
      headerRight: () => (
        //right here, navigate to the events page, but pass it props to indicate the user wants to view events on the current day
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Text style={{color: 'white', fontSize: 15}}>View Events</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const getDirections = () => {
    transactionStarted = true;
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setOrigin(location);
        setMapVisible(true);
        transactionStarted = false;
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        transactionStarted = false;
      });
  };

  const saveClasses = async () => {
    var tempClass = {
      name: '',
      professorName: '',
      location: '',
      roomNumber: '',
      time: '',
      coordinates: {},
      startTime: {},
      endTime: {},
    };
    console.log(startTime + ' ' + endTime);
    if (endTime.nativeEvent.timestamp - startTime.nativeEvent.timestamp < 1) {
      //Start Time is before end time
      Alert.alert('Whoops!', 'Start time must be before end time');
      return;
    }
    if (
      professorName.trim() &&
      className.trim() &&
      roomNumber.trim() &&
      selectedClassLocation &&
      startTime &&
      endTime
    ) {
      startTimeString = moment(startTime.nativeEvent.timestamp).format('hh:mm A');
      endTimeString = moment(endTime.nativeEvent.timestamp).format('hh:mm A');
      tempClass.name = className;
      tempClass.professor = professorName;
      tempClass.location = selectedClassLocationName;
      tempClass.coordinates = selectedClassLocation;
      tempClass.room = roomNumber;
      tempClass.time = startTimeString + ' - ' + endTimeString;
      tempClass.startTime = startTime.nativeEvent.timestamp;
      tempClass.endTime = endTime.nativeEvent.timestamp;

      classes[key].push(tempClass);
      classes[key].sort(function (a, b) {
        return a.startTime - b.startTime;
      });

      try {
        await AsyncStorage.setItem('@users_classes', JSON.stringify(classes));
        setProfessorName('');
        setClassName('');
        setStartTime({nativeEvent: {timestamp: 1671469200000}});
        setEndTime({nativeEvent: {timestamp: 1671469200000}});
        setRoomNumber('');
        setValue(new Date(1671469200000));
        setValue2(new Date(1671469200000));
        setSelectedClassLocation(null);
        setSelectedClassLocationName('');
        this.floatingAction.animateButton();
      } catch (e) {}
    } else {
      Alert.alert('Please fill out all the required fields.');
    }
  };

  const removeClass = async index => {
    classes[key].splice(index, 1);
    classes[key].sort(function (a, b) {
      return a.startTime - b.startTime;
    });
    setClasses(classes);
    setReRender(!reRender);

    try {
      await AsyncStorage.setItem('@users_classes', JSON.stringify(classes));
    } catch (e) {}
  };

  return (
    <View style={{backgroundColor: '#73000a', flex: 1}}>
      <Modal transparent={true} visible={addClassVisible}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center', marginHorizontal: 10}}>
          <View style={{backgroundColor: '#73000a', height: 50, justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              {'Entering a class for: ' + selectedDate.format('dddd')}
            </Text>
          </View>
          <View style={{backgroundColor: 'white', padding: 15}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Enter The Class Name</Text>
            <Input
              value={className}
              placeholder="Class Name"
              defaultValue={className}
              onChangeText={setClassName}></Input>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Enter The Professor's Name</Text>
            <Input
              placeholder="Professor's Name"
              value={professorName}
              defaultValue={professorName}
              onChangeText={setProfessorName}></Input>
            <DropDownPicker
              placeholder="Select Class Location"
              style={{marginBottom: 20}}
              open={dropDownOpen}
              value={selectedClassLocation}
              items={class_locations}
              dropDownDirection="TOP"
              itemKey="label"
              onClose={() => {
                setDropDownOpen(false);
              }}
              setOpen={() => {
                Keyboard.dismiss(), setDropDownOpen(true);
              }}
              onSelectItem={item => {
                setSelectedClassLocationName(item.label);
                setSelectedClassLocation(item.value);
              }}
              listMode="SCROLLVIEW"
            />
            <Text style={{color: 'black', fontWeight: 'bold'}}>Enter The Room Number</Text>
            <Input
              placeholder="Room Number"
              value={roomNumber}
              defaultValue={roomNumber}
              onChangeText={setRoomNumber}></Input>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Select Start And End Times</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              {Platform.OS === 'android' && (
                <View style={{justifyContent: 'center'}}>
                  <Button
                    onPress={() => {
                      showTimePicker();
                    }}
                    title="Start Time"
                    titleStyle={{fontSize: 10}}
                    buttonStyle={{
                      backgroundColor: '#a8a1a6',
                      height: 50,
                      width: '70%',
                      alignSelf: 'center',
                      margin: 10,
                    }}></Button>
                  {startTime && Platform.OS !== 'ios' ? (
                    <Text style={{color: 'black', textAlign: 'center', alignSelf: 'center'}}>
                      {moment(startTime.nativeEvent.timestamp).format('hh:mm A')}
                    </Text>
                  ) : null}
                </View>
              )}
              {Platform.OS === 'ios' && (
                <DateTimePicker
                  style={{alignSelf: 'center', margin: 10}}
                  testID="dateTimePicker"
                  mode={'time'}
                  value={value}
                  is24Hour={true}
                  onChange={setTime}
                />
              )}

              {Platform.OS === 'android' && (
                <View style={{justifyContent: 'center'}}>
                  <Button
                    onPress={() => {
                      showTimePicker2();
                    }}
                    title="End Time"
                    titleStyle={{fontSize: 10}}
                    buttonStyle={{
                      backgroundColor: '#a8a1a6',
                      height: 50,
                      width: '70%',
                      alignSelf: 'center',
                      margin: 10,
                    }}></Button>
                  {endTime && Platform.OS !== 'ios' ? (
                    <Text style={{color: 'black', textAlign: 'center', alignSelf: 'center'}}>
                      {moment(endTime.nativeEvent.timestamp).format('hh:mm A')}
                    </Text>
                  ) : null}
                </View>
              )}
              {Platform.OS === 'ios' && (
                <DateTimePicker
                  style={{alignSelf: 'center', margin: 10}}
                  testID=""
                  mode={'time'}
                  value={value2}
                  is24Hour={true}
                  onChange={setTime2}
                />
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                containerStyle={{
                  backgroundColor: '#73000a',
                  flex: 1,
                  margin: 10,
                  borderRadius: 10,
                }}
                buttonStyle={{backgroundColor: '#73000a', height: 50, marginTop: 0}}
                size="lg"
                onPress={() => {
                  this.floatingAction.animateButton();
                }}
                titleStyle={{fontSize: 10, fontWeight: 'bold'}}
                title={'Close'}
              />
              <Button
                containerStyle={{
                  backgroundColor: '#73000a',
                  flex: 1,
                  margin: 10,
                  borderRadius: 10,
                }}
                buttonStyle={{backgroundColor: '#73000a', height: 50}}
                size="lg"
                onPress={() => {
                  saveClasses();
                }}
                titleStyle={{fontSize: 10, fontWeight: 'bold'}}
                title={'Save'}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <Modal visible={mapVisible} transparent={true}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {Platform.OS === 'ios' ? (
            <Button
              buttonStyle={{
                backgroundColor: '#73000a',
                height: 50,
                width: '100%',
                marginTop: 50,
              }}
              size="lg"
              onPress={() => setMapVisible(false)}
              titleStyle={{fontSize: 10, fontWeight: 'bold'}}
              title={'Close'}
            />
          ) : (
            <Button
              buttonStyle={{
                backgroundColor: '#73000a',
                height: 50,
                width: '100%',
                marginTop: 0,
              }}
              size="lg"
              onPress={() => setMapVisible(false)}
              titleStyle={{fontSize: 10, fontWeight: 'bold'}}
              title={'Close'}
            />
          )}
          <MapView
            style={{flex: 1}}
            zoomControlEnabled={true}
            showsUserLocation={true}
            followsUserLocation={false}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker title={selectedClassLocationName} coordinate={destination}></Marker>
            <MapViewDirections
              origin={origin}
              mode="WALKING"
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor="#73000a"
              strokeWidth={7}
            />
          </MapView>
        </View>
      </Modal>
      <CalendarStrip
        style={{height: 150, paddingTop: 20, paddingBottom: 10}}
        calendarColor={'#73000a'}
        calendarHeaderStyle={{color: 'white'}}
        dateNumberStyle={{color: 'white', fontSize: 20}}
        dateNameStyle={{color: 'white', fontSize: 19}}
        highlightDateNameStyle={{color: 'black', fontSize: 18}}
        highlightDateNumberStyle={{color: 'black', fontSize: 19}}
        onDateSelected={date => {
          setSelectedDate(date);
          setKey(date.day());
        }}
        datesWhitelist={datesWhiteList}
        scrollToOnSetSelectedDate={false}
        iconContainer={{flex: 0.1}}
        numDaysInWeek={7}
        selectedDate={selectedDate}
        minDate={moment().startOf('isoWeek')}
        maxDate={moment().startOf('isoWeek').add(6, 'day')}
      />
      <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center'}}>
        {classes[key].length !== 0 ? (
          <FlatList
            extraData={reRender}
            data={classes[key]}
            renderItem={renderClasses}
            key={item => item.name}></FlatList>
        ) : (
          <Text style={{color: 'black', textAlign: 'center', fontSize: 24}}>Nothing to do? Join a club!</Text>
        )}
      </View>
      <FloatingAction
        onPressMain={() => {
          setAddClassVisible(!addClassVisible);
        }}
        color="#73000a"
        ref={ref => {
          this.floatingAction = ref;
        }}></FloatingAction>
    </View>
  );
}
