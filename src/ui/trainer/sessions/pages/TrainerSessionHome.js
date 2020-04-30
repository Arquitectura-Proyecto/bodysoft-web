import React from 'react';

import '../../../../shared/css/colors.css'
import '../css/trainerSession.css'
import 'antd/dist/antd.css';
import { Typography, Row, Col, Divider, List, Avatar, message, Popover, Button, Layout, Menu, Switch } from 'antd';

import whitelogo from '../../../../shared/images/whitelogo.webp';

import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
const { Title, } = Typography;

const { Header, Content, Sider } = Layout;

const { SubMenu } = Menu;

const GET_SESSIONS = gql`
  query GetSessions($Token:String!){
    getAllbyId(Token:$Token){
      id_schedule
      idCoach
      daySession
      iniTime
      endTime
      idUser
    }
  }
`

const GET_TOKEN = gql`
query getToken{
  token @client
  type @client
}
`

const TrainerSessionHome = () => {

  const token = useQuery(GET_TOKEN).data.token;

  console.log('token', token)

  const { data, error, loading } = useQuery(GET_SESSIONS, { variables: { Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiUHJvZmlsZSI6ZmFsc2UsIlR5cGVJRCI6MSwiZXhwIjoxNTg4MjEwMTMzfQ.Hae2d3fJUdmWNYzM-xKPBTlikGwLbIDVOhA7qNVEAqk" } });

  console.log('data', data);
  console.log('error', error);

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  console.log(data.getAllbyId.map(session => {
    console.log(session);
    session.hour = session.iniTime.substring(0,2);
    session.day = session.daySession.substring(5,7);
    session.dateNumber = session.daySession +"-"+ session.iniTime.substring(0,2);
    return session;
    })
  )

  console.log(data.getAllbyId);

  const dataDos = [
    {
      title: '1 am',
    },
    {
      title: '2 am',
    },
    {
      title: '3 am',
    },
    {
      title: '4 am',
    },
    {
      title: '5 am',
    },
    {
      title: '6 am',
    },
    {
      title: '8 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
    {
      title: '9 am',
    },
  ];

  return (
    <>
      <Row justify="center">
        <Col>
          <h1 className="TitleFontTypeRoboto mb-0">Tus sesiones</h1>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={23}>
          <Row justify="center" style={{ height: "500px", overflow: "auto", border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px" }}>
            <Col xs={3}>
              <Row justify="center"  ><Title level={3}>Horario</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => (
                  <List.Item
                    style={{ border: "1px solid #e8e8e8" }}
                  >
                    <List.Item.Meta
                      title={
                        <Row style={{ background: "white" }} justify="center" >
                          {item.title}
                        </Row>
                      }
                      description=""
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={4} justify="center">
              <Row justify="center"><Title level={3}>Lunes</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => {
                  let color = "white";
                  let name = "";
                  if (item.title === "2 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  if (item.title === "3 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  return (
                    <Popover placement="topLeft" title={"Disponible"} content={"Esperando a que un usuario escoja este horario"}>
                      <List.Item
                        style={{ border: "1px solid #e8e8e8", backgroundColor: color }}
                        type="primary"
                      >
                        <List.Item.Meta
                          title={
                            <div style={{}}>
                              <Row style={{ color: "white" }} justify="center" >
                                {name}
                                <br />
                              </Row>
                            </div>
                          }
                          description={
                            <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                            </Row>
                          }
                        />
                      </List.Item>
                    </Popover>
                  )
                }}
              />
            </Col>
            <Col xs={4} justify="center">
              <Row justify="center"><Title level={3}>Martes</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => {
                  let color = "white";
                  let name = "";
                  if (item.title === "1 am") {
                    name = "Jaime Eduardo"
                    color = "#cf1322"
                    return (
                      <List.Item
                        style={{ border: "1px solid #e8e8e8", backgroundColor: color, cursor: "pointer" }}
                        onClick={() => message.warning('soy una papa')}
                      >
                        <List.Item.Meta
                          title={
                            <div style={{}}>
                              <Row style={{ color: "white" }} justify="center" >
                                {name}
                                <br />
                              </Row>
                            </div>
                          }
                          description={
                            <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                            </Row>
                          }
                        />
                      </List.Item>
                    )
                  }
                  if (item.title === "2 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  if (item.title === "3 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  return (
                    <List.Item
                      style={{ border: "1px solid #e8e8e8", backgroundColor: color }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{}}>
                            <Row style={{ color: "white" }} justify="center" >
                              {name}
                              <br />
                            </Row>
                          </div>
                        }
                        description={
                          <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                          </Row>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            </Col>
            <Col xs={4} justify="center">
              <Row justify="center"><Title level={3}>Lunes</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => {
                  let color = "white";
                  let name = "";
                  if (item.title === "1 am") {
                    name = "Jaime Eduardo"
                    color = "#cf1322"
                  }
                  if (item.title === "3 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  return (
                    <List.Item
                      style={{ border: "1px solid #e8e8e8", backgroundColor: color }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{}}>
                            <Row style={{ color: "white" }} justify="center" >
                              {name}
                              <br />
                            </Row>
                          </div>
                        }
                        description={
                          <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                          </Row>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            </Col>
            <Col xs={4} justify="center">
              <Row justify="center"><Title level={3}>Lunes</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => {
                  let color = "white";
                  let name = "";
                  if (item.title === "1 am") {
                    name = "Jaime Eduardo"
                    color = "#cf1322"
                  }
                  if (item.title === "3 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  return (
                    <List.Item
                      style={{ border: "1px solid #e8e8e8", backgroundColor: color }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{}}>
                            <Row style={{ color: "white" }} justify="center" >
                              {name}
                              <br />
                            </Row>
                          </div>
                        }
                        description={
                          <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                          </Row>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            </Col>
            <Col xs={4} justify="center">
              <Row justify="center"><Title level={3}>Lunes</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dataDos}
                renderItem={item => {
                  let color = "white";
                  let name = "";
                  if (item.title === "1 am") {
                    name = "Jaime Eduardo"
                    color = "#cf1322"
                  }
                  if (item.title === "3 am") {
                    name = "Disponible"
                    color = "#096dd9"
                  }
                  return (
                    <List.Item
                      style={{ border: "1px solid #e8e8e8", backgroundColor: color }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{}}>
                            <Row style={{ color: "white" }} justify="center" >
                              {name}
                              <br />
                            </Row>
                          </div>
                        }
                        description={
                          <Row justify="center" style={{ color: "black", fontWeight: "500" }}>

                          </Row>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

    </>
  )
}

export default TrainerSessionHome;
