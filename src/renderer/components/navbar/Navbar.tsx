import * as React from "react";

import "./Navbar.scss";

import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import CardComponent from "../cardComponent/CardComponent";

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
            console.log(`There was an error fetching the playlist: ${e}`);
        }

        // FIXME: refactor this line
        return "Change this";
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
                <Divider />

                {/* TODO: remove created array use original array */}
                {/* TODO: extreact card component to won component */}
                {/* TODO: change title and alt */}
                {this.state.items.length > 0
                    ? this.state.items.map(item => (
                          <div key={item[0]}>
                              <br />

                              <CardComponent
                                  imageSrc={item[3]}
                                  title={item[1]}
                                  subtitle={item[2]}
                                  />
                          </div>
                      ))
                    : ""}
            </Grid>
        );
    }
}

export default Navbar;
