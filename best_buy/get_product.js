const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');

const getProduct = (sku) => {
  return bby.products(`sku=${sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' });
}


module.exports = getProduct;
