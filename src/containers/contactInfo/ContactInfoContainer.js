import React, { PureComponent } from 'react';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import ContactInfoDomain from './ContactInfoDomain';

@DomainComponentCreator(ContactInfoDomain)
export default class ContactInfoContainer extends PureComponent {
    render() {
        return (
            <div className="contact-info-container">
                this is contact info container!
            </div>
        );
    }
}
