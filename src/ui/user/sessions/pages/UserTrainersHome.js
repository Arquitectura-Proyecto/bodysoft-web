import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Typography, Row, Col, List, Avatar, Space, Divider } from 'antd';

import { StarOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';

const { Title, } = Typography;

const GET_TRAINERS = gql`
{
  profileTrainers{
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


const UserTrainersHome = () => {

  const { data, error, loading } = useQuery(GET_TRAINERS);

  const token = useQuery(GET_TOKEN).data.token;

  const { error: errorSession, loading: loadingSesssion,refetch} = useQuery(GET_SESSIONS_USER,{variables:{token}});

  const history = useHistory();
  const location = useLocation();

  const [cardSession] = useState(null);

  if (error || errorSession) {
    return <div>error</div>
  }

  if (loading || loadingSesssion) {
    return <div>loading...</div>
  }

  const trainers = data.profileTrainers.map(
    trainer => {
      trainer.photo = 'https://www.frankzane.com/wp-content/uploads/Frank-Home-04-450x450.jpg'
      return trainer;
    }
  )


  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <>
    <button onClick={()=>{refetch()}}>refetch</button>
    {cardSession}
    <Row><br /></Row>
      <Row justify="center">
        <Col>
          <h1 className="TitleFontTypeRoboto mb-0">Escoge tu entrenador favorito</h1>
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
              <Row><Title level={3}>Entrenadores</Title><Divider style={{ margin: "0px" }} /></Row>

              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5,
                }}

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

                    onClick={() => history.push(location.pathname+'/' + item.trainer_id)}

                    style={{ cursor: "pointer" }}

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
      </>
  )
}

export default UserTrainersHome














