import React from "react";
import PropTypes from "prop-types";

import { Divider, Form, Input, Button } from "antd";
const FormItem = Form.Item;

const handleSubmit = (validateFields, onSubmit) => {
    return e => {
        e.preventDefault();

        validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };
};

const NewRevisionForm = ({ form, title, initialData, onSubmit }) => {
    const { getFieldDecorator, validateFields } = form;

    return (
        <div>
            <h2>{title}</h2>
            <Divider />
            <Form onSubmit={handleSubmit(validateFields, onSubmit)}>
                <FormItem>
                    {getFieldDecorator("data", {
                        rules: [
                            {
                                required: true,
                                message: "Please input contents",
                            },
                        ],
                        initialValue: initialData,
                    })(
                        <Input.TextArea
                            autosize={{ minRows: 5, maxRows: 20 }}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};

NewRevisionForm.propTypes = {
    title: PropTypes.string,
    initialData: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(NewRevisionForm);
