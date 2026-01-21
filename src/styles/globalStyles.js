import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  cardShadow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
});
