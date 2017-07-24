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

            domain.dispatch((model) => {
                return {
                    ...model,
                    contactInfo: result.contact
                };
            });
        },

        saveContact: async (contact) => {
            const result = await services.saveContact(contact);

            return result;
        }

    }
};

export default domain;
