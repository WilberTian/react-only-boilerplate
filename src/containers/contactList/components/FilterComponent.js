import React, { PureComponent } from 'react';
import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: () => {},
    actionMapper: (action) => {
        return {
            queryContactList: action.queryContactList
        };
    }
};

@DomainMapper(mapper)
export default class FilterComponent extends PureComponent {
    async _queryContactList() {
        const { queryContactList } = this.props;
        await queryContactList('arg1', 'arg2');
    }

    render() {
        // const { model } = this.context;

        return (
            <div>
                <button onClick={::this._queryContactList}>Query</button>
            </div>
        );
    }
}
