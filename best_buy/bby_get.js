const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const { createSkuQuery } = require('../helpers/favorites');

const getProduct = (sku) => {
  return bby.products(`sku=${sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' });
}

const getProducts = (param) => {
  return bby.products(param, { show: 'sku,name,description,image' })
}


const getFavorites = (favoriteProducts) => {
  return bby.products(createSkuQuery(favoriteProducts), { show: 'sku,name,salePrice,image,url,shortDescription' })
}

module.exports = { getProduct, getProducts, getFavorites };