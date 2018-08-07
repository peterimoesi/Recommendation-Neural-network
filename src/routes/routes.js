import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Home from '../components/index.js';
import Machine from '../components/machine/index.js';
import Recommendation from '../components/recommendation/index.js'

const routes = (
    <Switch>
        <Route path="/machine" component={Machine} />
        <Route path="/recommendation" component={Recommendation} />
        <Route path="/" component={Home} />
    </Switch>
);

export default routes;