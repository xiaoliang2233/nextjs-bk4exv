import React from 'react';
import { mapStateToProps, mapDispatchToProps } from './utils';
import { connect } from 'react-redux';

function Button(props) {
  const { content, placeholderKey, onClick } = props;
  return <button onClick={onClick}>{content[placeholderKey]}</button>;
}

const ButtonWrapper = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonWrapper;
