import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
// import errorPage from './components/ErrorPage';

/**
 * The ".page" class is key to animating a full page and not receive bumps while
 * animating pages in/out. It is position: fixed to allow the animation to play
 * without the DOM elements messing up.
 *
 * Try to remove .page to see the effect.
 */



const Routes = withRouter(({ location }) => {
    return (
            <Switch>
                
            </Switch>
    );
});

export default Routes;
