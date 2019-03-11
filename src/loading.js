import React from "react";
import PropTypes from "prop-types";

export const useLocalLoaders = () => {
  const [loadCount, setLoadCount] = React.useState(0);
  const makeApiCall = async (yourApiCall) => {
    try {
      setLoadCount((state) => state + 1);
      await yourApiCall();
    } finally {
      setLoadCount((state) => state - 1);
    }
  };
  return {
    makeApiCall,
    isLoading: loadCount > 0,
  };
};
function ReusableComponent({ children }) {
  const { makeApiCall, isLoading } = useLocalLoaders();
  return children({ makeApiCall, isLoading });
}

const LoadingContext = React.createContext();

class LoadingProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <ReusableComponent>
        {({ makeApiCall, isLoading }) => {
          return (
            <LoadingContext.Provider
              value={{
                makeApiCall,
                isLoading,
              }}
            >
              {this.props.children}
            </LoadingContext.Provider>
          );
        }}
      </ReusableComponent>
    );
  }
}
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingProvider;

export const useGlobalLoader = () => {
  return React.useContext(LoadingContext);
};
export const WithGlobalLoader = (props) => {
  return (
    <LoadingContext.Consumer>
      {({ makeApiCall, isLoading }) => {
        return props.children({ isLoading, makeApiCall });
      }}
    </LoadingContext.Consumer>
  );
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
  return (
    <ReusableComponent>
      {({ makeApiCall, isLoading }) => {
        return props.children({ makeApiCall, isLoading });
      }}
    </ReusableComponent>
  );
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
