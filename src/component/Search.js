import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        justifyItems: 'center',
        height: '55px'
    },
    field: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1rem',
        },
        backgroundColor: 'white',
        borderRadius: '5px'
    }
  }));

export default function Search({ onClick }) {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = event => {
      setSearchInput(event.target.value);
    };
    return (
        <div className={classes.search}>
            <TextField className={classes.field} id="outlined-basic" label="Search by name" variant="outlined" size="medium" onChange={handleSearchInput}/>
            <Button color="primary" variant="contained" onClick={() => onClick(searchInput)}>Search</Button>
        </div>
    )
}
