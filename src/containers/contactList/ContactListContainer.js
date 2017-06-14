import React, { PureComponent } from 'react';
import { Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import ContactListDomain from './ContactListDomain';

import ContactListComponent from './components/ContactListComponent';
import FilterComponent from './components/FilterComponent';

import './contact-list-container.less';

@DomainComponentCreator(ContactListDomain)
export default class ContactListContainer extends PureComponent {
    _navAddContact() {
        const { pushAction } = this.props;
        pushAction('contact-add');
    }

    render() {
        return (
            <div className="contact-list-container">
                <Button className="add-contact-btn" type="primary" onClick={::this._navAddContact}>Add</Button>
                <FilterComponent />
                <ContactListComponent />
            </div>
        );
    }
}
