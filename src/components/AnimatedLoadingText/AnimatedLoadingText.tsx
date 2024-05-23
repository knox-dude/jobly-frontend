import { useState, useEffect } from 'react';

const AnimatedLoadingText = () => {
  const loadingText = ["Loading", "Loading.", "Loading..", "Loading..."];
  const [text, setText] = useState(loadingText[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingText.length;
      setText(loadingText[i]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>{text}</p>;
};

const LoadingComponent = ({ loading }: {loading:boolean}) => {
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p>Please note: this app is hosted for free. Upon arrival/signup, it can take 60 seconds to load.</p>
        <AnimatedLoadingText />
      </div>
    );
  }

  return null;
};

export default LoadingComponent;
