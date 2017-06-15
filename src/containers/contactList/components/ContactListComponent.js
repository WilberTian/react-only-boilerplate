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
        const columns = [{
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => { this._showDetail(record.id); }}>Detail</Button>
                        <Button
                          type="danger"
                          icon="close"
                          onClick={() => { this._deleteItem(record.name); }}
                        >
                            Delete
                        </Button>
                    </div>
                );
            }
        }];

        return (
            <Table columns={columns} dataSource={contactList} />
        );
    }
}
