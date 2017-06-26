import React, { Component } from 'react';
import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
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
                this.domain.eventBus.subscribe('@@MODEL_UPDATE', () => {
                    console.log(`@@MODEL_UPDATE in ${WrappedComponent.name}`);
                    this.setState({});
                });
            }

            componentWillUnmount() {
                this.domain.eventBus.unsubscribe('@@MODEL_UPDATE');
            }

            render() {
                return <WrappedComponent {...this.props} model={this.domain.model} action={this.domain.action} />;
            }
        }

        DomainComponent.childContextTypes = {
            domain: React.PropTypes.object
        };

        return DomainComponent;
    };
};

export default DomainComponentCreator;
