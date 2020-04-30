import React, { useState } from 'react';

import LoginForm from './LoginForm';
import RecoverPassword from './RecoverPassword';

const Login = () => {

    const [loginState, setLoginState] = useState({ passwordState: false });

    const changePassHandler = () => {
        setLoginState({ ...loginState, passwordState: !loginState.passwordState })
    }

    if (loginState.passwordState === true) {
        return (
            <RecoverPassword
                changePassHandler={changePassHandler}
            />
        );
    }

    return (
        <LoginForm
            changePassHandler={changePassHandler}
        />
    )
}

export default Login;