import React, { Component } from 'react';

export default ({ modelMapper, actionMapper }) => {
    return (WrappedComponent) => {
        class SubDomainComponent extends Component {
            render() {
                if (typeof modelMapper !== 'function') {
                    throw new Error('Domain modelMapper should be function');
                }

                if (typeof actionMapper !== 'function') {
                    throw new Error('Domain actionMapper should be function');
                }

                const { model, action } = this.context;

                return <WrappedComponent {...this.props} {...modelMapper(model)} {...actionMapper(action)} />;
            }
        }

        SubDomainComponent.contextTypes = {
            model: React.PropTypes.object,
            action: React.PropTypes.object
        };

        return SubDomainComponent;
    };
};
