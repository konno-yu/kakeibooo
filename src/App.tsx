import { StylesProvider } from '@material-ui/styles';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Drawer } from './components/drawer/Drawer';
import { store } from './store';
// import { HomeView } from './view/HomeView';
import { HouseholdBookView } from './view/HouseholdBookView';

export const App: React.FC = () => (
  <Provider store={store}>
    <SC.Drawer>
      <Drawer />
    </SC.Drawer>
    <SC.Content>
      <HouseholdBookView />
    </SC.Content>
  </Provider>
);

const SC = {
  Drawer: styled.div`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    height: 100vh;
    width: 15%;
    border-right: 1px solid #eeeeee;
  `,
  Content: styled.div`
    width: 85%;
    height: 100vh;
    background: #eceff1;
  `,
};
