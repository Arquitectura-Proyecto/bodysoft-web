import React from 'react';

import '../../../../shared/css/colors.css'
import '../css/trainerSession.css'
import 'antd/dist/antd.css';
import { Typography, Row, Col, Divider, List, Avatar, message, Popover, Button, Layout, Menu, Switch } from 'antd';

import whitelogo from '../../../../shared/images/whitelogo.webp';

import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Title, } = Typography;

const { Header, Content, Sider } = Layout;

const { SubMenu } = Menu;

const TrainerSessionHome = () => {


  const data = [
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
                dataSource={data}
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
                dataSource={data}
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
                dataSource={data}
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
                dataSource={data}
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
                dataSource={data}
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
                dataSource={data}
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