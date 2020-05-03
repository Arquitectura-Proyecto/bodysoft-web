import React from 'react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import CreateRoutineForm from './CreateRoutineForm';

const CREATE_ROUTINE = gql`
mutation CreateRoutines(
    $token: String!,
    $name: String!,
    $description: String!,
    $link_preview: String!,
    $price: Float!,
    $idType: Int!
    ){
    createRoutine(
        token: $token,
        newRoutine: {
            name: $name,
            description: $description,
            link_preview: $link_preview,
            price: $price,
            idType: $idType
        }
    )
}
`

const CreateRoutine = (props) => {

    const [createRoutine, { loading, error }] = useMutation(CREATE_ROUTINE, { errorPolicy: 'all' });

    const onSubmitRoutine = async values => {
        try {
            await createRoutine({
                variables: {
                    token: props.token,
                    name: values.name,
                    description: values.description,
                    link_preview: values.linkPreview,
                    price: values.price,
                    idType: parseInt(values.idType)
                }
            })
            const routine = { ...values, rating: 0, type: { id: values.idType } }
            delete routine.idType;
            props.changedRoutine(routine);
        } catch (e) { }
    };

    if (loading) {
        return (
            <div className="row justify-content-center">
                <div className="col text-center">
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col text-center">
                    <h1 className="FontMaincolor">Crear Rutina</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card text-center py-2" style={{ paddingLeft: "9%", paddingRight: "9%" }}>
                        <CreateRoutineForm
                            onSubmitRoutine={onSubmitRoutine}
                        />
                        <button className="btn btn-link FontBlackLink mb-0" onClick={() => { props.goToRoutinesHome() }}>Volver</button>
                        {(error) &&
                            <div className="alert alert-danger m-0" role="alert">
                                {error.message.substring(19)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateRoutine;