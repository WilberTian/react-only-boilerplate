import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
        class DomainComponent extends Component {
            constructor(props) {
                super(props);

                this.domain = DomainCreator(domainObject);
            }

            getChildContext() {
                return {
                    domain: this.domain
                };
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }

        DomainComponent.childContextTypes = {
            domain: PropTypes.object
        };

        return DomainComponent;
    };
};

export default DomainComponentCreator;
