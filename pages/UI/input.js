import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

function Input(props) {
  const {
    value,
    content,
    placeholderKey,
    error,
    errorKey = 'RequiredError',
    onBlur,
    onChange,
  } = props;

  return (
    <div className="input-wrapper">
      <div>{content[placeholderKey]}</div>
      <input value={value} onChange={onChange} onBlur={onBlur} />
      {error ? <div className="error">{content[errorKey]}</div> : null}
    </div>
  );
}

const InputWrapper = connect(mapStateToProps, mapDispatchToProps)(Input);

export default InputWrapper;
