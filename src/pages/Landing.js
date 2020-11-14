import React, { useEffect, useState } from 'react';
import { getGnomes } from '../api/api';
import Cards from '../component/Cards';
import ReactPaginate from 'react-paginate';
import loading from '../images/loading.gif'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        cursor: 'pointer',
        '& a': {
            margin: '5px',
            padding: '10px',
            borderRadius: '30px',
            border: '1px solid #6c7ac9',
            color: '#6c7ac9'
        }
    },
    pageLink: {
        '& a': {
            color: '#fff',
            background: '#6c7ac9'
        }
    }
  });

export default function Landing() {

    const classes = useStyles();

    const [ gnomes, setGnomes ] = useState([])
    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 12;
    const offset = currentPage * PER_PAGE;

    useEffect(() => {
        getGnomes()
          .then((response) => {
            console.log(response.data.Brastlewark)
            setGnomes(response.data.Brastlewark);
          })
      }, [])

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const currentPageData = gnomes
        .slice(offset, offset + PER_PAGE)
        .map((item) => {
            return (
                <Grid key={item.id} item md={4}>
                    <Cards
                        placeholder={loading}
                        src={item.thumbnail}
                        // error={errorImage}
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

    return (
        <div>
        <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={classes.pagination}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={classes.pageLink}
        />
        <Grid container align="center">
            {currentPageData}
        </Grid>
        </div>
    )
}
