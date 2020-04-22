import * as React from "react";

import "./Navbar.scss";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

class Navbar extends React.Component<{}, { items: any[] }> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: ["", "", "", ""]
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

            console.log(this.state.items[0][0]);

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

                <hr />

                <Button
                    onClick={() => this.getPlaylistVideos()}
                    variant="contained"
                    color="primary">
                    Load Playlist
                </Button>

                <hr />

                {/* TODO: remove created array use original array */}
                {/* TODO: extreact card component to won component */}
                {/* TODO: change title and alt */}
                {this.state.items.map((item, index) => (
                    // TODO: use video id as key or use 'react-uuid'
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                        <Card>
                            <CardActionArea>
                                <CardMedia component="img" height="140" image={item[3]} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item[1]}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item[2]}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </Grid>
        );
    }
}

export default Navbar;
