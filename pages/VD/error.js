export default {
  components: [
    {
      comp_ref: 'Container',
      config: {
        first: {
          comp_ref: 'Message',
          config: {
            text: 'you catch an error for random event, just for the demo using rule engine to determine which page will navigate',
          },
        },
        layout: ['first'],
      },
    },
  ],
};
