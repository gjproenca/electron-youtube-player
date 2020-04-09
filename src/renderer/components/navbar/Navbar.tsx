import * as React from "react";

import "./Navbar.scss";
import { Grid, Input } from "@material-ui/core";

const Navbar: React.FunctionComponent = () => (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ border: "1px solid green", padding: "10px" }}>
        <Input placeholder="Search" />
    </Grid>
);

export default Navbar;
