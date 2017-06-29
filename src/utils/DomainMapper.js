import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default ({ modelMapper, actionMapper }) => {
    return (WrappedComponent) => {
        const wrappedComponentName = WrappedComponent.name;

        class SubDomainComponent extends Component {
            constructor(props) {
                super(props);
                this.state = {};
            }

            componentWillMount() {
                this.domain = this.context.domain;

                this.domain.components.push(wrappedComponentName);
                this.domain.eventBus.subscribe(`${wrappedComponentName}@@MODEL_UPDATE`, () => {
                    console.log(`@@MODEL_UPDATE in ${wrappedComponentName}`);
                    this.setState({});
                });
            }

            componentWillUnmount() {
                const found = this.domain.components.indexOf(wrappedComponentName);
                this.domain.components.splice(found, 1);
                this.domain.eventBus.unsubscribe(`${wrappedComponentName}@@MODEL_UPDATE`);
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
            domain: PropTypes.object
        };

        return SubDomainComponent;
    };
};
