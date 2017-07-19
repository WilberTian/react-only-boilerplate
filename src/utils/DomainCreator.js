import PubSub from 'pubsub-js';

import environment from './environment';
import * as environmentConstant from '../configs/environments';

export default (domain) => {
    domain.eventBus = PubSub;
    domain.components = [];

    domain.dispatch = (model) => {
        domain.model = model;
        domain.components.forEach((component) => {
            domain.eventBus.publish(`${component}@@MODEL_UPDATE`, domain);
        });
    };

    if (environment === environmentConstant.DEVELOPMENT) {
        window.$$domain = {
            model: domain.model,
            components: domain.components,
            action: domain.action
        };
    }

    return domain;
};
