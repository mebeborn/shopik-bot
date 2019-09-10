const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const { getProduct, getProducts, getFavorites } = require('../best_buy/bby_get');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

describe('Get exact product from BBY', () => {
  it('Checks if we get the right product', () => {
    return getProduct(1000592)
      .then(response => expect(response.products[0]).that.include({ "sku": 1000592 }));
  })
});

describe('Get  avalable products from BBY', () => {
  it('Checks if we get the right products', () => {
    return getProducts('onlineAvailability=true')
      .then(response => expect(response.products).to.be.an('array'));
  })
});


describe('Get  correct products from BBY', () => {
  it('Checks if we get the right products', () => {
    const products = [
      {
        sku: 1000006,
        name:
          'Spy Kids: All the Time in the World [Includes Digital Copy] [Blu-ray] [2011]',
        description: null,
        image:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1000/1000006_sa.jpg'
      },
      {
        sku: 1001307,
        name: 'Diary of a Wimpy Kid [DVD] [2010]',
        description: null,
        image:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1001/1001307_sa.jpg'
      }];

    getFavorites(products).then(response => {
      console.log(response);
    }).catch(err => err)

  })
})