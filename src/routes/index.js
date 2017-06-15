import App from '../containers/common/App';
import ContactInfoContainer from '../containers/contactInfo/ContactInfoContainer';
import ContactListContainer from '../containers/contactList/ContactListContainer';
import ContactFormContainer from '../containers/contactForm/ContactFormContainer';
import NotFound from './NotFound';

const ContactDetailRoute = {
    path: 'contact-detail/:id',
    component: ContactInfoContainer,
};

const ContactAddRoute = {
    path: 'contact-add',
    component: ContactFormContainer,
};

const ContactEditRoute = {
    path: 'contact-edit/:id',
    component: ContactFormContainer,
};

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ContactListContainer,
    },
    childRoutes: [
        ContactDetailRoute,
        ContactAddRoute,
        ContactEditRoute,
        notFountRoute
    ]
};

export default route;
