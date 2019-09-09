const getPurchases = (list) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const elements = [];
  for (let i = 0; i < list.length; i++) {
    const button = {
      type: 'postback',
      title: 'Purchase info',
      // eslint-disable-next-line no-underscore-dangle
      payload: `PURCHASE_${list[i]._id}`,
    };

    const buttons = [button];
    const date = list[i].updatedAt;

    const dateString = `${date.getDate()} ${monthNames[date.getMonth()]}`;

    const element = {
      title: dateString,
      buttons,
    };
    elements.push(element);
  }
  return elements;
};

module.exports = getPurchases;
