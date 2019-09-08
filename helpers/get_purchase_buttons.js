createPurchaseButtons = data => {
  const buttonURL = {
    type: 'web_url',
    url: data.products[0].url,
    title: 'Read more',
  };

  const buttonBuy = {
    type: 'postback',
    title: 'Repeat',
    payload: `BUY_${data.products[0].sku}`,
  };
  const buttons = [
    buttonURL,
    buttonBuy,
  ];
  return {
    title: `${data.products[0].name} - ${data.products[0].salePrice}$`,
    image_url: data.products[0].image,
    subtitle: data.products[0].shortDescription,
    buttons,
  };
}

module.exports = createPurchaseButtons;