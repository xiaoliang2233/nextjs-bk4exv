import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fieldComps from './UI';
import { appActions } from './store';
const fieldCompsKeys = Object.keys(fieldComps);

function Header({ customCssClass, text }) {
  return (
    <div class={`${customCssClass} header`}>{text || 'This is Header'}</div>
  );
}

function Container({ layout, ...others }) {
  const comps = layout.map((fieldName) => {
    const { comp_ref, config } = others[fieldName];
    if (fieldCompsKeys.includes(comp_ref)) {
      const Comp = fieldComps[comp_ref];
      return <Comp {...config} />;
    }
  });

  return <div class={`container`}>{comps}</div>;
}

function Footer() {
  return <div class={`footer`}>This is Footer</div>;
}

function Review(state) {
  return (
    <div>
      <p> we are done !</p>
      <p> thx! </p>
    </div>
  );
}

function Loading({ dispatch }) {
  const { next } = appActions;
  useEffect(() => {
    dispatch(next());
  }, []);
  return (
    <div>
      <p>loading...</p>
    </div>
  );
}
const LoadingWrapper = connect()(Loading);

export default {
  Header,
  Container,
  Footer,
  Review,
  Loading: LoadingWrapper,
};
