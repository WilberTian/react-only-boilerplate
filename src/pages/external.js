import React from 'react';
import ReactDOM from 'react-dom';

import routes from '../routes/external';
import Root from '../containers/common/Root';

export default () => {
    ReactDOM.render(
        <Root routes={routes} />,
        document.getElementById('external-mount-point')
    );
};
