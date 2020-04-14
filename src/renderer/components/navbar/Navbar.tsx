import * as React from "react";

import "./Navbar.scss";
import { Grid, Input } from "@material-ui/core";

class Navbar extends React.Component {
    constructor(props: any) {
        super(props);

        // TODO: working fetch need the right info
        const request = fetch(
            "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBsNHWyO6v2Y5TsB-jL6LXMo3-0udswUxk&q=mountain%20bikes",
            {
                headers: {
                    Accept: "application/json"
                }
            }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            });
    }

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ border: "1px solid green", padding: "10px" }}>
                <Input placeholder="Search" />
            </Grid>
        );
    }
}

export default Navbar;
