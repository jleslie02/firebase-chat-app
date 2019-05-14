import map from 'ramda/src/map';

const mocks = {
  productMock: {id: "prod", display_name: "prod display name", name: "prod_name", product_line: "line", flavor: "flavor", category: "category"},
  imageData: {images: {primary_url: "image_url"}},
  snackDataList: (count = 1) => {
    let list = [];
    const concatCount = (value, num) => `${value}_${num}`;

    if (count === 1)
      return {...mocks.productMock, ...mocks.imageData};

    for (let i = 0; i < count; i++) {
      list.push({...map((product) => concatCount(product, i), mocks.productMock), ...mocks.imageData});
    }

    return list;
  },
  claims: [{
    "key": "flavors",
    "values": [
      "BBQ",
      "Cheesy",
      "Chocolate",
      "Fall",
      "Fruity",
      "Global",
      "Nutty",
      "Salty",
      "Savory",
      "Sour",
      "Spicy",
      "Spring",
      "Summer",
      "Sweet",
      "Umami",
      "Winter"
    ]
  },
  {
    "key": "allergens",
    "values": [
      "Dairy Free",
      "Nut Free",
      "Peanut Free",
      "Soy Free"
    ]
  },
  {
    "key": "nutritionalContents",
    "values": [
      "High Fiber",
      "High Protein",
      "Low Fat",
      "Low Sugar",
      "No Artificial Flavors or Colors",
      "No Preservatives",
      "Non-Certified Gluten Free",
      "Paleo",
      "Raw",
      "Sugar Free",
      "Whole Grain"
    ]
  },
  {
    "key": "contains",
    "values": []
  }]
};

export default mocks;
