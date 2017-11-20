import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const responseProp = {
    "status": {
      "code": 10000,
      "description": "Ok"
    },
    "outputs": [
      {
        "id": "aa0e68b1964f4b0c81911816aabb6308",
        "status": {
          "code": 10000,
          "description": "Ok"
        },
        "created_at": "2016-11-22T17:27:59Z",
        "model": {
          "name": "food-items-v1.0",
          "id": "bd367be194cf45149e75f01d59f77ba7",
          "created_at": "2016-09-17T22:18:59Z",
          "app_id": null,
          "output_info": {
            "message": "Show output_info with: GET /models/{model_id}/output_info",
            "type": "concept"
          },
          "model_version": {
            "id": "dfebc169854e429086aceb8368662641",
            "created_at": "2016-09-17T22:18:59Z",
            "status": {
              "code": 21100,
              "description": "Model trained successfully"
            }
          }
        },
        "input": {
          "id": "aa0e68b1964f4b0c81911816aabb6308",
          "data": {
            "image": {
              "url": "https://samples.clarifai.com/food.jpg"
            }
          }
        },
        "data": {
          "concepts": [
            {
              "id": "ai_GC6FB0cQ",
              "name": "sauce",
              "app_id": null,
              "value": 0.99863684
            },
            {
              "id": "ai_fBH5DFMJ",
              "name": "pasta",
              "app_id": null,
              "value": 0.9962599
            },
            {
              "id": "ai_2KV5G1Fg",
              "name": "basil",
              "app_id": null,
              "value": 0.97945905
            },
            {
              "id": "ai_XN1QLhwp",
              "name": "penne",
              "app_id": null,
              "value": 0.97526324
            },
            {
              "id": "ai_KWmFf1fn",
              "name": "meat",
              "app_id": null,
              "value": 0.9743866
            },
            {
              "id": "ai_XVpwLB09",
              "name": "beef",
              "app_id": null,
              "value": 0.9702389
            },
            {
              "id": "ai_qmTM9wzt",
              "name": "spaghetti",
              "app_id": null,
              "value": 0.9645418
            },
            {
              "id": "ai_CB8hsS3T",
              "name": "tomato",
              "app_id": null,
              "value": 0.9477837
            },
            {
              "id": "ai_FnZCSVMH",
              "name": "cheese",
              "app_id": null,
              "value": 0.891973
            },
            {
              "id": "ai_CQT1pP96",
              "name": "macaroni",
              "app_id": null,
              "value": 0.8738347
            },
            {
              "id": "ai_NDbbpCv1",
              "name": "vegetable",
              "app_id": null,
              "value": 0.8726477
            },
            {
              "id": "ai_CSW3Njnd",
              "name": "meat sauce",
              "app_id": null,
              "value": 0.8595116
            },
            {
              "id": "ai_3fJXxTPQ",
              "name": "sausage",
              "app_id": null,
              "value": 0.6607301
            },
            {
              "id": "ai_ZBtC2kLC",
              "name": "spaghetti bolognese",
              "app_id": null,
              "value": 0.64385796
            },
            {
              "id": "ai_Bh2xGwKk",
              "name": "tomato sauce",
              "app_id": null,
              "value": 0.6094018
            },
            {
              "id": "ai_TRbv6FWL",
              "name": "pork",
              "app_id": null,
              "value": 0.5601148
            },
            {
              "id": "ai_cdw5bgmc",
              "name": "pasta sauce",
              "app_id": null,
              "value": 0.4660543
            },
            {
              "id": "ai_6s1vcbq9",
              "name": "garlic",
              "app_id": null,
              "value": 0.43789294
            },
            {
              "id": "ai_gNpKXVhq",
              "name": "tagliatelle",
              "app_id": null,
              "value": 0.42926073
            },
            {
              "id": "ai_xgC6XzhP",
              "name": "carbohydrate",
              "app_id": null,
              "value": 0.41837996
            }
          ]
        }
      }
    ]
  }

class FoodSelector extends Component {
    constructor (props){
        super(props);
        this.state = {
            response: responseProp.outputs[0].data.concepts.filter(item => item.value >= .85).map(item => item.name)
        }
    }


    render () {
        
        console.log('188 state', this.state)
        const filtered = this.state.response
        // console.log('food list', filtered)
        return(
            <View style={styles.tabContainer}>
                <List>
                    {
                    filtered.map((item, i) => {
                        return <ListItem key={i} title={item} rightIcon={{name: 'clear'}} onPressRightIcon={item => {
                            this.setState({ response : this.state.response.splice(i, 1)})
                            console.log('line 198 state', this.state)
                        }} />
                    })
                    }
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

export default FoodSelector;