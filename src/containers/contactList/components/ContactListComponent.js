import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';
import { hashHistory } from 'react-router';

import DomainMapper from '../../../utils/DomainMapper';
import NotificationBox from '../../../components/NotificationBox';
import ConfirmModal from '../../../components/ConfirmModal';

const mapper = {
    modelMapper: (model) => {
        return {
            contactList: model.contactList
        };
    },
    actionMapper: (action) => {
        return {
            getContactList: action.getContactList
        };
    }
};

@DomainMapper(mapper)
export default class ContactListComponent extends PureComponent {
    componentDidMount() {
        this._getContactList();
    }

    async _getContactList() {
        const { getContactList } = this.props;
        await getContactList('arg1', 'arg2');

        NotificationBox({
            message: 'Success',
            description: 'Contact list loaded sucessfully!',
            duration: 2
        });
    }

    _showDetail(id) {
        hashHistory.push(`contact-detail/${id}`);
    }

    _deleteItem(itemName) {
        ConfirmModal({
            content: `确认删除'${itemName}'?`
        });
    }

    render() {
        const { contactList } = this.props;

        return (
            <div>
                <div className="contact-list">
                    {contactList.map((item, index) => {
                        return (
                            <div className="contact-item" key={index}>
                                <span className="contact-item-cell">{item.id}</span>
                                <span className="contact-item-cell">{item.name}</span>
                                <span className="contact-item-cell">{item.gende}</span>
                                <button onClick={() => { this._showDetail(item.id); }}>Detail</button>
                            </div>
                        );
                    })}
                </div>
                <button onClick={::this._getContactList}>Load</button>
            </div>
        );
    }
}
