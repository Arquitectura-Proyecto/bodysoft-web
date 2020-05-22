import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Typography, Row, Col, List, Popover, Button, Card, Avatar, Space, Divider } from 'antd';

import { MessageOutlined, LikeOutlined, StarOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

const { Title, } = Typography;


const GET_TOKEN = gql`
query getToken{
  token @client
  type @client
}
`

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

const CREATE_USER_SESSION = gql`
mutation createUserSession($token:String!,$schedule:Int!){
  setAdates(ChangeStatus:{ token: $token,
    schedule:$schedule
  })
}
`

const GET_PROFILE_TRAINER = gql`
query getProfileTrainer($idTrainer:ID!){
  profileTrainerById(idTrainer: $idTrainer){
    trainer_id
    trainer_name
    age
    photo
    telephone
    city
    sum_ratings
    num_ratings
    description
    work_experience
    resources
    specialities
  }
}
`

const CREATE_CHAT_USER_TRAINER = gql`
mutation createChatUserTrainer($token:String!,$trainerId:ID!){
  createChatUserTrainer(
    token:$token,trainerId:$trainerId
    ) {
    _id
    date
    id_user
    id_trainer
  }
}
`

const UserSessionTrainer = () => {

  const token = useQuery(GET_TOKEN).data.token;

  const { id } = useParams();

  const history = useHistory();

  console.log("token", token)

  const { data, loading, error } = useQuery(GET_USER_SESSIONS_COACH, { variables: { token, coach: parseInt(id) } })

  const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useQuery(GET_PROFILE_TRAINER, { variables: { idTrainer: id } })

  const dayHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

  const [cardSession, setCardSession] = useState(null);

  if (loading || loadingProfile) {
    return <div>loading...</div>
  }

  if (error || errorProfile) {
    console.log("error", error)
    console.log("errorProfile", errorProfile)
    return <div>error</div>
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const profile = dataProfile.profileTrainerById;

  profile.photo = 'https://www.frankzane.com/wp-content/uploads/Frank-Home-04-450x450.jpg';

  console.log("profileTrainerById", dataProfile.profileTrainerById);

  const trainers = [profile];

  return (
    <>
      {cardSession}
      <Row><br /></Row>
      <Row justify="center">
        <Col>
          <h1 className="TitleFontTypeRoboto mb-0">Crea una sesión con tu entrenador</h1>
        </Col>
      </Row>
      <Row><br /></Row>

      <Row justify="center">
        <Col xs={12}>
          <Row justify="center"
            style={{ //height: "500px", overflow: "auto", 
              border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px", backgroundColor: "white"
            }}
          >
            <Col >
              <Row><Title level={3}>Perfil del entrenador</Title><Divider style={{ margin: "0px" }} /></Row>

              <List
                itemLayout="vertical"
                size="large"

                dataSource={trainers}

                renderItem={item => (
                  <List.Item
                    key={item.trainer_id}
                    actions={[
                      <IconText icon={StarOutlined} text={
                        item.num_ratings === 0 ? "Sin calificar" : (10 * item.sum_ratings / item.num_ratings) + ""
                      } key="list-vertical-star-o" />,
                      <IconText icon={PhoneOutlined} text={item.telephone} key="list-vertical-star-o" />,
                      <IconText icon={HomeOutlined} text={item.city} key="list-vertical-star-o" />,
                    ]}

                  >
                    <List.Item.Meta
                      avatar={<Avatar style={{ width: "100px", height: "100px" }} src={item.photo} />}
                      title={<p style={{ color: "#434343" }}>{item.trainer_name}</p>}
                      description={
                        <>
                          <div>{
                            item.specialities.map(
                              speciality => <React.Fragment key={speciality}>{speciality} </React.Fragment>
                            )
                          }</div>
                        </>
                      }
                    />
                    {item.description}
                  </List.Item>
                )}
              />
            </Col>

          </Row>
        </Col>
      </Row>
      <Row><br /></Row>
      <Row><br /></Row>

      <Row justify="center">

        <Col xs={23}>
          <Row justify="center"
            style={{ //height: "500px", overflow: "auto", 
              border: "1px solid #e8e8e8", borderRadius: "4px", padding: "8px 24px", backgroundColor: "white"
            }}
          >

            <Col xs={24}>
              <Row justify="center">
                <Row><Title level={3}>Perfil del entrenador</Title></Row>
                <Divider/>
              </Row>
            </Col>


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
            <DaysCalendar sessions={data.getAllbyCoachAvaibles} onClickHour={(e) => { setCardSession(e) }} />

          </Row>
        </Col>
      </Row>
    </>
  )
}

export default UserSessionTrainer;



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
                cursor = "pointer";
                card = <CardAvailable onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                break;
              case 2:
                card = <CardTaken onClickExit={() => onClickHour(null)} name={name} hourSession={item} />
                color = "#096dd9"
                content = "Este horario ha sido seleccionado por un usuario"
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

  const token = useQuery(GET_TOKEN).data.token;

  const { data: dataSesssion, error: errorSession, loading: loadingSesssion } = useQuery(GET_SESSIONS_USER, { variables: { token } });

  const { iniTime, daySession, endTime } = hourSession;

  const { id } = useParams();

  const variables = {
    token: token,
    schedule: hourSession.id_schedule
  }

  const [registerSchedules] = useMutation(
    CREATE_USER_SESSION,
    {
      update(cache) {
        const { getAllbyCoachAvaibles } = cache.readQuery({ query: GET_USER_SESSIONS_COACH, variables: { token: token, coach: parseInt(id) } });
        cache.writeQuery({
          query: GET_USER_SESSIONS_COACH, variables: { token: token, coach: parseInt(id) },
          data: { getAllbyCoachAvaibles: getAllbyCoachAvaibles.filter(session => session.id_schedule !== hourSession.id_schedule) },
        })
      }
      , refetchQueries: [{ query: GET_SESSIONS_USER, variables: { token } }]
    },
  )

  const [createCahtUserTrainer] = useMutation(
    CREATE_CHAT_USER_TRAINER
  )

  if (errorSession) {
    return <div>error</div>
  }

  if (loadingSesssion) {
    return <div>loading</div>
  }

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
                    createCahtUserTrainer({variables:{token,trainerId:hourSession.idCoach}});
                    onClickExit(registerSchedules({ variables }));
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

  console.log("id_schedule", hourSession.id_schedule)

  const variables = {
    token: token,
    schedule: hourSession.id_schedule
  }

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