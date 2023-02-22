import { useState, useEffect } from "react";

import "../assets/css/redirectMessage.css";

interface IProperties {
  appLink: string;
  appName: string;
}

const RedirectionMessage: React.FC<IProperties> = ({ appLink, appName }) => {
  const [countDown, setCountDown] = useState(10);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown((previous) => previous - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (countDown < 0) {
    return null;
  }

  return (
    <div className="redirect-message" role="alert">
      <p>
        Permission denied, did you mean to login into {appName} app?
        <br /> If yes, Please click the link below to goto the {appName} app.
        <br />
      </p>
      <button
        onClick={() => {
          window.location.href = appLink;
          setRedirect(true);
        }}
      >
        {appName}
      </button>
      <p>You will be logged out in {countDown}</p>
    </div>
  );
};

export default RedirectionMessage;
