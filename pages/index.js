import React from 'react';
import { connect } from 'react-redux';
import Comps from './layoutComponents';
const CompsKeys = Object.keys(Comps);

function App(props) {
  const {
    VD: { components },
    waiting,
  } = props;
  if (waiting) {
    return <Comps.Loading />;
  }
  console.log(components);
  const comps = components.map((componentConfig) => {
    const { comp_ref, config } = componentConfig;
    if (CompsKeys.includes(comp_ref)) {
      const Comp = Comps[comp_ref];
      return <Comp key={Math.random()} {...config} />;
    }
  });
  return <div class="app">{comps}</div>;
}

function mapStateToProps(state) {
  const {
    serverData: { VD = {} },
    waiting,
  } = state;
  return {
    VD,
    waiting,
  };
}

const AppWrapper = connect(mapStateToProps, null)(App);

export default AppWrapper;
