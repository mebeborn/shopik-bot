const createSkuQuery = (skus) => {
  const skuArr = skus.map((sku) => `sku=${sku}`);
  return skuArr.join('|');
};

const getItems = (data) => {
  const items = [];

  for (let i = 0; i < data.products.length; i++) {
    const button = {
      type: 'postback',
      title: 'Info',
      payload: `INFO_${data.products[i].sku}`,
    };

    const buttons = [button];

    const item = {
      title: data.products[i].name,
      image_url: data.products[i].image,
      buttons,
    };

    items.push(item);
  }

  return items;
};


module.exports = { createSkuQuery, getItems };
