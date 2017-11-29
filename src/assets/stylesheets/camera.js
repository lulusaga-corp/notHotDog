import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const cameraStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    margin: 5,
  },
  barcode: {
    margin: 5,
    padding: 5,
    alignItems: 'flex-end'
  },
  scanner: {
    flex: 1,
  }
});

export { cameraStyle };
