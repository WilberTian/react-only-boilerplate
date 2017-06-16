
import services from '../../services/contactService';

const domain = {

    model: {
        contactList: []
    },

    action: {
        getContactList: async () => {
            const result = await services.getContactList();

            domain.dispatch({
                ...domain.model,
                contactList: result.list
            });
        },

        queryContactList: async () => {
            const result = await services.queryContactList();

            domain.dispatch({
                ...domain.model,
                contactList: result.list
            });
        }

    }
};

export default domain;
