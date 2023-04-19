import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList, Text, SafeAreaView, Image} from 'react-native';
import axios from 'axios';
import {ScrapeSportData} from './SportScraper';
import androidstyles from './styles/android/SportsScreenStyles';
import iosstyles from './styles/ios/SportsScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function SportsScreen({navigation}) {
  const [DATA, setDATA] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://gamecocksonline.com/wp-json/v1/all_sports_schedule?offset=${pageNumber}0&game_status=`,
    })
      .then(res => {
        setHasMore(!res.data.is_full_list);
        setDATA([...DATA, ...ScrapeSportData(res.data.data, res.data.count)]);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  }, [pageNumber, reloadToken]);

  function reloadPage() {
    setLoading(true);
    setPageNumber(0);
    setReloadToken(Math.random());
  }
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ActivityIndicator style={styles.loadingSymbol} size="large"></ActivityIndicator>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {error ? (
          <>
            <Text style={styles.errorText}>Oops! Something went wrong.{'\n'}Please reload or try again later.</Text>
            <TouchableOpacity style={styles.reloadButton} onPress={reloadPage}>
              <Text style={styles.reloadButtonText}>Reload</Text>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={DATA}
            // keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={styles.flexboxContainer}>
                    <View style={styles.gcSide} /* Left side of sports card containing gc logo and sport name */>
                      <Image
                        style={styles.gcLogo} // Gamecocks Logo
                        source={require('./assets/gamecocks_logo.png')}
                      />
                      <Text style={styles.sportText}>{item[0]}</Text>
                    </View>
                    <View
                      style={styles.innerStack} /* Middle portion containing date, time, location, home/away status */
                    >
                      <Text style={styles.dateText}>{item[2]}</Text>
                      <Text style={styles.timeText}>{item[3]}</Text>
                      <Text style={styles.locationText}>{item[5]}</Text>
                      <Text style={styles.homeStatusText}>{item[6]}</Text>
                    </View>
                    <View style={styles.opponentSide} /* Right side containing opp logo and name */>
                      <Image
                        style={styles.opponentLogo} // Opponent Logo
                        source={{uri: item[4]}}
                      />
                      <Text style={styles.opponentText}>{item[1]}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            onEndReachedThreshold={0.05}
            onEndReached={() => {
              if (hasMore) {
                setPageNumber(pageNumber + 1);
              }
            }}
            ListFooterComponent={
              hasMore ? (
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
    );
  }
}
