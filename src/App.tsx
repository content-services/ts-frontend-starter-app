import '@redhat-cloud-services/frontend-components-utilities/styles/_all';

import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getRegistry as _getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import pckg from '../package.json';
import { CustomChromeApi } from './entry';
import { Routes } from './Routes';

// Example of how to re-implement inaccurately typed imports
const getRegistry = _getRegistry as
  (initialState?: undefined, middleware?: any[], composeEnhancersDefault?: any) => any;

const App = () => {
    const history = useHistory();
    const chrome: CustomChromeApi = useChrome();

    useEffect(() => {
        let unregister;
        if (chrome) {
            const registry = getRegistry();
            registry.register({ notifications: notificationsReducer });
            const { identifyApp, on: onChromeEvent } = chrome.init();

            // You can use directly the name of your app
            identifyApp(pckg.insights.appname);
            unregister = onChromeEvent('APP_NAVIGATION', (event) =>
                history.push(`/${event.navId}`)
            );
        }

        return () => {
            unregister();
        };
    }, [ chrome, history ]);

    return (
        <Fragment>
            <NotificationsPortal />
            <Routes />
        </Fragment>
    );
};

export default App;
