import React, { useEffect, useState } from 'react';
import { getGnomes } from '../api/api';
import Cards from '../component/Cards';
import ReactPaginate from 'react-paginate';
import loading from '../images/loading.gif'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Search from '../component/Search';
import SelectBy from '../component/SelectBy';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2rem'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            paddingRight: '30px'
        },
        '& a': {
            margin: '5px',
            padding: '10px',
            borderRadius: '30px',
            border: '1px solid #6c7ac9',
            color: '#6c7ac9',
            backgroundColor: 'white'
        }
    },
    pageLink: {
        '& a': {
            color: '#fff',
            background: '#6c7ac9'
        }
    },
    nav: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: '#3F4FB4',
        marginLeft: '2rem',
        marginRight: '2rem'
    },
    select: {
        display: 'flex'
    }
  }));

export default function Landing() {
    const classes = useStyles();

    const [ gnomes, setGnomes ] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState('')

    const PER_PAGE = 12;
    const offset = currentPage * PER_PAGE;

    const getAllGnomes = (val, type) => {
        getGnomes()
            .then((response) => {
            if (val && type === 'hair') {
                const selected = response.data.Brastlewark.filter(item => item.hair_color === val);
                setGnomes(selected);
            } else if (val && type === 'age') {
                const selected = () => {
                    if (val === 100) return response.data.Brastlewark.filter(item => item.age < val);
                    if (val === 150) return response.data.Brastlewark.filter(item => item.age < val && item.age > 100);
                    if (val === 200) return response.data.Brastlewark.filter(item => item.age < val && item.age > 150);
                    if (val === 250) return response.data.Brastlewark.filter(item => item.age < val && item.age > 200);
                    if (val === 300) return response.data.Brastlewark.filter(item => item.age > 300);
                    return response.data.Brastlewark;
                }
                setGnomes(selected);
            } else {
                setGnomes(response.data.Brastlewark);
            }
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data);
                  } else {
                    setError(error.message);
                  }
            })
    };

    useEffect(() => {
        getAllGnomes();
    }, [])

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const currentPageData = gnomes
        .slice(offset, offset + PER_PAGE)
        .map((item) => {
            return (
                <Grid key={item.id} item md={4} sm={12} align="center">
                    <Cards
                        placeholder={loading}
                        src={item.thumbnail}
                        alt={item.name}
                        age={item.age}
                        height={item.height}
                        hairColor={item.hair_color}
                        professions={item.professions}
                        friends={item.friends}
                        />
                </Grid>
            )
        });
    
    const pageCount = Math.ceil(gnomes.length / PER_PAGE);

    const handleSearch = (value) => {
        if (value) {
            const searched = gnomes.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setGnomes(searched);
        } else {
            getAllGnomes();
        }
    };

    const selectHair = (value, type) => {
        if (value) {
            getAllGnomes(value, type);
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <h2 className={classes.header}>Gnomester</h2>
                <div className={classes.select}>
                    <SelectBy type="age" onChange={selectHair} />
                    <SelectBy type="hair" onChange={selectHair} />
                </div>
                <Search onClick={handleSearch}/>
            </div>
        <Grid container align="center">
            {!error ? currentPageData : error}
        </Grid>
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={classes.pagination}
            activeClassName={classes.pageLink}
        />
        </div>
    )
}
