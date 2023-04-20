import React, {useEffect, useState} from 'react'
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  SafeAreaView,
  Image,
} from 'react-native'
import axios from 'axios'
import { ScrapeSportData } from './SportScraper'
import androidstyles from './styles/android/SportsScreenStyles'
import iosstyles from './styles/ios/SportsScreenStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
var styles
var fetchUrl
const sportOptions = ["All", "Baseball", "Men's Basketball", "Women's Basketball", "Beach Volleyball", "Cross Country", "Equestrian", 
                      "Football", "Men's Golf", "Women's Golf", "Lacrosse", "Men's Soccer", "Women's Soccer", "Softball", "Men's Swimming & Diving", "Women's Swimming & Diving", 
                      "Men's Tennis", "Women's Tennis", "Men's Track & Field", "Women's Track & Field", "Volleyball"]

if (Platform.OS === 'ios') {
  styles = iosstyles
} else if (Platform.OS === 'android') {
  styles = androidstyles
}

export function SportsScreen({navigation}) {

const [DATA, setDATA] = useState([])
const [loading, setLoading] = useState(true)
const [hasMore, setHasMore] = useState(false)
const [error, setError] = useState(false)
const [reloadToken, setReloadToken] = useState(0)
const [pageNumber, setPageNumber] = useState(0)
const [sortSelection, setSortSelection] = useState("All")
var isSort = true


const renderHeader = (navigation) => {
  navigation.setOptions({
  headerRight: () => (
    <SelectDropdown
      style={styles.sortButton} 
      buttonStyle={styles.sortButton}
      buttonTextStyle={styles.sortButtonText}
      renderCustomizedRowChild={(item, index) => {
        return (
          <Text style={styles.dropdownText}>{item}</Text> 
        )
      }}
      defaultButtonText='Sort'
      data={sportOptions}
      onSelect={(selectedItem, index) => {
        setSortSelection(selectedItem)
        setPageNumber(0)
        setDATA([])
      }}
    />)
  })
  }

function getFetchUrl(sortSelection) {
  switch (sortSelection) {
    case "Baseball":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=273`
    case "Beach Volleyball":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=296`
    case "Equestrian":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=281`
    case "Football":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=291`
    case "Men's Basketball":     
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=299`
    case "Men's Golf": 
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=300`
    case "Men's Soccer": 
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=301`
    case "Men's Swimming & Diving":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=285`
    case "Men's Tennis":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=302`
    case "Men's Track & Field":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=284`
    case "Softball":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=303`
    case "Women's Basketball":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=276`
    case "Cross Country":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=282`
    case "Women's Golf":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=277`
    case "Lacrosse":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=289`
    case "Women's Soccer":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=278`
    case "Women's Swimming & Diving":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=286`
    case "Women's Tennis":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=279`
    case "Women's Track & Field":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=283`
    case "Volleyball":
      return `https://gamecocksonline.com/wp-json/v1/upcoming_sport_events?sport_category=280`
    default:
      isSort = false
      return `https://gamecocksonline.com/wp-json/v1/all_sports_schedule?offset=${pageNumber}0&game_status=` // sortSelection == "All"
  }
  
}
useEffect(() => {
  renderHeader(navigation)
  fetchUrl = getFetchUrl(sortSelection)
  axios({
    method: 'GET',
    url: fetchUrl,
  }).then(res => {
    if (isSort) {
      setHasMore(false)
      let eventCount = 0
      for (let i = 0; i < res.data.data.length; i++) { // Only count upcoming events
        if (res.data.data[i].is_upcoming_event && (res.data.data[i].season.name == "2023" || res.data.data[i].season.name == "2022-23")) // second check needed due to mistakes found in API data
            eventCount++
      } 
      if (eventCount != 0)
        setDATA([...DATA, ...ScrapeSportData(res.data.data, eventCount, isSort)])
    } else {
      setHasMore(!res.data.is_full_list)
      setDATA([...DATA, ...ScrapeSportData(res.data.data, res.data.count, isSort)])
    }
    setLoading(false)
  }).catch(e => {
    setLoading(false)
    setError(true)
  })
}, [pageNumber, reloadToken, sortSelection])

function reloadPage() {
  setLoading(true)
  pageNumber = 0
  setReloadToken(Math.random())
}

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ActivityIndicator style={styles.loadingSymbol}
            size="large"></ActivityIndicator>
        </View>
      </SafeAreaView>
    ) 
  } else if (DATA.length == 0 && sortSelection != "All") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          There are no more upcoming {sortSelection} events to view at this time.
        </Text>
      </SafeAreaView>
    )
  } else {
    return (
            <SafeAreaView style={styles.container}>
              {error ? (
                <>
                <Text style={styles.errorText}>
                  Oops! Something went wrong.{'\n'}Please reload or try again later.
                </Text>
                <TouchableOpacity 
                  style={styles.reloadButton}
                  onPress={reloadPage}
                  >
                  <Text style={styles.reloadButtonText}>Reload</Text>
                </TouchableOpacity>
                </>
              ) : (
                <FlatList
                  data={DATA}
                  renderItem={({ item }) => {
                      return <View> 
                        <View style={styles.flexboxContainer}> 
                          <View style={styles.gcSide} /* Left side of sports card containing gc logo and sport name */> 
                            <Image style={styles.gcLogo} // Gamecocks Logo
                              source={require('./assets/gamecocks_logo.png')}/>
                              <Text style={styles.sportText}>{item[0]}</Text>
                          </View>
                          <View style={styles.innerStack} /* Middle portion containing date, time, location, home/away status */>
                              <Text style={styles.dateText}>{item[2]}</Text>
                              <Text style={styles.timeText}>{item[3]}</Text>
                              <Text adjustsFontSizeToFit style={styles.locationText}>{item[5]}</Text>
                              <Text adjustsFontSizeToFit style={styles.homeStatusText}>{item[6]}</Text>
                          </View>
                          <View style={styles.opponentSide} /* Right side containing opp logo and name */ >
                            <Image style={styles.opponentLogo} // Opponent Logo
                                source={{uri: item[4]}}/>
                            <Text style={styles.opponentText}>{item[1]}</Text>
                          </View>
                        </View>
                      </View>    
                  }}
                  onEndReachedThreshold={0.05}
                  onEndReached={() => {
                      if (hasMore) {
                        setPageNumber(pageNumber + 1)
                      }
                  }}
                  ListFooterComponent={hasMore ? (
                    <View>
                      <ActivityIndicator animating size="large" />
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.footer}>There are no more events to display</Text>
                    </View>
                  )
                  }
                />
              )}
            </SafeAreaView>
        )
  }
}
