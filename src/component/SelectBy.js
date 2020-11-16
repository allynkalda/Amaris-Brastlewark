import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
        width: 130,
        backgroundColor: 'white'
    },
    selectBox: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20px',
            padding: '0px 10px'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '20px'
        },
    }
  }));

  const HAIR_COLOR = [
    {
        value: '',
        label: 'None'
    },
    {
        value: 'Red',
        label: 'Red'
    },
    {
        value: 'Pink',
        label: 'Pink'
    },
    {
        value: 'Green',
        label: 'Green'
    },
    {
        value: 'Black',
        label: 'Black'
    },
    {
        value: 'Gray',
        label: 'Gray'
    }];

    const AGE = [
        {
            value: '',
            label: 'None'
        },
        {
            value: 100,
            label: '0 - 100'
        },
        {
            value: 150,
            label: '100 - 150'
        },
        {
            value: 200,
            label: '150 - 200'
        },
        {
            value: 250,
            label: '250 - 300'
        },
        {
            value: 300,
            label: '> 300'
        }];

export default function SelectBy({ onChange, type }) {
    const classes = useStyles();

    const [hair, setHair] = useState('');
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        if (type === 'hair') {
            setHair(event.target.value);
            onChange(event.target.value, type);
        } else {
            setAge(event.target.value);
            onChange(event.target.value, type);
        }
    };

    const getMenuItem = () => {
        if (type === 'hair') {
            return HAIR_COLOR.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
        } else {
            return AGE.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
        }
    }

    return (
        <div className={classes.selectBox}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id={type === 'hair' ? 'hair-color' : 'age'}>{type === 'hair' ? 'Hair Color' : 'Age'}</InputLabel>
                <Select
                size="small"
                labelId={type === 'hair' ? 'hair-color-select' : 'age-select'}
                id={type === 'hair' ? 'hair-color' : 'age'}
                value={type === 'hair' ? hair : age}
                onChange={handleChange}
                label={type === 'hair' ? 'Hair Color' : 'Age'}
                className={classes.select}
                >
                    {getMenuItem()}
                </Select>
            </FormControl>
        </div>
    )
}
