import React from "react";
import PropTypes from "prop-types";
const LoadingContext = React.createContext();

function ReusableComponent({ children }) {
  const [loadCount, setLoadCount] = React.useState(0);
  const makeApiCall = async (yourApiCall) => {
    try {
      setLoadCount((state) => state + 1);
      await yourApiCall();
    } finally {
      setLoadCount((state) => state - 1);
    }
  };

  return children({ makeApiCall, isLoading: loadCount > 0 });
}

export function useLoaders() {
  const [loadCount, setLoadCount] = React.useState(0);
  const makeApiCall = async (yourApiCall) => {
    try {
      setLoadCount((state) => state + 1);
      await yourApiCall();
    } finally {
      setLoadCount((state) => state - 1);
    }
  };

  return { isLoading: loadCount > 0, makeApiCall };
}

function LoadingProvider({ children }) {
  const { makeApiCall, isLoading } = useLoaders();
  return (
    <LoadingContext.Provider
      value={{
        makeApiCall,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useGlobalLoader() {
  return React.useContext(LoadingContext);
}

export default LoadingProvider;

export const WithGlobalLoader = (props) => {
  const { makeApiCall, isLoading } = React.useContext(LoadingContext);
  return props.children({ isLoading, makeApiCall });
};

WithGlobalLoader.propTypes = {
  children: PropTypes.func.isRequired,
};
export const withGlobalLoader = (YourComponent) => {
  return function(props) {
    return (
      <LoadingContext.Consumer>
        {({ makeApiCall, isLoading }) => {
          return (
            <YourComponent
              {...props}
              makeApiCall={makeApiCall}
              isLoading={isLoading}
            />
          );
        }}
      </LoadingContext.Consumer>
    );
  };
};

export const WithLocalLoader = (props) => {
  const { makeApiCall, isLoading } = useLoaders();
  return props.children({ makeApiCall, isLoading });
};
WithLocalLoader.propTypes = {
  children: PropTypes.func.isRequired,
};
export const withLocalLoader = (YourComponent) => {
  return class extends React.Component {
    render() {
      return (
        <ReusableComponent>
          {({ makeApiCall, isLoading }) => {
            return (
              <YourComponent
                {...this.props}
                makeApiCall={makeApiCall}
                isLoading={isLoading}
              />
            );
          }}
        </ReusableComponent>
      );
    }
  };
};
