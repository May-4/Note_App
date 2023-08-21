import { StyleSheet, Text, View, } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>note </Text>
      <Text style={[styles.headerText, { color: '#B0E9CA' }]}>app</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  headerText: {
    letterSpacing: 2,
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#1F2937',
  },

});

export default Header;