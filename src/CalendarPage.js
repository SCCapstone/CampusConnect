import {useState, useEffect, useContext} from 'react'

import { ActivityIndicator, SafeAreaView, View ,Image,FlatList,TouchableOpacity, Modal} from 'react-native';
import { Avatar,Icon,Text } from '@rneui/themed';

import { HeaderBackButton } from 'react-navigation-stack';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps'

import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';
import { Button } from '@rneui/base';
import { Swipeable} from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import {decode} from "@mapbox/polyline";
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location'
import {locations} from './consts/locations'

export function CalendarPage({navigation}) {
    const userData = useContext(AppContext);
    const [key,setKey] = useState(moment().day())
    const [selectedDate, setSelectedDate] = useState(moment());
    const [mapVisible,setMapVisible] = useState(false)
    const [coords, setCoords] = useState([]);
    const[origin,setOrigin] = useState({latitude: 33.990890860794124, longitude: -81.02403298291603})

    const[destination,setDestination] = useState(locations.colonial_life_arena)
    

    const GOOGLE_MAPS_APIKEY = 'AIzaSyCTYqSzJ6Cu8TEaSSI6AVheBAXBKeGCqMs';



    const [classes,setClasses] = useState({
        1:[ //Monday
            {name: 'CSCE 355 - Foundations of Computation', time:'3:55PM - 5:10PM', professor:'Dr. Stephen Fenner', location:'350 Main',room:'415 A'},
            {name: 'CSCE 580 - Artificial Intelligence', time:'10:15AM - 12:00PM', professor:'Dr. Forest Agostinelli', location:'Horizon Parking Garage',room:'510'},
            {name: 'PSYCH 415 - Introduction to Personality', time:'8:15AM - 10:00AM', professor:'Dr. Sue Wiezchowitz', location:'Close-Hipp', room: '220A'},
        ],
        2:[ //Tuesday
            {name: 'CSCE 492 - Capstone Senior Project', time:'All Day', professor:'Dr. Jose Vidal', location:'Online',room:''},
            {name: 'CSCE 498 - Independent Research', time:'10:00AM - 12:00PM', professor:'Dr. Vignesh Naranyan', location:'USC AI-Institute',room:'5400'},

        ],
        3:[ //Wednesday
            {name: 'CSCE 355 - Foundations of Computation', time:'3:55PM - 5:10PM', professor:'Dr. Stephen Fenner', location:'350 Main',room:'415 A'},
            {name: 'CSCE 580 - Artificial Intelligence', time:'10:15AM - 12:00PM', professor:'Dr. Forest Agostinelli', location:'Horizon Parking Garage',room:'510'},
            {name: 'PSYCH 415 - Introduction to Personality', time:'8:15AM - 10:00AM', professor:'Dr. Sue Wiezchowitz', location:'Close-Hipp', room: '220A'},
        ],
        4:[ //Thursday
            {name: 'CSCE 492 - Capstone Senior Project', time:'All Day', professor:'Dr. Jose Vidal', location:'Online',room:''},
            {name: 'CSCE 498 - Independent Research', time:'10:00AM - 12:00PM', professor:'Dr. Vignesh Naranyan', location:'USC AI-Institute',room:'5400'},
            {name: 'El Kappa Psi Meeting', time:'6:00PM - 8:00PM', professor:'', location:'Greek Village',room:'101'},

        ],
        5:[ //Friday
            {name: 'CSCE 355 - Foundations of Computation', time:'3:55PM - 5:10PM', professor:'Dr. Stephen Fenner', location:'350 Main',room:'415 A'},
            {name: 'CSCE 580 - Artificial Intelligence', time:'10:15AM - 12:00PM', professor:'Dr. Forest Agostinelli', location:'Horizon Parking Garage',room:'510'},
            {name: 'PSYCH 415 - Introduction to Personality', time:'8:15AM - 10:00AM', professor:'Dr. Sue Wiezchowitz', location:'Close-Hipp', room: '220A'},
        ],
        6:[ //Saturday

        ],
        0:[ //Sunday

        ],
    })


    const datesWhiteList = [moment(),{start:moment().startOf('isoWeek'),end:moment().startOf('isoWeek').add(7,'day')}]


    const renderClasses = ({item,index}) => {
        return(
            <Swipeable
            overshootLeft={true}
            ref={ref => {
              this.swipeable = ref;
            }}
            overshootRight={true}
            leftThreshold={105}
            containerStyle={{backgroundColor:'white'}}
            rightThreshold={105}
            friction={2.5}
            renderLeftActions={() => (
                <View style={{justifyContent:'center',marginLeft:15}}>
                    <Icon type='entypo' name='edit' size={30} color='black'></Icon>
                </View>
            )}
            renderRightActions={() => (
                <View style={{justifyContent:'center',marginRight:15}}>
                    <Icon type='MaterialIcons' name='delete' color={'red'} size={30}></Icon>
                </View>
            )}
            >
            <TouchableOpacity onPress={() =>{getDirections()}}>
                <View style={{backgroundColor:'#a8a1a6',flex:1,padding:10,borderRadius:10,margin:15}}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>{item.name + "\n"+ item.professor}</Text>
                    <Text style={{color:'black',fontWeight:'bold'}}>{item.location + ' '+ item.room}</Text>
                    <Text style={{color:'black',fontWeight:'bold'}}>{item.time}</Text>
                </View>
                </TouchableOpacity>
        </Swipeable>
        );
    }
  

    useEffect(() => {


    navigation.setOptions({
        headerRight:() =>(
            //right here, navigate to the events page, but pass it props to indicate the user wants to view events on the current day
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                <Text style={{color:'white',fontSize:15}}>View Events</Text>
            </TouchableOpacity>
        )
    });
        
      }, []); 

    const getDirections = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            setOrigin(location)
            setMapVisible(true)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        
    } 




    return (
        <View style={{backgroundColor:'#73000a',flex:1}}>
            <Modal visible={mapVisible} transparent={true}>
                <View style={{flex:1,backgroundColor:'white'}}>
                    <Button 
                    containerStyle={{backgroundColor:'#73000a'}}
                    buttonStyle={{backgroundColor:'#73000a',height:50,width:'100%',marginTop:50}}
                    size='lg'
                    onPress={() => setMapVisible(false)}
                    titleStyle={{fontSize:10,fontWeight:'bold'}}
                    title={'Close'}
                    />
                    <MapView style={{flex:1}} 
                    zoomControlEnabled={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    initialRegion=
                        {{latitude:origin.latitude, 
                        longitude:origin.longitude,
                        latitudeDelta:.01,
                        longitudeDelta:.01}}
                    >
                    <Marker title='Capstone Building' coordinate={destination}></Marker>
                        <MapViewDirections
                            
                            origin={origin}
                            mode='WALKING'
                            
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeColor='#73000a'
                            strokeWidth={15}
                        />
                    </MapView>
                        
                    
                </View>
            </Modal>
            <CalendarStrip
                style={{height:150, paddingTop: 20, paddingBottom: 10}}
                calendarColor={'#73000a'}
                calendarHeaderStyle={{color: 'white'}}
                dateNumberStyle={{color: 'white',fontSize:20}}
                dateNameStyle={{color: 'white',fontSize:19}}
                highlightDateNameStyle={{color:'black',fontSize:18}}
                highlightDateNumberStyle={{color:'black',fontSize:19}}
                onDateSelected={(date) => {
                    setSelectedDate(date)
                    setKey(date.day())
                }}
                datesWhitelist={datesWhiteList}
                scrollToOnSetSelectedDate={false}
                iconContainer={{flex: 0.1}}
                numDaysInWeek={7}
                selectedDate ={selectedDate}
                minDate={moment().startOf('isoWeek')}
                maxDate={moment().startOf('isoWeek').add(6,'day')}
            />
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center'}}>
                {classes[key].length !==0?<FlatList
                    data={classes[key]}
                    renderItem={renderClasses}
                    key={item => item.name}
                >
                    
                </FlatList>: 
                <Text style={{color:'black',textAlign:'center',fontSize:24}}>Nothing to do? Join a club!</Text>}
                <FloatingAction
                color='#73000a'
                >

                </FloatingAction>
            </View>
                

        </View>
    )
}