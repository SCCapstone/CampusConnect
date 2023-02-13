import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const targetUrl = 'https://sc.edu/about/offices_and_divisions/russell_house/upcoming-events/index.php';
      const response = await fetch(targetUrl);
      const html = await response.text();

      const information = extractInformation(html);

      setData(information);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      {data && data.map(item => (
        <Text key={item.id}>{item.title}</Text>
      ))}
    </View>
  );
};

export default App;
