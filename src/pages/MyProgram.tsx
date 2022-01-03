import React from 'react';
import { useHistory } from 'react-router-dom';

export const MyProgram: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <div className="row">
        <h1>MyProgram Page</h1>
        <button
          type="button"
          className="btn"
          cy-data="go-back-button"
          onClick={() => history.goBack()}
        >
          Go back
        </button>
      </div>
    </>
  );
};
