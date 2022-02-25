// import { StylesProvider } from '@material-ui/styles';
// import * as React from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import styled from 'styled-components';
// import { createClient } from '@supabase/supabase-js';
// import { Drawer } from './components/drawer/Drawer__old';
// import { store } from './store';
// import { HomeView } from './view/HomeView';
// import { HouseholdBookView } from './view/HouseholdBookView';

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// export const App: React.FC = () => (
//   <StylesProvider injectFirst>
//     <Provider store={store}>
//       {/* <Router>
//         <SC.Drawer>
//           <Drawer />
//         </SC.Drawer>
//         <SC.Content>
//           <Switch>
//             <Route path="/home" component={HomeView} />
//             <Route path="/finance" component={HouseholdBookView} />
//             <Route path="/analyze" />
//             <Route path="/fridge" />
//             <Route path="/setting" />
//           </Switch>
//         </SC.Content>
//       </Router> */}
//     </Provider>
//   </StylesProvider>
// );

// const SC = {
//   Drawer: styled.div`
//     font-family: 'M PLUS Rounded 1c', sans-serif;
//     height: 100vh;
//     width: 15%;
//     border-right: 1px solid #eeeeee;
//   `,
//   Content: styled.div`
//     width: 85%;
//     height: 100vh;
//     background: #eceff1;
//   `,
// };
