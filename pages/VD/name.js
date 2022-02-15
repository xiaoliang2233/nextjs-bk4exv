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
            fieldId: 'name',
            placeholderKey: 'ChineseName',
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
