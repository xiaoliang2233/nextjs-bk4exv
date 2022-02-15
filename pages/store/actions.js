const appActions = {
  updateValue(fieldId, value) {
    return {
      type: 'updateValue',
      fieldId,
      value,
    };
  },
  validateValue(fieldId) {
    return {
      type: 'validateValue',
      fieldId,
    };
  },
  submitValue() {
    return function (dispatch, getState) {
      dispatch({
        type: 'submitValue',
      });
      const {
        formData: { hasError },
      } = getState();
      if (!hasError) {
        appActions.next()(dispatch, getState);
      }
    };
  },
  next() {
    return function (dispatch, getState) {
      const {
        formData,
        // this token insecure, only for demo, use cookie with httpOnly instead.
        // we use this is because cookie isn't work in Stackblitz
        serverData: { inferenceResult, token },
      } = getState();
      const payload = {
        inferenceResult,
        token,
        fields: {},
      };
      Object.keys(formData)
        .filter((key) => formData[key] instanceof Object)
        .forEach((key) => (payload.fields[key] = formData[key].value));
      fetch(`/api/next`, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log('update from server: ');
          console.log('send', payload);
          console.log('return', data);
          dispatch({
            type: 'updateServerData',
            value: data,
          });
        });
    };
  },
};

export default appActions;
