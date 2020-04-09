import { hot } from "react-hot-loader/root";
import * as React from "react";

import Navbar from "./navbar/Navbar";
import CounterContainer from "../containers/CounterContainer";

// FIXME:check if import worked
// import 'typeface-roboto';

const Application = () => (
    <div>
        <Navbar />
        <CounterContainer />
    </div>
);

export default hot(Application);
