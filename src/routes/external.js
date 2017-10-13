import React, { PureComponent } from 'react';
import App from '../containers/common/App';

import NotFound from './NotFound';

class ExternalContainer extends PureComponent {
    componentDidMount() {
        const scriptEl = document.getElementById('script-wrapper');
        /* eslint-disable */
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src',
            '../common.js');
        scriptEl.appendChild(script);

        const script2 = document.createElement('script');
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

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ExternalContainer
    }
};

export default route;
