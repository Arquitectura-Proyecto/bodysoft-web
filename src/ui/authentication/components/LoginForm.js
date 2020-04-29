import React from 'react';

import exercise_girl from '../../../shared/images/exercise_girl.webp';

import { Form, Input, Button } from 'antd';

const LoginForm = (props) => {

    return (
        <>
            <h1 className="TitleFontTypeRoboto">BodySoft</h1>
            <img alt="react" src={exercise_girl} style={{ width: "70px" }} className="m-0" />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onFinish}
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
                    label="Contraseña"
                    name="Password"
                    rules={[{ required: true, message: 'Ingrese una contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Ingresar
            </Button>
                </Form.Item>
            </Form>
            <button type="button" className="btn btn-link FontBlackLink" onClick={() => { props.changePassHandler() }}>
                Olvidaste tu contraseña?
            </button>
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

export default LoginForm;