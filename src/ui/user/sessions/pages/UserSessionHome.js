import React, { useState, useEffect, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Typography, Row, Col, List, Popover, Button, Card, Input } from 'antd';
import { CheckOutlined } from "@ant-design/icons";

import '../css/cards.css'

const { Search } = Input;

const { Title, } = Typography;

const GET_SESSIONS_USER = gql`
query getSessionsUser($token:String!){
  getCurrentbyId(Token: $token){
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

const GET_TOKEN = gql`
query getToken{
  token @client
  type @client
}
`

const CANCEL_SESSION_USER = gql`
mutation cancelSessionUser($token:String!,$schedule:Int!){
  CancelADate(ChangeStatus: {
    token:$token
    schedule:$schedule
  })
}
`

const CHATS_USER = gql`
query getChatsUSer($token:String!,$trainerId:ID!){
  chatUserTrainer(
    token:$token
    trainerId:$trainerId
  ) {
    _id
    date
    id_user
    id_trainer
    messages {
      _id
      date
      id_author
      content
    }
  }
}
`
const SEND_MESSAGE = gql`
mutation sendMessage($token:String!,$chatId:ID!,$content:String!){
  createMessageUserTrainer(
  token:$token,
  chatId:$chatId,
  message:{
    content:$content
  }) {
    _id
    date
    id_author
    content
  }
}
`

const UserSessionHome = () => {

  const token = useQuery(GET_TOKEN).data.token;

  const { data: dataSesssion, error: errorSession, loading: loadingSesssion } = useQuery(GET_SESSIONS_USER, { variables: { token } });

  const [cardSession, setCardSession] = useState(null);

  if (errorSession) {
    return <div>error</div>
  }

  if (loadingSesssion) {
    return <div>loading...</div>
  }

  const dayHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
  return (
    <>
      {cardSession}
      <Row><br /></Row>
      <Row><br /></Row>
      <Row justify="center" >
        <Col xs={23}>
          <Row justify="center"
            style={{ //height: "500px", overflow: "auto", 
              border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px", backgroundColor: "white"
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
            <DaysCalendar sessions={dataSesssion.getCurrentbyId} onClickHour={(e) => { setCardSession(e) }} />
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default UserSessionHome;


const GET_USER_SESSIONS_COACH = gql`
query getUserSessionsCoach($token:String!, $coach:Int!){ 
  getAllbyCoachAvaibles(User:$token, coach: $coach){
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
                content = "Puedes tener una sesion en este horario"
                card = <CardAvailable onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                break;
              case 2:
                card = <CardTaken onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                color = "#096dd9"
                content = "Has seleccionado este horario."
                cursor = "pointer";
                break;
              case 4:
                color = "#8c8c8c"
                content = "Esta sesion ya termino"
                break;
              default:
                return (
                  <ListItem cursor={cursor} color={color} onClick={
                    () => {
                      onClickHour(card)
                    }}
                    nameStatus={null}
                  />
                )
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

const CardAvailable = ({ name, onClickExit, hourSession }) => {


  const { iniTime } = hourSession;


  return (
    <>
      <div className="maincard" style={{ backgroundColor: "white", borderRadius: "4px" }}>
        <Card title={<><h3 style={{ marginBottom: "5px" }}>Tomar esta sesión</h3></>} bordered={false}>
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

const CardTaken = ({ name, onClickExit, hourSession }) => {

  const token = useQuery(GET_TOKEN).data.token;

  const { iniTime } = hourSession;

  //console.log("hourSession", hourSession)

  const variables = {
    token: token,
    schedule: hourSession.id_schedule
  }

  const [cancelSesssion] = useMutation(
    CANCEL_SESSION_USER,
    {
      update(cache) {
        const { getCurrentbyId } = cache.readQuery({ query: GET_SESSIONS_USER, variables: { token } })
        cache.writeQuery(
          {
            query: GET_SESSIONS_USER, variables: { token },
            data: { getCurrentbyId: getCurrentbyId.filter(session => session.id_schedule !== hourSession.id_schedule) }
          }
        )
      },
      refetchQueries: [{ query: GET_USER_SESSIONS_COACH, variables: { token, coach: hourSession.idCoach } }]
    }
  )



  //mensajes
  const [menssage, setMenssage] = useState("");

  //const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  console.log("hourSession.idCoach", hourSession.idCoach);

  const { loading, error, data } = useQuery(CHATS_USER, {
    variables: { token, trainerId: hourSession.idCoach },
    skip:false,
    pollInterval: 1000,
  });

  console.log("DATA", data);

  const messages = (data && data.chatUserTrainer && data.chatUserTrainer.messages) || [];

  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);


  //send message

  const [sendMessage] = useMutation(
    SEND_MESSAGE
  )


  if (error) {
    return <div className="alert alert-danger m-0" role="alert">
      {error.message.substring(19)}
    </div>
  }

  if (loading) {
    return <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <>
      <div className="maincardChat" style={{ backgroundColor: "white", borderRadius: "4px" }}>
        <Card title={<h2>Eliminar sesión </h2>} bordered={false}>
          <Row style={{
            border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px", backgroundColor: "white"
          }} >
            <Col xs={24} style={{ height: "300px" }}>
              <Row style={{ overflow: "auto", height: "300px", }}>
                <Col xs={24} style={{ height: "300px" }}></Col>
                {messages.map(message => {
                  if (data.chatUserTrainer.id_user === message.id_author) {
                    return (
                      <Col key={message._id} xs={24}>
                        <Row key={message._id} justify="end">
                          <p key={message._id} style={{
                            border: "1px solid #d3e7c2", borderRadius: "4px", backgroundColor: "#d3e7c2", paddingLeft: "10px", paddingRight: "10px",
                            maxWidth: "80%", wordBreak: "break-all",
                          }}>{message.content}</p>
                        </Row>
                      </Col>
                    )
                  }
                  return (
                      <Col key={message._id} xs={24}>
                        <Row key={message._id}>
                          <p key={message._id} style={{
                            border: "1px solid #e8e8e8", borderRadius: "4px", backgroundColor: "#f0f0f0", paddingLeft: "10px", paddingRight: "10px",
                            maxWidth: "80%", wordBreak: "break-all",
                          }}>{message.content}</p>
                        </Row>
                      </Col>
                    )
                }
                )}
                <div ref={messagesEndRef} />
              </Row>
            </Col>
            <Search
              placeholder="Escribe el mensaje que deseas enviar"
              enterButton={<CheckOutlined />}
              size="large"
              value={menssage}
              onChange={e => {
                //console.log("VALUE", e.target.value);
                setMenssage(e.target.value);
              }}
              onSearch={value => {
                //console.log(value);
                setMenssage("")
                if (value) {
                  sendMessage({
                    variables: {
                      chatId: data.chatUserTrainer._id,
                      token,
                      content: menssage
                    }
                  });
                }
              }}
            />
          </Row>
          <br />
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
                    cancelSesssion({ variables })
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