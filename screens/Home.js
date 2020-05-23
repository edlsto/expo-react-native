import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [colors, setColors] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleColorFetch = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (result.ok) {
      console.log('fetched!');
      const fetchedColors = await result.json();
      setColors(fetchedColors);
    }
  }, []);

  useEffect(() => {
    handleColorFetch();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColors((colors) => [newColorPalette, ...colors]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleColorFetch();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleColorFetch]);

  return (
    <FlatList
      style={styles.list}
      data={colors}
      keyExtractor={(item, i) => item.paletteName + i}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => navigation.navigate('ColorPalette', item)}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPaletteModal');
          }}
        >
          <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  },
});

export default Home;
