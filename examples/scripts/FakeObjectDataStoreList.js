var faker = require('faker');

var SIZE = 2000;
var _cache = [];

function createFakeRowObjectData(/*number*/ index) {
  return {
    id: 'id_' + index,
    avartar: faker.image.avatar(),
    city: faker.address.city(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    date: faker.date.past(),
    bs: faker.company.bs(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    words: faker.lorem.words(),
    sentence: faker.lorem.sentence()
  };
}

function getRows(noRows){
  var rows = [];
  for (var i = 0; i < noRows; i++){
    rows.push(createFakeRowObjectData(i));
  }
  return rows;
}

var FakeObjectDataListStore = {
  getRows: getRows
};

module.exports = FakeObjectDataListStore;
