import PubSub from 'pubsub-js';

export default (domain) => {
    domain.eventBus = PubSub;
    domain.components = [];

    domain.dispatch = (model) => {
        domain.model = model;
        domain.components.forEach((component) => {
            domain.eventBus.publish(`${component}@@MODEL_UPDATE`, domain);
        });
    };

    return domain;
};
