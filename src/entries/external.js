import externalPage from '../pages/external';

externalPage();

if (module.hot) {
    module.hot.accept('../pages/external', () => {
        const _new = require('../pages/external').default;
        _new();
    });
}
