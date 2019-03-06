import React from "react";

function KeyListenerClass() {
  const [currentKey, setCurrentKey] = React.useState("");
  const handleKey = ({ key }) => {
    setCurrentKey(key);
  };

  React.useEffect(() => {
    // componentDidMount
    // componentDidUpdate
    window.addEventListener("keydown", handleKey);
    return () => {
      // componentWillUnmount
      window.removeEventListener("keydown", handleKey);
    };
  }, []);
  return <div>Current key:{currentKey}</div>;
}
// componentWillUnmount() {
//
// }
// componentDidMount() {
//
// }

function ParentComponent() {
  const [isMounted, setIsMounted] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsMounted(true)}>Mount</button>
      <button onClick={() => setIsMounted(false)}>Unmount</button>
      {isMounted ? <KeyListenerClass /> : null}
    </>
  );
}

export default ParentComponent;
