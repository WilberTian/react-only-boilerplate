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
        getContactDetail: async (id) => {
            const result = await services.getContactDetail(id);

            domain.dispatch({
                ...domain.getCurrentModel,
                contactInfo: result.contact
            });
        }

    }
};

export default domain;
