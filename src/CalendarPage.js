import {useState, useEffect, useContext} from 'react'

import { ActivityIndicator, SafeAreaView, View ,Image} from 'react-native';
import { Avatar,Text } from '@rneui/themed';

import { HeaderBackButton } from 'react-navigation-stack';

import CalendarStrip from 'react-native-calendar-strip';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';
import { Button } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';

export function CalendarPage({navigation}) {
    const userData = useContext(AppContext);
    const [key,setKey] = useState(moment().day())
    const [selectedDate, setSelectedDate] = useState(moment());



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
            <View style={{backgroundColor:'#a8a1a6',flex:1,padding:10,borderRadius:10,margin:15}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>{item.name + "\n"+ item.professor}</Text>
                <Text style={{color:'black',fontWeight:'bold'}}>{item.location + ' '+ item.room}</Text>
                <Text style={{color:'black',fontWeight:'bold'}}>{item.time}</Text>
            </View>
        );
    }

    useEffect(() => {


      }, []); //I guess this tells react to update when these variables change?



    return (
        <View style={{backgroundColor:'#73000a',flex:1}}>
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
                <Text style={{color:'black',textAlign:'center',fontSize:24}}>Nothing to do? How about join a club!</Text>}
                <FloatingAction
                color='#73000a'
                >

                </FloatingAction>
            </View>
                

        </View>
    )
}