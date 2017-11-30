import {Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
const styles = {
  error: {
    fontSize: 20,
    alignSelf: "center",
    color: "#e62117",
    paddingTop: 20,
    paddingBottom: 10
  },
  loadingContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  questionContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    backgroundColor: "transparent"
  },
  questionText: {
    textAlign: "center",
    color: "#4d4d4d"
  },
   background: {
    width,
    height,
  },
};

export default styles;