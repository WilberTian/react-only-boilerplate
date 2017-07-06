import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuidv4 from './uuidv4';

export default ({ modelMapper, actionMapper }) => {
    return (WrappedComponent) => {
        class SubDomainComponent extends Component {
            constructor(props) {
                super(props);
                this.state = {};
                this._uniqueCompId = `${WrappedComponent.name}'$$'${uuidv4()}`;
            }

            componentWillMount() {
                this.domain = this.context.domain;

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
