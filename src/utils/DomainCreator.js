import PubSub from 'pubsub-js';

export default (domain) => {
    domain.eventBus = PubSub;

    domain.dispatch = (model) => {
        domain.eventBus.publish('@@MODEL_UPDATE', model);
    };

    return domain;
};
