import React from 'react';

import { Form, InputNumber, Button } from 'antd';

const ValidateAcount = (props) => {

    return (
        <>
            <h1 className="TitleFontTypeRoboto">Validar Cuenta</h1>
            <p>Su cuenta fue creada exitosamente, pero para poder utilizar la cuenta hay que validarla con el correo electrónico. En el formulario de abajo ingrese el código de verificación enviado al correo electrónico con el que creó la cuenta.</p>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onFinish}
                layout={'vertical'}
                size={'large'}
            >
                <Form.Item
                    label="Codigo de verificacion."
                    name="vcode"
                    rules={[{ required: true, type: 'number', message: 'Por favor ingrese un codigo valido' }]}
                >
                    <InputNumber />
                </Form.Item>
                <br/>
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
            {props.mutationLoading &&
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {props.mutationError &&
                <div className="alert alert-danger m-0" role="alert">
                    {props.mutationError.message.substring(19)}
                </div>
            }
        </>
    )
}

export default ValidateAcount;