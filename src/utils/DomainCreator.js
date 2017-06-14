import PubSub from 'pubsub-js';

export default (domain) => {
    domain.eventBus = PubSub;

    domain.updateModel = (model) => {
        domain.eventBus.publish('@@MODEL_UPDATE', model);
    };

    for (const actionName of Object.keys(domain.action)) {
        const action = domain.action[actionName];

        domain.action[actionName] = (...args) => {
            action.apply(this, [domain.updateModel, domain.model, ...args]);
        };
    }

    return domain;
};
