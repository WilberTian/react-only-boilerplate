import App from '../containers/common/App';
import ContactInfoContainer from '../containers/contactInfo/ContactInfoContainer';
import ContactListContainer from '../containers/contactList/ContactListContainer';
import NotFound from './NotFound';

const ContactDetailRoute = {
    path: 'contact-detail/:id',
    component: ContactInfoContainer,
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
        notFountRoute
    ]
};

export default route;
