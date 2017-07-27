import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuidv4 from './uuidv4';
import environment from './environment';
import * as environmentConstant from '../configs/environments';

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
                const currentModel = this.domain.getCurrentModel();

                if (modelMapper(currentModel) !== undefined) {
                    this.domain.components.push(this._uniqueCompId);
                    this.domain.eventBus.subscribe(`${this._uniqueCompId}@@MODEL_UPDATE`, () => {
                        if (environment === environmentConstant.DEVELOPMENT) {
                            console.log(`@@MODEL_UPDATE in ${this._uniqueCompId}`);
                        }
                        this.setState({});
                    });
                }
            }

            componentWillUnmount() {
                const currentModel = this.domain.getCurrentModel();
                if (modelMapper(currentModel) !== undefined) {
                    const found = this.domain.components.indexOf(this._uniqueCompId);
                    this.domain.components.splice(found, 1);
                    this.domain.eventBus.unsubscribe(`${this._uniqueCompId}@@MODEL_UPDATE`);
                }
            }

            render() {
                if (typeof modelMapper !== 'function') {
                    throw new Error('Domain modelMapper should be function');
                }

                if (typeof actionMapper !== 'function') {
                    throw new Error('Domain actionMapper should be function');
                }

                const { action } = this.domain;
                const currentModel = this.domain.getCurrentModel();

                return <WrappedComponent {...this.props} {...modelMapper(currentModel)} {...actionMapper(action)} />;
            }
        }

        SubDomainComponent.contextTypes = {
            domain: PropTypes.object
        };

        return SubDomainComponent;
    };
};
