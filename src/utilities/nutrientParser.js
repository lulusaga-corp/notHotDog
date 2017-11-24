let g = 'g';
let mg = 'mg';
let Âµg = 'Âµg';
let IU = 'IU';
let kcal = 'kcal';
let kJ = 'kJ';


let key = {
    203: ['Protein', g],
    204: ['Total fat', g],
    205: ['Carbohydrate', g],
    207: ['Ash', g],
    208: ['Energy', kcal],
    209: ['Starch', g],
    210: ['Sucrose', g],
    211: ['Glucose', g],
    212: ['Fructose', g],
    213: ['Lactose', g],
    214: ['Maltose', g],
    221: ['Alcohol', g],
    255: ['Water', g],
    262: ['Caffeine', mg],
    263: ['Theobromine', mg],
    268: ['Energy', kJ],
    269: ['Sugars', g],
    287: ['Galactose', g],
    291: ['Dietary Fiber', g],
    301: ['Calcium', mg],
    303: ['Iron', mg],
    304: ['Magnesium', mg],
    305: ['Phosphorus', mg],
    306: ['Potassium', mg],
    307: ['Sodium', mg],
    309: ['Zinc', mg],
    312: ['Copper', mg],
    313: ['Fluoride', Âµg],
    315: ['Manganese', mg],
    317: ['Selenium', Âµg],
    318: ['Vitamin A', IU],
    319: ['Retinol', Âµg],
    321: ['Beta Carotene', Âµg],
    322: ['Alpha Carotene', Âµg],
    323: ['Vitamin E', mg],
    324: ['Vitamin D', IU],
    325: ['Vitamin D2', Âµg],
    326: ['Vitamin D3', Âµg],
    337: ['Lycopene', Âµg],
    338: ['Lutein + zeaxanthin', Âµg],
    341: ['Tocopherol, beta', mg],
    342: ['Tocopherol, gamma', mg],
    343: ['Tocopherol, delta', mg],
    401: ['Vitamin C', mg],
    404: ['Thiamin', mg],
    405: ['Riboflavin', mg],
    406: ['Niacin', mg],
    410: ['Pantothenic acid', mg],
    415: ['Vitamin B-6', mg],
    417: ['Folate', Âµg],
    418: ['Vitamin B-12', Âµg],
    421: ['Choline', mg],
    428: ['Menaquinone-4', Âµg],
    429: ['Dihydrophylloquinone', Âµg],
    430: ['Vitamin K', Âµg],
    431: ['Folic acid', Âµg],
    454: ['Betaine', mg],
    501: ['Tryptophan', g],
    502: ['Threonine', g],
    503: ['Isoleucine', g],
    504: ['Leucine', g],
    505: ['Lysine', g],
    506: ['Methionine', g],
    507: ['Cystine', g],
    508: ['Phenylalanine', g],
    509: ['Tyrosine', g],
    510: ['Valine', g],
    511: ['Arginine', g],
    512: ['Histidine', g],
    513: ['Alanine', g],
    514: ['Aspartic acid', g],
    515: ['Glutamic acid', g],
    516: ['Glycine', g],
    517: ['Proline', g],
    518: ['Serine', g],
    521: ['Hydroxyproline', g],
    601: ['Cholesterol', mg],
    605: ['Trans Fatty acids', g],
    606: ['Saturated Fatty acids', g],
    636: ['Phytosterols', mg],
    638: ['Stigmasterol', mg],
    639: ['Campesterol', mg],
    641: ['Beta-sitosterol', mg]
}

export default function fullNutrientParser(apiResponse){
    let foodArr = apiResponse.foods;
    foodArr.forEach(item => {
      let nutrients = item.full_nutrients;
      item.parsed_nutrients = {};
      return nutrients.forEach(nutrient => {      
        if (key[nutrient.attr_id]){
          let parsed = item.parsed_nutrients;
          let nutrientObj = {}
          nutrientObj.quantity = nutrient.value;
          nutrientObj.unit = key[nutrient.attr_id][1]
          parsed[key[nutrient.attr_id][0]] = nutrientObj;
        }
      })
    })
}