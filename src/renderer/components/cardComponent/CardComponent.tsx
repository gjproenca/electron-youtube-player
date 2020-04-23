import * as React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export interface Props {
    imageSrc: string;
    title: string;
    subtitle: string;
}

// TODO: ? find better name
const CardComponent: React.FunctionComponent<Props> = ({ imageSrc, title, subtitle }) => (
    <div>
        <Card>
            <CardActionArea>
                <CardMedia component="img" height="140" image={imageSrc} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {subtitle}
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
);

export default CardComponent;
