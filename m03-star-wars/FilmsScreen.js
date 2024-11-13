import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';


export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://www.swapi.tech/api/films');
        setFilms(response.data.title);
      } catch (error){
        console.error('Error fetching films data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);
  
  if (loading) {
    return (
      <SafeAreaView style={style.center}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text>Loading Films...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.header}>Star Wars Films</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.name}
        renderItem={({ item}) =>(
          <SafeAreaView style={style.item}>
            <Text style={style.name}>{item.name}</Text>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    color: 'black',
  },
  name:{
    margin: 5,
    padding: 5,
    textAlign: 'center',
    
  },
  header: {
    margin: 5,
    padding: 5,
    textAlign: 'center',

  }
})