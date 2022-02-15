export default {
  components: [
    {
      comp_ref: 'Header',
      config: {
        text: 'sign up',
      },
    },
    {
      comp_ref: 'Container',
      config: {
        first: {
          comp_ref: 'Message',
          config: {
            text: 'wonderful!!!! you are done!',
          },
        },
        second: {
          comp_ref: 'Message',
          config: {
            text: 'emmmmm...feel ok?',
          },
        },
        layout: ['first', 'second'],
      },
    },
    {
      comp_ref: 'Footer',
      config: {
        text: 'powered by xiaoliang',
      },
    },
  ],
};
