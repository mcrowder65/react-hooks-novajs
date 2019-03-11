import React from "react";

function KeyListenerHook() {
  const [currentKey, setCurrentKey] = React.useState("");
  const handleKey = React.useCallback({ key }) => {
    setCurrentKey(key);
  }, []);
  React.useEffect(() => {
    // componentDidMount
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      // componentWillUnmount
    };
  }, []);
  return <div>Current key:{currentKey}</div>;
}

function ParentComponent() {
  const [isMounted, setIsMounted] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsMounted(true)}>Mount</button>
      <button onClick={() => setIsMounted(false)}>Unmount</button>
      {isMounted ? <KeyListenerHook /> : null}
    </>
  );
}

export default ParentComponent;
