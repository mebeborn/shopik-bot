const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

describe('Get exact product from BBY', () => {
  it('Checks if we get the right object', () => {
    return bby.products('sku=1000592', { show: 'sku,name,salePrice,image,url,shortDescription' })
      .then(response => expect(response.products[0]).that.include({"sku" : 1000592}));
  })
});