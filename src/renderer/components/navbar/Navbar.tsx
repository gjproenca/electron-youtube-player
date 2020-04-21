import * as React from "react";

import "./Navbar.scss";
import { Grid, Input, Button } from "@material-ui/core";

class Navbar extends React.Component<{}, { items: any[] }> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: []
        };
    }

    getPlaylistVideos = async () => {
        const apiKey = "AIzaSyBsNHWyO6v2Y5TsB-jL6LXMo3-0udswUxk";
        const searchBar = (document.getElementById("searchBar") as HTMLInputElement).value;
        let playlistId = "PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U";

        if (searchBar !== "") {
            playlistId = searchBar;
        }

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}`,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            );
            const data = await response.json();

            // TODO: get next token to get all vids
            // TODO: ? get size of thumbnail in request
            // TODO: ? return array of objects instead of direct array
            const itemsInformation: any[] = data.items.map((item: any) => [
                item.snippet.resourceId.videoId,
                item.snippet.title,
                item.snippet.description,
                item.snippet.thumbnails.standard.url
            ]);

            console.log(data);
            console.log(itemsInformation);

            this.setState({ items: itemsInformation });

            return itemsInformation;
        } catch (e) {
            console.log(`There was an error fetching the playlist videos: ${e}`);
        }
        // FIXME: change this line it must have a return
        return "Error";
    };

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ border: "1px solid green", padding: "10px" }}>
                <Input
                    id="searchBar"
                    placeholder="Paste the playlist id here"
                    defaultValue="PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U"
                    />
                <Button
                    onClick={() => this.getPlaylistVideos()}
                    variant="contained"
                    color="primary">
                    Load Playlist
                </Button>
                {this.state.items}
            </Grid>
        );
    }
}

export default Navbar;
