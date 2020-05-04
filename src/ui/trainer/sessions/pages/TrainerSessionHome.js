import React, { useState } from 'react';

import '../../../../shared/css/colors.css'
import '../css/trainerSession.css'
import '../css/cards.css'
import 'antd/dist/antd.css';
import { Typography, Row, Col, List, Popover, Button, Card } from 'antd';


import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
const { Title, } = Typography;



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

const CREATE_SESSION = gql`
mutation createSession($token:String!,$daySession:String!,$iniTime:String!,$endTime:String!){
  registerSchedules(schedule: {
    token: $token
    daySession: $daySession
    iniTime: $iniTime
    endTime: $endTime
  }){
    id_schedule
    idCoach
    daySession
    iniTime
    endTime
    status {
      id
      nameStatus
    }
    idUser
  }
}
`

const DELETE_SESSION = gql`
mutation deleteSession($token:String!,$schedule:Int!){
  deleteSchedules(ChangeStatus: {
    token:$token
    schedule:$schedule
  })
}
`
const DELETE_TAKEN_SESSION = gql`
mutation deleteTakenSession($token:String!,$schedule:Int!){
  CancelADate(ChangeStatus: {
    token:$token,
    schedule:$schedule
  })
}
`

const TrainerSessionHome = () => {

  const token = useQuery(GET_TOKEN).data.token;
  console.log('token', token)

  let { data, error, loading } = useQuery(GET_SESSIONS, { variables: { Token: token } });

  const [cardSession, setCardSession] = useState(null);

  //console.log('data', data);
  //console.log('error', error);

  //console.log("DIBUJAAAAAAAAA", dibujar)

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  console.log("SESSIONS QUERY", data);

  const dayHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

  return (
    <>
      {cardSession}
      <Row><br/></Row>
      <Row justify="center">
        <Col>
          <h1 className="TitleFontTypeRoboto mb-0">Tus sesiones</h1>
        </Col>
      </Row>
      <Row><br/></Row>
      <Row justify="center" >
        <Col xs={23}>
          <Row justify="center"
            style={{ //height: "500px", overflow: "auto", 
              border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px",backgroundColor:"white"
            }}
          >
            <Col xs={3}>
              <Row justify="center"  ><Title level={3}>Horario</Title></Row>
              <List
                itemLayout="horizontal"
                dataSource={dayHours}
                renderItem={item => (
                  <List.Item
                    style={{ border: "1px solid #e8e8e8" }}
                  >
                    <List.Item.Meta
                      title={
                        <Row style={{ background: "white" }} justify="center" >
                          {item}
                        </Row>
                      }
                      description=""
                    />
                  </List.Item>
                )}
              />
            </Col>
            <DaysCalendar sessions={data.getAllbyId} onClickHour={(e) => { setCardSession(e) }} />
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

const DaysCalendar = ({ sessions, onClickHour }) => {

  //console.log("DAYCALENDAR", sessions)
/*
  sessions.getAllbyId.map(session => {
    //console.log(session);
    //session.hour = session.iniTime.substring(0, 2);
    //session.day = session.daySession.substring(8, 10);
    //session.dateNumber = session.daySession + "-" + session.iniTime.substring(0, 2);
    return session;
  })
*/

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


  const day1Format = dateFormatYYYMMDD(day1)
  const day2Format = dateFormatYYYMMDD(day2)
  const day3Format = dateFormatYYYMMDD(day3)
  const day4Format = dateFormatYYYMMDD(day4)
  const day5Format = dateFormatYYYMMDD(day5)


  const dayHours = [
    {
      iniTime: "01:00:00",
      endTime: "02:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "02:00:00",
      endTime: "03:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "03:00:00",
      endTime: "04:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "04:00:00",
      endTime: "05:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "05:00:00",
      endTime: "06:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "06:00:00",
      endTime: "07:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "07:00:00",
      endTime: "08:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "08:00:00",
      endTime: "09:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "09:00:00",
      endTime: "10:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "10:00:00",
      endTime: "11:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "11:00:00",
      endTime: "12:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "12:00:00",
      endTime: "13:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "13:00:00",
      endTime: "14:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "14:00:00",
      endTime: "15:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "15:00:00",
      endTime: "16:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "16:00:00",
      endTime: "17:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "17:00:00",
      endTime: "18:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "18:00:00",
      endTime: "19:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "19:00:00",
      endTime: "20:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "20:00:00",
      endTime: "21:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "21:00:00",
      endTime: "22:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "22:00:00",
      endTime: "23:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "23:00:00",
      endTime: "24:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
    {
      iniTime: "24:00:00",
      endTime: "01:00:00",
      status: { id: 0, nameStatus: "Libre" },
    },
  ]

  const sessionsDaysData = {
    day1: {
      name: daysName[day1.getDay()],
      hours: dayHours.map(
        h => { return { ...h } }
      )
    },
    day2: {
      name: daysName[day2.getDay()],
      hours: dayHours.map(
        h => { return { ...h } }
      )
    },
    day3: {
      name: daysName[day3.getDay()],
      hours: dayHours.map(
        h => { return { ...h } }
      )
    },
    day4: {
      name: daysName[day4.getDay()],
      hours: dayHours.map(
        h => { return { ...h } }
      )
    },
    day5: {
      name: daysName[day5.getDay()],
      hours: dayHours.map(
        h => { return { ...h } }
      )
    }
  }

  sessionsDaysData.day1.hours.forEach(
    hour => {

      hour.daySession = day1Format;
    }
  )

  sessionsDaysData.day2.hours.forEach(
    hour => {
      hour.daySession = day2Format;
    }
  )

  sessionsDaysData.day3.hours.forEach(
    hour => {
      hour.daySession = day3Format;
    }
  )

  sessionsDaysData.day4.hours.forEach(
    hour => {
      hour.daySession = day4Format.slice();
    }
  )

  sessionsDaysData.day5.hours.forEach(
    hour => {
      hour.daySession = day5Format.slice();
    }
  )


  sessions.forEach(
    session => {
      switch (session.daySession) {
        case day1Format:
          sessionsDaysData.day1.hours[parseInt(session.iniTime) - 1] = session;
          break;
        case day2Format:
          sessionsDaysData.day2.hours[parseInt(session.iniTime) - 1] = session;
          break;
        case day3Format:
          sessionsDaysData.day3.hours[parseInt(session.iniTime) - 1] = session;
          break;
        case day4Format:
          sessionsDaysData.day4.hours[parseInt(session.iniTime) - 1] = session;
          break;
        case day5Format:
          sessionsDaysData.day5.hours[parseInt(session.iniTime) - 1] = session;
          break;
        default:
          break;
      }
    }
  )

  console.log('DAYSCOMPONENT', sessionsDaysData)

  return (
    <>
      <DayComponent name={sessionsDaysData.day1.name} dayNumber={1} hours={sessionsDaysData.day1.hours} onClickHour={onClickHour} />
      <DayComponent name={sessionsDaysData.day2.name} dayNumber={2} hours={sessionsDaysData.day2.hours} onClickHour={onClickHour} />
      <DayComponent name={sessionsDaysData.day3.name} dayNumber={3} hours={sessionsDaysData.day3.hours} onClickHour={onClickHour} />
      <DayComponent name={sessionsDaysData.day4.name} dayNumber={4} hours={sessionsDaysData.day4.hours} onClickHour={onClickHour} />
      <DayComponent name={sessionsDaysData.day5.name} dayNumber={5} hours={sessionsDaysData.day5.hours} onClickHour={onClickHour} />
    </>
  )
}

const DayComponent = ({ dayNumber, name, hours, onClickHour }) => {

  return (
    <Col xs={4} justify="center">
      <Row justify="center"><Title level={3}>{name}</Title></Row>
      <List
        itemLayout="horizontal"
        dataSource={hours}
        renderItem={
          item => {
            let { id, nameStatus } = item.status;
            //console.log("ITEM", item.status)
            let content;
            let color;
            let card;
            let cursor;
            if (dayNumber === 1) {
              switch (id) {
                case 4:
                  color = "#8c8c8c"
                  content = "Esta sesion ya termino"
                  break;
                default:
                  nameStatus = null;
                  color = "white";
                  break;
              }
              return (
                <ListItem cursor={cursor} color={color} onClick={
                  () => {
                    onClickHour(card)
                  }}
                  nameStatus={nameStatus}
                />
              )
            }

            switch (id) {
              case 1:
                color = "#7cb305"
                content = "Esperando a que un usuario escoja este horario"
                cursor = "pointer";
                card = <CardAvailable onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                break;
              case 2:
                color = "#096dd9"
                content = "Este horario ha sido seleccionado por un usuario"
                cursor = "pointer";
                card = <CardTaken onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                break;
              case 4:
                color = "#8c8c8c"
                content = "Esta sesion ya termino"
                break;
              default:
                content = "Puedes crear una sesion en este horario";
                color = "white";
                card = <CardFree onClickExit={() => onClickHour(null)} name={name} hourSession={item} />;
                cursor = "pointer";
                //nameStatus = "Libre";
                break;
            }

            return (
              <Popover placement="topLeft" title={nameStatus} content={content}>
                <div>
                  <ListItem cursor={cursor} color={color} onClick={
                    () => {
                      onClickHour(card)
                    }}
                    nameStatus={nameStatus}
                  />
                </div>
              </Popover>
            )
          }}
      />
    </Col>
  )
}

const ListItem = ({ color, cursor, onClick, nameStatus }) => {
  return (
    <div>
      <List.Item
        style={{ border: "1px solid #e8e8e8", backgroundColor: color, cursor: cursor }}
        type="primary"
        onClick={() => onClick()}
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
    </div>
  )

}

const CardFree = ({ name, onClickExit, hourSession }) => {

  const token = useQuery(GET_TOKEN).data.token;

  const { iniTime, daySession, endTime } = hourSession;

  const schedule = {
    token: token,
    daySession: daySession,
    iniTime: iniTime,
    endTime: endTime
  }

  const [registerSchedules] = useMutation(
    CREATE_SESSION,
    {
      update(cache, { data: { registerSchedules } }) {
        const { getAllbyId } = cache.readQuery({ query: GET_SESSIONS, variables: { Token: token } });
        cache.writeQuery({
          query: GET_SESSIONS, variables: { Token: token },
          data: { getAllbyId: getAllbyId.concat([registerSchedules]) },
        })
      }
    }
  )

  return (
    <>
      <div className="maincard" style={{ backgroundColor: "white", borderRadius: "4px" }}>
        <Card title={<h2>Añadir sesión </h2>} bordered={false}>
          <Row>
            <Col xs={12}>
              <h4>Dia:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{name}</h4>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={12}>
              <h4>Hora:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{parseInt(iniTime)}</h4>
              </Row>
            </Col>
          </Row>
          <Row align="center">
            <Col xs={24}>
              <Row><br /></Row>
              <Row >
                <Button
                  style={{ backgroundColor: "#ffbc02", borderColor: "#e3a765", width: "100%", color: "#231F20" }}
                  onClick={() => {
                    registerSchedules({ variables: schedule });
                    onClickExit();
                  }}
                >Crear</Button>
              </Row>
              <Row><br /></Row>
              <Row>
                <Button style={{ width: "100%", color: "#231F20", borderColor: "#8c8c8c" }} onClick={() => onClickExit()}>Cancelar</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="backdropCard" onClick={() => { onClickExit() }} />
    </>
  )
}

const CardAvailable = ({ name, onClickExit, hourSession }) => {

  const token = useQuery(GET_TOKEN).data.token;

  const { iniTime } = hourSession;

  console.log("id_schedule", hourSession.id_schedule)

  const variables = {
    token: token,
    schedule: hourSession.id_schedule
  }

  const [deleteSchedules] = useMutation(
    DELETE_SESSION,
    {
      update(cache) {
        const { getAllbyId } = cache.readQuery({ query: GET_SESSIONS, variables: { Token: token } });
        cache.writeQuery({
          query: GET_SESSIONS, variables: { Token: token },
          data: { getAllbyId: getAllbyId.filter(session => session.id_schedule !== hourSession.id_schedule) },
        })
      }
    }
  )

  return (
    <>
      <div className="maincard" style={{ backgroundColor: "white", borderRadius: "4px" }}>
        <Card title={<h2>Eliminar sesión </h2>} bordered={false}>
          <Row>
            <Col xs={12}>
              <h4>Dia:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{name}</h4>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={12}>
              <h4>Hora:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{parseInt(iniTime)}</h4>
              </Row>
            </Col>
          </Row>
          <Row align="center">
            <Col xs={24}>
              <Row><br /></Row>
              <Row >
                <Button
                  style={{ backgroundColor: "#cf1322", borderColor: "#820014", width: "100%", color: "white" }}

                  onClick={() => {
                    deleteSchedules({ variables: variables });
                    onClickExit();
                  }}
                >Eliminar</Button>
              </Row>
              <Row><br /></Row>
              <Row>
                <Button style={{ width: "100%", color: "#231F20", borderColor: "#8c8c8c" }} onClick={() => onClickExit()}>Cancelar</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="backdropCard" onClick={() => { onClickExit() }} />
    </>
  )
}

const CardTaken = ({ name, onClickExit, hourSession }) => {

  const token = useQuery(GET_TOKEN).data.token;

  const { iniTime } = hourSession;

  console.log("id_schedule", hourSession.id_schedule)

  const variables = {
    token: token,
    schedule: hourSession.id_schedule
  }

  const [deleteSchedules] = useMutation(
    DELETE_TAKEN_SESSION,
    {
      update(cache) {
        const { getAllbyId } = cache.readQuery({ query: GET_SESSIONS, variables: { Token: token } });
        
        cache.writeQuery({
          query: GET_SESSIONS, variables: { Token: token },
          data: { getAllbyId: getAllbyId.filter(session => session.id_schedule !== hourSession.id_schedule) },
        })
      }
    }
  )

  return (
    <>
      <div className="maincard" style={{ backgroundColor: "white", borderRadius: "4px" }}>
        <Card title={<h2>Eliminar sesión </h2>} bordered={false}>
          <Row>
            <Col xs={12}>
              <h4>Dia:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{name}</h4>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={12}>
              <h4>Hora:</h4>
            </Col>
            <Col xs={12}>
              <Row justify="center">
                <h4 style={{ fontWeight: "lighter" }}>{parseInt(iniTime)}</h4>
              </Row>
            </Col>
          </Row>
          <Row align="center">
            <Col xs={24}>
              <Row><br /></Row>
              <Row >
                <Button
                  style={{ backgroundColor: "#cf1322", borderColor: "#820014", width: "100%", color: "white" }}

                  onClick={() => {
                    deleteSchedules({ variables: variables });
                    onClickExit();
                  }}
                >Eliminar</Button>
              </Row>
              <Row><br /></Row>
              <Row>
                <Button style={{ width: "100%", color: "#231F20", borderColor: "#8c8c8c" }} onClick={() => onClickExit()}>Cancelar</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="backdropCard" onClick={() => { onClickExit() }} />
    </>
  )
}