import PubSub from 'pubsub-js';

export default (domain) => {
    domain.eventBus = PubSub;

    domain.dispatch = (model) => {
        domain.model = model;
        domain.eventBus.publish('@@MODEL_UPDATE', domain);
    };

    return domain;
};
