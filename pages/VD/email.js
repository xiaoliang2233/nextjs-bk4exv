export default {
  components: [
    {
      comp_ref: 'Header',
      config: {
        text: 'sign up',
        customCssClass: 'my-header',
      },
    },
    {
      comp_ref: 'Container',
      config: {
        first: {
          comp_ref: 'Input',
          config: {
            fieldId: 'email',
            placeholderKey: 'email',
            errorValidator: 'required',
          },
        },
        second: {
          comp_ref: 'Input',
          config: {
            fieldId: 'password',
            placeholderKey: 'password',
            type: 'password',
            errorValidator: 'required',
          },
        },
        last: {
          comp_ref: 'Button',
          config: {
            placeholderKey: 'Next',
          },
        },
        layout: ['first', 'last'],
      },
    },
    {
      comp_ref: 'Footer',
    },
  ],
};
