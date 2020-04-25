import * as React from "react";

import "./Navbar.scss";

import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import CardComponent from "../cardComponent/CardComponent";

class Navbar extends React.Component<{}, { youtubeData: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            youtubeData: {}
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
            const responseJson = await response.json();

            // TODO: get next token to get all vids
            // TODO: ? get size of thumbnail in request

            console.log(responseJson);

            this.setState({ youtubeData: responseJson });
        } catch (e) {
            console.log(`There was an error fetching the playlist: ${e}`);
        }
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

                <br />

                {Object.keys(this.state.youtubeData).length > 0
                    ? this.state.youtubeData.items.map((item: any) => (
                          <div key={item.snippet.resourceId.videoId}>
                              <br />

                              <CardComponent
                                  imageSrc={item.snippet.thumbnails.standard.url}
                                  title={item.snippet.title}
                                  subtitle={item.snippet.description}
                                  />
                          </div>
                      ))
                    : ""}
            </Grid>
        );
    }
}

export default Navbar;
