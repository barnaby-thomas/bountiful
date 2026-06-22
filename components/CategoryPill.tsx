import { View, Text, StyleSheet } from 'react-native';
import { colours } from '../const/colours';
import { fonts } from '../const/fonts';

export default function CategoryPill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colours.searchBarBackground,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 6,
  },
  pillText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colours.greenText,
  },
});