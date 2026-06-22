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
    paddingVertical: 3,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colours.greenText,
  },
});