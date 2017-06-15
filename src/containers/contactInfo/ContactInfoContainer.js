import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { Card, Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import ContactInfoDomain from './ContactInfoDomain';

import './contact-info.less';

@DomainComponentCreator(ContactInfoDomain)
export default class ContactInfoContainer extends PureComponent {
    componentDidMount() {
        this._getContactDetail();
    }

    async _getContactDetail() {
        const { action, params } = this.props;
        await action.getContactDetail(params.id);
    }

    _navContactList() {
        hashHistory.push('/');
    }

    _navContactEdit() {
        const { id } = this.props.model.contactInfo;
        hashHistory.push(`contact-edit/${id}`);
    }

    render() {
        const { name, gender, birthday, phone, email, address } = this.props.model.contactInfo;

        return (
            <Card title="Detail" className="contact-info-card">
                <div className="contact-info">
                    <p>
                        <strong>Name</strong>
                        {name}
                    </p>
                    <p>
                        <strong>Gender</strong>
                        {gender}
                    </p>
                    <p>
                        <strong>Birthday</strong>
                        {birthday}
                    </p>
                    <p>
                        <strong>Phone</strong>
                        {phone}
                    </p>
                    <p>
                        <strong>Email</strong>
                        {email}
                    </p>
                    <p>
                        <strong>Address</strong>
                        {address}
                    </p>
                </div>
                <Button icon="edit" onClick={::this._navContactEdit}>Edit</Button>
                <Button icon="arrow-left" onClick={::this._navContactList}>Back</Button>
            </Card>
        );
    }
}
