import React, { Component } from 'react';
import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
        class DomainComponent extends Component {
            constructor(props) {
                super(props);

                const domain = DomainCreator(domainObject);
                this.eventBus = domain.eventBus;
                this.state = {
                    model: domain.model
                };
                this.action = domain.action;
            }

            getChildContext() {
                return {
                    model: this.state.model,
                    action: this.action
                };
            }

            componentDidMount() {
                this.eventBus.subscribe('@@MODEL_UPDATE', (msg, _model) => {
                    this.setState({
                        model: _model
                    });
                });
            }

            componentWillUnmount() {
                this.eventBus.unsubscribe('@@MODEL_UPDATE');
            }

            render() {
                return <WrappedComponent model={this.state.model} action={this.action} />;
            }
        }

        DomainComponent.childContextTypes = {
            model: React.PropTypes.object,
            action: React.PropTypes.object
        };

        return DomainComponent;
    };
};

export default DomainComponentCreator;
