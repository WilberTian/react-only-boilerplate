import PubSub from 'pubsub-js';

import environment from './environment';
import * as environmentConstant from '../configs/environments';

export default (domain) => {
    domain.eventBus = PubSub;
    domain.components = [];
    domain.currentModel = domain.model;

    domain.getCurrentModel = () => {
        return domain.currentModel;
    };

    domain.dispatch = (model) => {
        domain.currentModel = model;
        domain.components.forEach((component) => {
            domain.eventBus.publish(`${component}@@MODEL_UPDATE`, domain);
        });
    };

    if (environment === environmentConstant.DEVELOPMENT) {
        window.$$domain = {
            model: domain.currentModel,
            components: domain.components,
            action: domain.action
        };
    }

    return domain;
};
