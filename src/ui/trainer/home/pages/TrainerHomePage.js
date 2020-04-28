import React from 'react';
import { useHistory } from 'react-router-dom';

const TrainerHomePage = (props) => {

  const history = useHistory();

  return (
    <div>
      <h1>TrainerHomePage</h1>
      <button onClick={() => { history.push('/session') }}>SESSION</button>
    </div>
  )
}

export default TrainerHomePage;