import { StylesProvider } from '@material-ui/styles';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Drawer } from './components/drawer/Drawer';
import { store } from './store';
import { HomeView } from './view/HomeView';
import { HouseholdBookView } from './view/HouseholdBookView';

export const App: React.FC = () => {
    return (
        <StylesProvider injectFirst>
            <Provider store={store}>
                <Router>
                    <SC.Drawer>
                        <Drawer />
                    </SC.Drawer>
                    <SC.Content>
                        <Switch>
                            <Route path="/home" component={HomeView} />
                            <Route path="/finance" component={HouseholdBookView} />
                            <Route path="/analyze" />
                            <Route path="/fridge" />
                            <Route path="/setting" />
                        </Switch>
                    </SC.Content>
                </Router>
            </Provider>
        </StylesProvider>
    )
}

const SC = {
    Drawer: styled.div`
        font-family: "M PLUS Rounded 1c", sans-serif;
        height: 100vh;
        width: 15%;
        border-right: 1px solid #EEEEEE;
    `,
    Content: styled.div`
        width: 85%;
        height: 100vh;
        background: #ECEFF1;
    `
};
