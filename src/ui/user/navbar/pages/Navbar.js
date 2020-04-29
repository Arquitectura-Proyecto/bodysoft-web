import React from 'react';

import '../../../../shared/css/colors.css'
import '../css/trainerSession.css'
import 'antd/dist/antd.css';
import { Row, Col, Layout, Menu } from 'antd';

import whitelogo from '../../../../shared/images/whitelogo.webp';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

const { Header } = Layout;

const Navbar = () => {

    const history = useHistory();
    const client = useApolloClient();

    return (
        <>
            <Header className="BlackColorMenu header" >
                <div className="LogoBodySoft">
                    <div onClick={()=>history.push('/')} style={{cursor:"pointer"}}>
                        <h1 style={{ color: "#fafafa" }}><img alt="react" src={whitelogo} className="img-fluid ml-3" width="55px" style={{ marginRight: "16px" }} />BodySoft</h1>
                    </div>
                </div>
                <Row>
                    <Col>
                        <Menu theme="dark" className="BlackColorMenu" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={() => { history.push('/') }} >Inicio</Menu.Item>
                            <Menu.Item key="2" onClick={() => { history.push('/session') }}>Sesiones</Menu.Item>
                            <Menu.Item key="3" onClick={() => { history.push('/routines') }}>Rutinas</Menu.Item>
                            <Menu.Item key="4" onClick={() => { history.push('/profile') }} >Perfil</Menu.Item>
                            <Menu.Item key="5" onClick={
                                () => {
                                    client.writeData({
                                        data: {
                                            token: "",
                                            type: 0,
                                            profile: false
                                        }
                                    })
                                    localStorage.setItem("token","")
                                    localStorage.setItem("type",0)
                                    localStorage.setItem("profile","")
                                    history.push('/')
                                }
                            } >Cerrar sesion</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        </>
    )
}

export default Navbar;