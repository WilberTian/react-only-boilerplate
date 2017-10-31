import React, { PureComponent } from 'react';
import App from '../containers/common/App';

import NotFound from './NotFound';

class ExternalContainer extends PureComponent {
    componentDidMount() {
        const scriptEl = document.getElementById('script-wrapper');
        /* eslint-disable */
        const script = document.createElement('script');
        script.async = false;
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src',
            '../common.js');
        scriptEl.appendChild(script);

        const script2 = document.createElement('script');
        script2.async = false;
        script2.setAttribute('type', 'text/javascript');
        script2.setAttribute('src',
            '../index.bundle.js');
        scriptEl.appendChild(script2);
        /* eslint-enable */
    }

    render() {
        return (
            <div>
                <div id="root">
                    this is root element
                </div>
                <div id="script-wrapper" />
            </div>
        );
    }
}

const ContactDetailRoute = {
    path: 'contact-detail/:id',
    component: ExternalContainer,
};

const ContactAddRoute = {
    path: 'contact-add',
    component: ExternalContainer,
};

const ContactEditRoute = {
    path: 'contact-edit/:id',
    component: ExternalContainer,
};

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ExternalContainer
    },
    childRoutes: [
        ContactDetailRoute,
        ContactAddRoute,
        ContactEditRoute,
        notFountRoute
    ]
};

export default route;
