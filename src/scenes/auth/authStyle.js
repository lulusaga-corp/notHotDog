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
    backgroundColor: "transparent",
    marginTop: 100,
    paddingTop:100,
  },
  questionText: {
    textAlign: "center",
    color: "#f7f7f7"
  },
  background: {
    width,
    height,
  },
  login: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
};

export default styles;