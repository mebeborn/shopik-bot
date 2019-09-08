getReplies = (counter) => {
  if (counter >=2 ) {
    return [
      {
        content_type: 'text',
        title: 'Confirm',
        payload: 'true',
      },
      {
        content_type: 'text',
        title: 'Get it free',
        payload: 'true',
      },
      {
        content_type: 'text',
        title: 'Cancel',
        payload: 'Cancel',
      },
    ];
  }
  return [
    {
      content_type: 'text',
      title: 'Confirm',
      payload: 'true',
    },
    {
      content_type: 'text',
      title: 'Cancel',
      payload: 'Cancel',
    },
  ];

}

module.exports = getReplies;