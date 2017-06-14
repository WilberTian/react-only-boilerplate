
import services from '../../services/contactService';

const domain = {

    model: {
        contactList: []
    },

    action: {
        getContactList: async (dispatch, model) => {
            const result = await services.getContactList();

            dispatch({
                ...model,
                contactList: result.list
            });
        },

        queryContactList: async (dispatch, model) => {
            const result = await services.queryContactList();

            dispatch({
                ...model,
                contactList: result.list
            });
        }

    }
};

export default domain;
