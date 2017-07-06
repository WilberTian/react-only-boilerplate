import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuidv4 from './uuidv4';

import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
        class DomainComponent extends Component {
            constructor(props) {
                super(props);

                this.domain = DomainCreator(domainObject);
                this.state = {};
                this._uniqueCompId = `${WrappedComponent.name}'$$'${uuidv4()}`;
            }

            getChildContext() {
                return {
                    domain: this.domain
                };
            }

            componentWillMount() {
                this.domain.components.push(this._uniqueCompId);
                this.domain.eventBus.subscribe(`${this._uniqueCompId}@@MODEL_UPDATE`, () => {
                    console.log(`@@MODEL_UPDATE in ${this._uniqueCompId}`);
                    this.setState({});
                });
            }

            componentWillUnmount() {
                const found = this.domain.components.indexOf(this._uniqueCompId);
                this.domain.components.splice(found, 1);
                this.domain.eventBus.unsubscribe(`${this._uniqueCompId}@@MODEL_UPDATE`);
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
