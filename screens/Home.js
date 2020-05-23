import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation }) => {
  const [colors, setColors] = useState([]);
  const handleColorFetch = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const fetchedColors = await result.json();
    console.log(fetchedColors);
    if (result.ok) {
      setColors(fetchedColors);
    }
  }, []);

  useEffect(() => {
    handleColorFetch();
  });

  return (
    <FlatList
      style={styles.list}
      data={colors}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => navigation.navigate('ColorPalette', item)}
          colorPalette={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
});

export default Home;
