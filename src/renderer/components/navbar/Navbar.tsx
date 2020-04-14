import * as React from "react";

import "./Navbar.scss";
import { Grid, Input } from "@material-ui/core";

class Navbar extends React.Component {
    constructor(props: any) {
        super(props);

        const apiKey = "AIzaSyBsNHWyO6v2Y5TsB-jL6LXMo3-0udswUxk";
        const playlistId = "PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U";

        // TODO: working fetch need the right info
        const request = fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}`,
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
