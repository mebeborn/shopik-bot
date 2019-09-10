const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const { createSkuQuery } = require('../helpers/favorites');

const getFavorites = (favoriteProducts) => {
  return bby.products(createSkuQuery(favoriteProducts), { show: 'sku,name,salePrice,image,url,shortDescription' })
}

module.exports = getFavorites;