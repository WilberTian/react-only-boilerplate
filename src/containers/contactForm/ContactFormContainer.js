import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import { Form, Input, Select, DatePicker, Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';

import ContactFormDomain from './ContactFormDomain';
import NotificationBox from '../../components/NotificationBox';

const mapper = {
    modelMapper: (model) => {
        return {
            contactInfo: model.contactInfo
        };
    },
    actionMapper: (action) => {
        return {
            getContactDetail: action.getContactDetail,
            saveContact: action.saveContact
        };
    }
};

@DomainComponentCreator(ContactFormDomain)
@DomainMapper(mapper)
class ContactFormComponent extends PureComponent {
    componentWillMount() {
        const { router } = this.props;
        if (router.getCurrentLocation().pathname !== '/contact-add') {
            this._getContactDetail();
        }
    }

    async _getContactDetail() {
        const { getContactDetail, params } = this.props;
        await getContactDetail(params.id);
    }

    _saveContactItem(e) {
        const { saveContact } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const result = await saveContact(values);

                if (result.status === 1) {
                    NotificationBox({
                        message: 'Success',
                        description: result.message,
                        duration: 2
                    });
                }

                hashHistory.push('/');
            }
        });
    }

    _navBack() {
        hashHistory.goBack();
    }

    _checkName(rule, value, callback) {
        if (value && value.length < 3) {
            callback('Name should be more than 2 chars!');
        } else {
            callback();
        }
    }

    render() {
        const FormItem = Form.Item;
        const Option = Select.Option;
        const { getFieldDecorator } = this.props.form;

        const { contactInfo } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <div>
                <Form onSubmit={::this._saveContactItem}>
                    <FormItem
                      {...formItemLayout}
                      label="Name"
                      hasFeedback
                    >
                        {getFieldDecorator('name', {
                            initialValue: contactInfo.name,
                            rules: [{
                                required: true, message: 'Please input your Name',
                            }, {
                                validator: this._checkName,
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Gender"
                      hasFeedback
                    >
                        {getFieldDecorator('gender', {
                            initialValue: contactInfo.gender,
                            rules: [{
                                required: true, message: 'Please select your gender',
                            }]
                        })(
                            <Select placeholder="Select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Birthday"
                      hasFeedback
                    >
                        {getFieldDecorator('birthday', {
                            initialValue: (contactInfo.birthday ?
                                            moment(contactInfo.birthday, 'YYYY-MM-DD') :
                                            null),
                            rules: [{
                                required: true, message: 'Please select your brithday',
                            }]
                        })(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Phone"
                      hasFeedback
                    >
                        {getFieldDecorator('phone', {
                            initialValue: contactInfo.phone,
                            rules: [{
                                required: true,
                                pattern: /^1[34578]\d{9}$/,
                                message: 'Please input valid phone',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="E-mail"
                      hasFeedback
                    >
                        {getFieldDecorator('email', {
                            initialValue: contactInfo.email,
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Address"
                      hasFeedback
                    >
                        {getFieldDecorator('address', {
                            initialValue: contactInfo.address,
                            rules: [{
                                required: true, message: 'Please input your address',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Save</Button>
                        <Button size="large" onClick={::this._navBack}>Cancel</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const ContactFormComponentWrapper = Form.create()(ContactFormComponent);

export default ContactFormComponentWrapper;
