import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ThemeProvider, { Normalize } from "@fluent-ui/core/ThemeProvider";
import Box from "@fluent-ui/core/Box";
import { Grommet } from 'grommet';

class HelloMessage extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <Normalize />
        <Box padding={20} background="#CCC">
          <Box acrylic={true} padding={[15, 25]}>
            Acrylic
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

function App(){
  return(
    <HelloMessage />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
