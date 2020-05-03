import React from 'react';

import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

import { Form, Input, Button, InputNumber } from 'antd';

const UPDATE_PROFILE = gql`
   mutation UpdateProfile($token: String!, $name: String!, $city: String!, $telephone: String!, $age: Int!, $photo: String!){
    updateProfileUser(
        token: $token,
        body: {
          user_name: $name,
          age: $age,
          city: $city,
          telephone: $telephone,
          photo: $photo
        }
      ){
        user_name,
        age,
        city,
        telephone,
        photo
      }
  }
`;

const UserEditProfile = (props) => {

    const [UpdateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE, { errorPolicy: 'all' });

    const onSubmitValidate = async values => {
        try {
            await UpdateProfile({
                variables: {
                    token: props.token,
                    name: values.user_name,
                    city: values.city,
                    telephone: values.telephone,
                    age: values.age,
                    photo: 'none'
                }
            });
        } catch (e) { }
    };

    if (data) {
        props.changedProfile(data.updateProfileUser);
    }

    if (!props.userData || loading) {
        return (
            <div className="row justify-content-center text-center">
                <div className="col-12">
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <div className="card text-center mt-5" style={{ paddingLeft: "9%", paddingRight: "9%" }}>
                    <h1 className="mt-3">Actualizar Perfil</h1>
                    <Form
                        name="basic"
                        initialValues={props.userData}
                        onFinish={onSubmitValidate}
                        layout={'vertical'}
                        size={'small'}
                    >
                        <Form.Item
                            label="Nombre"
                            name="user_name"
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
                    <div className="mb-3 mt-0">
                        <button className="btn btn-link FontBlackLink mb-0" onClick={() => { props.goToProfile() }}>Volver</button>
                        <button className="btn btn-link FontBlackLink ml-2" onClick={() => { props.goToChangePass() }}>Contraseña</button>
                    </div>
                    {(error) &&
                        <div className="alert alert-danger m-0" role="alert">
                            {error.message.substring(19)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserEditProfile;