import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Drawer from './components/drawer/Drawer';

const App: React.FC = () => {
    return (
        <Router>
            <div className="drawer">
                <Drawer />
            </div>
            <div className="content">
                <Switch>
                    <Route path="home" />
                    <Route path="calendar" />
                    <Route path="analyze" />
                    <Route path="fridge" />
                    <Route path="setting" />
                </Switch>
            </div>
        </Router>
    )
}

export default App;
