import Clarifai from 'clarifai';
import { Actions } from 'react-native-router-flux';

export default async function clarifaiCall(base64data, apiKey) {
  const clarifai = new Clarifai.App({ apiKey });
  process.nextTick = setImmediate;
  const response = await clarifai.models.predict(Clarifai.FOOD_MODEL, { base64: base64data })
  return response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85).map(item => item.name)
}

