import React from 'react';
import Img from "react-cool-img";
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        margin: '20px',
        padding: '20px 10px',
        maxWidth: 355,
        minHeight: '65vh'
    }
  });

export default function Cards({ placeholder, src, alt, age, height, hairColor, professions, friends }) {

    const getList = (array) => {
        if (!array.length) return 'None';
        const list = array.map((item, index) => {
            if (index === array.length - 1) {
                return <span> {item}.</span>
            } else {
                return <span> {item},</span>
            }
        });
        return list;
    }

    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <Img
            alt={alt}
            placeholder={placeholder}
            src={src}
        // error={errorImage}
      />
        <Typography gutterBottom variant="h5" component="h2">
            {alt}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Age: {age}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Height: {height}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Hair color: {hairColor}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Professions: {getList(professions)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Friends: {getList(friends)}
        </Typography>
      </Card>
    )
}
