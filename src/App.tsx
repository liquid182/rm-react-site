import './App.scss';

import * as React from 'react';
import { Provider } from 'react-redux';
import {Switch} from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Store} from "redux";
import {HamburgerNav} from "./components/navigation/HamburgerNav";
import {Blog} from "./components/views/Blog";
import {Home} from "./components/views/Home";
import {Photos} from "./components/views/Photos";
import {Projects} from "./components/views/Projects";
import {APP_NAME, NAV_LINKS} from "./constants/AppConstants.json";

 // const history = syncHistoryWithStore(browserHistory, store);
export interface IAppProps  { store:any };

class App extends React.Component<IAppProps,{}> {
    private readonly logo:string = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cstyle%3E.a%7Bfill:%23F0EBE1;%7D.b%7Bfill:%236B676E;%7D%3C/style%3E%3Cpath d='M358 336c0 0 87-5 114-8 36-4 33-16 33-16 0-7-24-46-57-64 -27-15-70-29-114-32 -37-3-35-54-65-80 -12-10-29-13-24 0 5 13 29 69 0 80S138 231 49 304c0 0-31-12-41 0 -3 3 16 24 16 24S8 359 8 376c0 1 34-14 41-40 3-11 84-30 146-16 66 15 106 16 106 16' fill='%23585661'/%3E%3Cpath d='M431 288c-5-10-25-25-65-24 0 0 7 17 24 24C407 295 431 288 431 288z' class='a'/%3E%3Cpath d='M358 336l2-3c0 0 69-4 91-6 23-3 26-9 26-12 -29 2-71-15-101-3C366 316 367 326 358 336z' class='a'/%3E%3Cpath d='M304 321c0 0-8 58-3 64 5 5 62-41 65-64C368 305 320 305 304 321z' class='b'/%3E%3Cpath d='M273 334c-25-29-64-45-89-45 -32 0-72 17-48 25 14 5 55 0 69 8C233 328 256 332 273 334z' class='a'/%3E%3Cpath d='M240 249c200-24 264 65 264 65l0 0c0-1 0-1 0-1 0-7-24-46-57-64 -27-15-70-29-114-32 -37-3-35-54-65-80 -12-10-29-13-24 0 5 13 29 69 0 80 -29 11-106 15-195 88C81 320 96 266 240 249z' class='b'/%3E%3Cpath d='M512 311c-1-10-16-30-18-32 -9-12-24-28-43-38 -25-14-69-29-117-33 -16-1-23-14-32-35 -7-15-14-31-28-43 -10-8-25-14-33-8 -2 1-8 7-4 17 0 1 1 2 1 3 4 11 18 44 11 60 -1 3-4 5-7 7 -6 2-14 4-24 7 -37 9-99 24-169 80 -11-4-34-9-45 4 -5 7 0 15 7 23 2 3 4 5 6 7 -5 10-15 32-15 47 0 4 3 7 7 8 0 0 0 0 1 0 7 0 23-12 23-12 9-7 21-18 25-33 4-3 21-9 49-13 0 0 1 0 1 0 0 0 0 0 0 0 19-2 54-5 87 2 55 12 92 15 104 16 -1 3-1 6-2 9 -6 28-3 33 0 37 1 1 3 3 7 3 1 0 2 0 3 0 11-2 33-23 37-27 5-5 13-13 19-21 15-1 87-5 111-8 20-2 32-7 37-15C512 317 512 313 512 311zM197 312c-17-4-38-6-59-5 10-5 18-9 26-11 0 0 1 0 1 0 0 0 0 0 0 0 8-2 14-2 18 0 3 1 7 1 9-2 2-3 3-7 1-10 -1-1-2-2-3-3l0 0c0 0 0 0 0 0 -1-1-3-1-5-2 -2-1-5-1-9-1 -5 0-10 1-15 3 -2 1-2 0-2 0 0-1 0-1 0-1 17-10 42-17 62 14 8 12 18 22 28 30C234 320 217 317 197 312zM372 327c1-2 1-3 2-5 0 0 2-5 23-4 14 0 31 2 47 4C420 324 389 326 372 327zM496 312c-10 0-25-2-42-4 -46-6-89-12-96 10 -2 8-13 21-27 35 -9 9-17 16-23 19 1-10 5-28 9-42 1-4-2-9-6-10 -4-1-9 2-10 6 0 0 0 1 0 2 0 0-1 0-1 0 -11-1-43-12-65-44 -13-19-29-28-47-29 -15 0-28 6-37 11 -7 5-10 14-7 21 0 0 0 0 0 0 -11 5-24 12-41 24 -1 0-3 0-4 1 -14 2-27 5-37 9 -13 4-19 9-20 15 -3 12-13 21-22 27 4-11 10-24 12-29 2-3 1-7-1-9 -5-5-10-11-13-15 7-2 20 1 28 4 3 1 6 1 8-1 69-56 130-71 166-79 11-3 19-5 26-7 7-3 13-8 16-15 9-19-1-49-10-72 3 1 7 3 11 6 11 10 18 24 24 37 10 21 20 42 46 44 46 3 87 18 111 31 29 16 50 49 53 57C496 312 496 312 496 312z'/%3E%3Cpath d='M370 256c-1 0-3 0-4 0 -3 0-5 1-7 4s-2 5-1 7c0 1 9 20 29 28 6 2 13 4 21 4 0 0 0 0 0 0 13 0 24-3 25-3 2-1 4-2 5-4s1-5 0-7C431 271 410 256 370 256zM408 283c-6 0-11-1-15-2 -5-2-9-5-12-8 16 1 27 6 33 10C413 283 410 283 408 283z'/%3E%3C/svg%3E";
    private readonly store:Store;

    constructor(props:IAppProps){
        super(props);
        this.store = props.store;
    }

    public render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className="app">
                        <header className="app-header">
                            <HamburgerNav title={APP_NAME} expandDesktop={true} expandTablet={true}
                                          dark={true} logoSrc={this.logo} logoLabel={APP_NAME}
                                          rightLinks={NAV_LINKS.RIGHT}
                                          leftLinks={NAV_LINKS.LEFT}/>
                        </header>
                        <div className="body-content">
                            <Switch>
                                <Route path="/" component={Home} exact={true}/>
                                <Route path="/projects" component={Projects}/>
                                <Route path="/blogs" component={Blog}/>
                                <Route path="/photos" component={Photos}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
  }
}

export default App;
