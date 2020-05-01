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
      status{
        id
        nameStatus
      }
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

  const { data, error, loading } = useQuery(GET_SESSIONS, { variables: { Token: token } });

  console.log('data', data);
  console.log('error', error);

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  const dataDos = [
    {
      title: '1',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
    },
    {
      title: '5',
    },
    {
      title: '6',
    },
    {
      title: '7',
    },
    {
      title: '8',
    },
    {
      title: '9',
    },
    {
      title: '10',
    },
    {
      title: '11',
    },
    {
      title: '12',
    },
    {
      title: '13',
    },
    {
      title: '14',
    },
    {
      title: '15',
    },
    {
      title: '16',
    },
    {
      title: '17',
    },
    {
      title: '18',
    },
    {
      title: '19',
    },
    {
      title: '20',
    },
    {
      title: '21',
    },
    {
      title: '22',
    },
    {
      title: '23',
    },
    {
      title: '24',
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
          <Row justify="center" 
          style={{ //height: "500px", overflow: "auto", 
            border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px" 
          }}
            >
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
            <DaysCalendar sessions={data} />
          </Row>
        </Col>
      </Row>

    </>
  )
}

export default TrainerSessionHome;


const dateFormatYYYMMDD = (today) => {
  let month = '' + (today.getMonth() + 1);
  let day = '' + today.getDate();
  const year = today.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return year + "-" + month + "-" + day;
}

const DaysCalendar = ({ sessions }) => {

  console.log("DAYCALENDAR", sessions)

  console.log(sessions.getAllbyId.map(session => {
    console.log(session);
    session.hour = session.iniTime.substring(0, 2);
    session.day = session.daySession.substring(8, 10);
    //session.dateNumber = session.daySession + "-" + session.iniTime.substring(0, 2);
    return session;
  })
  )

  const dayHours = [
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      status: { id: 0, nameStatus: "Libre" },
    },
  ]
  let day1 = new Date();
  let day2 = new Date();
  let day3 = new Date();
  let day4 = new Date();
  let day5 = new Date();

  day2.setDate(day2.getDate() + 1)
  day3.setDate(day3.getDate() + 2)
  day4.setDate(day4.getDate() + 3)
  day5.setDate(day5.getDate() + 4)


  const daysName = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  const sessionsDaysData = {
    day1: {
      name: daysName[day1.getDay()],
      hours: dayHours.slice()
    },
    day2: {
      name: daysName[day2.getDay()],
      hours: dayHours.slice()
    },
    day3: {
      name: daysName[day3.getDay()],
      hours: dayHours.slice()
    },
    day4: {
      name: daysName[day4.getDay()],
      hours: dayHours.slice()
    },
    day5: {
      name: daysName[day5.getDay()],
      hours: dayHours.slice()
    }
  }

  day1 = dateFormatYYYMMDD(day1)
  day2 = dateFormatYYYMMDD(day2)
  day3 = dateFormatYYYMMDD(day3)
  day4 = dateFormatYYYMMDD(day4)
  day5 = dateFormatYYYMMDD(day5)


  sessions.getAllbyId.forEach(
    session => {
      switch (session.daySession) {
        case day1:
          sessionsDaysData.day1.hours[parseInt(session.hour) - 1] = session;
          break;
        case day2:
          sessionsDaysData.day2.hours[parseInt(session.hour) - 1] = session;
          break;
        case day3:
          sessionsDaysData.day3.hours[parseInt(session.hour) - 1] = session;
          break;
        case day4:
          sessionsDaysData.day4.hours[parseInt(session.hour) - 1] = session;
          break;
        case day5:
          sessionsDaysData.day5.hours[parseInt(session.hour) - 1] = session;
          break;
        default:
          break;
      }
    }
  )

  //console.log('DAYSCOMPONENT', sessionsDaysData)

  return (
    <>
      <DayComponent name={sessionsDaysData.day1.name} hours={sessionsDaysData.day1.hours} />
      <DayComponent name={sessionsDaysData.day2.name} hours={sessionsDaysData.day2.hours} />
      <DayComponent name={sessionsDaysData.day3.name} hours={sessionsDaysData.day3.hours} />
      <DayComponent name={sessionsDaysData.day4.name} hours={sessionsDaysData.day4.hours} />
      <DayComponent name={sessionsDaysData.day5.name} hours={sessionsDaysData.day5.hours} />
    </>
  )
}

const DayComponent = ({ name, hours }) => {
  return (
    <Col xs={4} justify="center">
      <Row justify="center"><Title level={3}>{name}</Title></Row>
      <List
        itemLayout="horizontal"
        dataSource={hours}
        renderItem={
          item => {
            const { id, nameStatus } = item.status;
            //console.log("ITEM", item.status)
            let content;
            let color;
            switch (id) {
              case 1:
                color = "#7cb305"
                content = "Esperando a que un usuario escoja este horario"
                break;
              case 2:
                color = "#096dd9"
                content = "Este horario ha sido seleccionado por un usuario"
                break;
              default:
                content = "Puedes crear una sesion en este horario";
                color = "white";
                break;
            }
            return (
              <Popover placement="topLeft" title={nameStatus} content={content}>
                <List.Item
                  style={{ border: "1px solid #e8e8e8", backgroundColor: color,cursor:"pointer" }}
                  type="primary"
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <Row style={{ color: "white" }} justify="center" >
                          {nameStatus}
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
  )
}