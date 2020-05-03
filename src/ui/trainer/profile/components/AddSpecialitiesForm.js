import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Form, Button, Select } from 'antd';

const GET_SPECIALITIES = gql`
  {
    profileSpecialities{
        speciality_id
        speciality_name
      }
  }
`;

const AddSpecialitiesForm = (props) => {

    const { loading, error, data } = useQuery(GET_SPECIALITIES);

    const types = [];

    const { Option } = Select;

    if (data) {
        data.profileSpecialities.map((data) => {
            const value = data.speciality_id + '|' + data.speciality_name;
            types.push(<Option key={data.speciality_id} value={value}> {data.speciality_name}</Option >)
            return null;
        });
    };

    if (loading) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onSubmitSpeciality}
                layout={'vertical'}
                size={'small'}
            >
                <Form.Item
                    name="speciality"
                    label="Especialidad:"
                    rules={[{ required: true, message: 'Seleccione una especialidad' }]}>
                    <Select
                        placeholder="Especialidades"
                    >
                        {data && types}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Añadir
            </Button>
                </Form.Item>
            </Form>
            {error &&
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    )
}

export default AddSpecialitiesForm;