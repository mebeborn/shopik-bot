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

describe('Get  correct products from BBY', () => {
  it('Checks if we get the right products', () => {
    return getProducts('onlineAvailability=true')
      .then(response => expect(response.products).to.be.an('array'));
  })
});