import React from 'react';

import gql from 'graphql-tag';
import { useMutation, } from "@apollo/react-hooks";

import { Form, InputNumber, Button , Input} from 'antd';

const VALIDATE_USER = gql`
  mutation ValidateUser($Email: String!, $Vcode: Int!){
    authVerifyAcount(email: $Email, vcode: $Vcode)
  }
`;

const ValidateAcount = (props) => {

    const [validateUser, { loading: mutationLoading, error: mutationError }] = useMutation(VALIDATE_USER, { errorPolicy: 'all' });

    const onSubmitValidate = async values => {
        try {
            await validateUser({ variables: { Email: values.Email, Vcode: values.vcode } });
            props.validated();
        } catch (e) { }
    };

    return (
        <>
            <h1 className="TitleFontTypeRoboto">Validar Cuenta</h1>
            <p>Su cuenta fue creada exitosamente, pero para poder utilizar la cuenta hay que validarla con el correo electrónico. En el formulario de abajo ingrese el código de verificación enviado al correo electrónico con el que creó la cuenta.</p>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmitValidate}
                layout={'vertical'}
                size={'large'}
            >
                <Form.Item
                    label="Correo"
                    name="Email"
                    rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo valido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Codigo de verificacion."
                    name="vcode"
                    rules={[{ required: true, type: 'number', message: 'Por favor ingrese un codigo valido' }]}
                >
                    <InputNumber />
                </Form.Item>
                <br />
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Validar
                    </Button>
                </Form.Item>
            </Form>
            {mutationLoading &&
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {mutationError &&
                <div className="alert alert-danger m-0" role="alert">
                    {mutationError.message.substring(19)}
                </div>
            }
        </>
    )
}

export default ValidateAcount;