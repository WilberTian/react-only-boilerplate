import React, { Component } from 'react';

export default ({ modelMapper, actionMapper }) => {
    return (WrappedComponent) => {
        class SubDomainComponent extends Component {
            constructor(props) {
                super(props);
                this.state = {};
            }

            componentWillMount() {
                this.domain = this.context.domain;

                this.domain.eventBus.subscribe('@@MODEL_UPDATE', () => {
                    this.setState({});
                });
            }

            componentWillUnmount() {
                this.domain.eventBus.unsubscribe('@@MODEL_UPDATE');
            }

            render() {
                if (typeof modelMapper !== 'function') {
                    throw new Error('Domain modelMapper should be function');
                }

                if (typeof actionMapper !== 'function') {
                    throw new Error('Domain actionMapper should be function');
                }

                const { model, action } = this.domain;

                return <WrappedComponent {...this.props} {...modelMapper(model)} {...actionMapper(action)} />;
            }
        }

        SubDomainComponent.contextTypes = {
            domain: React.PropTypes.object
        };

        return SubDomainComponent;
    };
};
