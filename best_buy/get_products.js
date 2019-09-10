const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');

const getProducts = (param) => {

  return bby.products(param, { show: 'sku,name,description,image' })
}

module.exports = getProducts;