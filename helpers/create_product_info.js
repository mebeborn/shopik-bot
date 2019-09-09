const createProduct = (data, user) => {
  const buttonURL = {
    type: 'web_url',
    url: data.products[0].url,
    title: 'Read more',
  };

  let buttonFavorites = {};
  if (!(user)) {
    buttonFavorites = {
      type: 'postback',
      title: 'Add to favorites',
      payload: `ADD_TO_FAVORITES_${data.products[0].sku}`,
    };
  } else {
    buttonFavorites = {
      type: 'postback',
      title: 'Delete from favorites',
      payload: `DELETE_FROM_FAVORITES_${data.products[0].sku}`,
    };
  }
  const buttonBuy = {
    type: 'postback',
    title: 'Buy',
    payload: `BUY_${data.products[0].sku}`,
  };
  const buttons = [
    buttonURL,
    buttonFavorites,
    buttonBuy,
  ];

  return {
    title: `${data.products[0].name} - ${data.products[0].salePrice}$`,
    image_url: data.products[0].image,
    subtitle: data.products[0].shortDescription,
    buttons,
  };
};

module.exports = createProduct;
