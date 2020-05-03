import React from 'react';

import { Form, Input, Button, InputNumber } from 'antd';

const TrainerUpdateInfoForm = (props) => {

    if (!props.trainerData) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Form
                name="basic"
                initialValues={props.trainerData}
                onFinish={props.onSubmitUpdateProfile}
                layout={'vertical'}
                size={'small'}
            >
                <Form.Item
                    label="Nombre"
                    name="trainer_name"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ciudad:"
                    name="city"
                    rules={[{ required: true, message: 'Por favor ingrese una ciudad válida' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Telefono:"
                    name="telephone"
                    rules={[{ required: true, message: 'Por favor ingrese un telefono valido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Edad:"
                    name="age"
                    rules={[{ required: true, type: 'number', message: 'Por favor ingrese una edad válida', min: 10, max: 120 }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Descripción:"
                    name="description"
                    rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Experiencia laboral:"
                    name="work_experience"
                    rules={[{ required: true, message: 'Por favor ingrese su experiencia laboral' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Recursos:"
                    name="resources"
                    rules={[{ required: true, message: 'Por favor ingrese sus recursos' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <br />
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Actualizar
            </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default TrainerUpdateInfoForm;