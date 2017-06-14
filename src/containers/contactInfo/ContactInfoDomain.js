
import services from '../../services/contactService';

const domain = {

    model: {
        contactInfo: {
            id: null,
            name: '',
            gender: '',
            birthday: '',
            phone: '',
            address: ''
        }
    },

    action: {
        getContactDetail: async (dispatch, model) => {
            const result = await services.getContactDetail();

            dispatch({
                ...model,
                contactInfo: result.contact
            });
        }

    }
};

export default domain;
