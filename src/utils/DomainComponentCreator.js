import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
        const wrappedComponentName = WrappedComponent.name;

        class DomainComponent extends Component {
            constructor(props) {
                super(props);

                this.domain = DomainCreator(domainObject);
                this.state = {};
            }

            getChildContext() {
                return {
                    domain: this.domain
                };
            }

            componentWillMount() {
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
                return <WrappedComponent {...this.props} model={this.domain.model} action={this.domain.action} />;
            }
        }

        DomainComponent.childContextTypes = {
            domain: PropTypes.object
        };

        return DomainComponent;
    };
};

export default DomainComponentCreator;
