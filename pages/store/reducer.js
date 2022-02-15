const validators = {
  required: function (value) {
    return !value;
  },
};

function createNewState(state) {
  const newState = Object.assign({}, state);
  newState.formData = Object.assign({}, state.formData);
  newState.serverData = Object.assign({}, state.serverData);
  return newState;
}

function handleUpdateValue(state, action) {
  const { fieldId, value } = action;
  const newState = createNewState(state);
  const fieldInfo = state.formData[fieldId];
  fieldInfo.value = value;
  newState.formData[fieldId] = { ...fieldInfo };
  return newState;
}

function handleValidateValue(state, action) {
  const { fieldId } = action;
  const newState = createNewState(state);
  const fieldInfo = state.formData[fieldId];
  if (fieldInfo.errorValidator) {
    fieldInfo.error = validators[fieldInfo.errorValidator](fieldInfo.value);
    newState.formData[fieldId] = { ...fieldInfo };
    if (fieldInfo.error) {
      newState.formData.hasError = true;
    }
  }
  return newState;
}

function getCurrentFieldKeys(state) {
  const { VD } = state.serverData;
  const getCurrentFieldKeys = [];
  VD.components.forEach((component) => {
    if (component.comp_ref === 'Container') {
      const { layout, ...fieldConfigs } = component.config;
      layout.forEach((key) => {
        const fieldConfig = fieldConfigs[key];
        const id = fieldConfig.config.fieldId;
        if (id) {
          getCurrentFieldKeys.push(id);
        }
      });
    }
  });
  return getCurrentFieldKeys;
}

function validateAllField(state) {
  const currentFieldkeys = getCurrentFieldKeys(state);
  let newState = createNewState(state);
  newState.formData.hasError = false;
  currentFieldkeys.forEach((key) => {
    newState = handleValidateValue(newState, {
      fieldId: key,
    });
  });
  return newState;
}

function handleSubmitValue(state) {
  const newState = validateAllField(state);
  return newState;
}

function updateServerData(state, action) {
  const newState = createNewState(state);
  newState.serverData = {
    ...newState.serverData,
    ...action.value,
  };
  newState.waiting = false;
  newState.formData = createForm(action.value.VD);
  return newState;
}

function createField({ config }) {
  return {
    value: undefined,
    error: false,
    ...config,
  };
}

function createForm(VD = {}) {
  const data = {};
  VD.components.forEach((component) => {
    if (component.comp_ref === 'Container') {
      const { layout, ...fieldConfigs } = component.config;
      layout.forEach((key) => {
        const fieldConfig = fieldConfigs[key];
        const id = fieldConfig.config.fieldId;
        if (id) {
          data[id] = createField(fieldConfig);
        }
      });
    }
  });
  return data;
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateValue':
      return handleUpdateValue(state, action);
    case 'validateValue':
      return handleValidateValue(state, action);
    case 'submitValue':
      return handleSubmitValue(state, action);
    case 'updateServerData':
      return updateServerData(state, action);
    default:
      return state;
  }
}

export default reducer;
