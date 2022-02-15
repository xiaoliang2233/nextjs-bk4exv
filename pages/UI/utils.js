import { appActions } from '../store';
function mapStateToProps(state, ownProps) {
  const { fieldId } = ownProps;
  const {
    serverData: { content },
  } = state;
  return {
    content,
    ...state.formData[fieldId],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { fieldId } = ownProps;
  function onBlur(event) {
    dispatch(appActions.validateValue(fieldId));
  }
  function onChange(event) {
    dispatch(appActions.updateValue(fieldId, event.target.value));
  }
  function onClick() {
    dispatch(appActions.submitValue());
  }
  return {
    onBlur,
    onChange,
    onClick,
  };
}

export { mapDispatchToProps, mapStateToProps };
