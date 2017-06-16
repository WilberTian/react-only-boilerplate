import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import { Form, Input, Select, DatePicker, Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import ContactFormDomain from './ContactFormDomain';
import NotificationBox from '../../components/NotificationBox';

@DomainComponentCreator(ContactFormDomain)
class ContactFormComponent extends PureComponent {
    componentWillMount() {
        const { router } = this.props;
        if (router.getCurrentLocation().pathname !== '/contact-add') {
            this._getContactDetail();
        }
    }

    async _getContactDetail() {
        const { action, params } = this.props;
        await action.getContactDetail(params.id);
    }

    _saveContactItem(e) {
        const { action } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const result = await action.saveContact(values);

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

        const { model } = this.props;

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
                            initialValue: model.contactInfo.name,
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
                            initialValue: model.contactInfo.gender,
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
                            initialValue: (model.contactInfo.birthday ?
                                            moment(model.contactInfo.birthday, 'YYYY-MM-DD') :
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
                            initialValue: model.contactInfo.phone,
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
                            initialValue: model.contactInfo.email,
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
                            initialValue: model.contactInfo.address,
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
