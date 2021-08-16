import { StylesProvider } from '@material-ui/styles';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Drawer } from './components/drawer/Drawer';
import { FinanceView } from './view/FinanceView';

export const App: React.FC = () => {
    return (
        <StylesProvider injectFirst>
            <Router>
                <SC.Drawer>
                    <Drawer />
                </SC.Drawer>
                <SC.Content>
                    <Switch>
                        <Route path="/home" />
                        <Route path="/finance" component={FinanceView} />
                        <Route path="/analyze" />
                        <Route path="/fridge" />
                        <Route path="/setting" />
                    </Switch>
                </SC.Content>
            </Router>
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
