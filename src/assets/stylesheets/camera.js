import { StyleSheet } from 'react-native';

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
  }
});

export { cameraStyle };
