import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { Card, Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import ContactInfoDomain from './ContactInfoDomain';

import './contact-info.less';

const mapper = {
    modelMapper: (model) => {
        return {
            contactInfo: model.contactInfo
        };
    },
    actionMapper: (action) => {
        return {
            getContactDetail: action.getContactDetail
        };
    }
};

@DomainComponentCreator(ContactInfoDomain)
@DomainMapper(mapper)
export default class ContactInfoContainer extends PureComponent {
    componentDidMount() {
        this._getContactDetail();
    }

    async _getContactDetail() {
        const { getContactDetail, params } = this.props;
        await getContactDetail(params.id);
    }

    _navContactList() {
        hashHistory.push('/');
    }

    _navContactEdit() {
        const { contactInfo } = this.props;
        hashHistory.push(`contact-edit/${contactInfo.id}`);
    }

    render() {
        const { contactInfo } = this.props;
        const { name, gender, birthday, phone, email, address } = contactInfo;

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
