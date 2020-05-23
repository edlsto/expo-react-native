import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ColorBox from '../components/ColorBox';
import { SafeAreaView } from 'react-native-safe-area-context';

const ColorPalette = ({ route }) => {
  console.log(route.params.colors);
  const { colors, paletteName } = route.params;
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={colors}
        keyExtractor={(item) => item.hexCode}
        renderItem={({ item }) => (
          <ColorBox colorName={item.colorName} colorHex={item.hexCode} />
        )}
        ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 20,
    marginTop: 50,
  },

  text: {
    fontWeight: 'bold',
  },
});
export default ColorPalette;
