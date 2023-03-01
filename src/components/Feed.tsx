import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useEffect, useState } from 'react';
import { CityType } from '../App';
import EditCityDialog from './EditCityDialog';
import SearchAppBar from './SearchAppBar';

const Feed = () => {

    const [cities, setCities] = useState<CityType[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentCity, setCurrentCity] = useState<CityType>({ id: 0, name: "", photoUrl: "" });
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);

    const fetchCities = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_CITIES}/search?page=${currentPage}&size=20`);
        const jsonData = await response.json();
        setNumberOfPages(jsonData.totalPages - 1);
        setCities(jsonData.cityDtoList);
    }, [currentPage]);

    useEffect(() => {
        fetchCities();
    }, [fetchCities, currentPage])

    const handleOpenEditDialog = useCallback((event: React.MouseEvent<HTMLButtonElement>, city: CityType) => {
        setOpenEditDialog(true);
        setCurrentCity(city);
    }, []);

    const minWidth1000px = useMediaQuery('(min-width:1000px)');

    return (
        <div>
            <SearchAppBar setCities={setCities} setNumberOfPages={setNumberOfPages} />
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ pt: 4 }}>
                <Pagination count={numberOfPages} onChange={(event, value) => setCurrentPage(value)} color="primary" />
                {<ImageList cols={minWidth1000px ? 5 : 2}>
                    {cities.map((city) => (
                        <ImageListItem
                            key={city.id}
                            sx={{
                                margin: 4,
                                borderRadius: 14,
                            }}>
                            <img
                                src={`${city.photoUrl}?fit=crop&auto=format`}
                                srcSet={`${city.photoUrl}?&fit=crop&auto=format&dpr=2 2x`}
                                alt={city.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={city.name}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                        aria-label={`info about ${city.name}`}
                                        onClick={(event) => handleOpenEditDialog(event, city)}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                }

                            />
                        </ImageListItem>
                    ))}
                </ImageList>}
            </Grid>
            <EditCityDialog
                shouldOpen={openEditDialog}
                setOpenEditCityDialog={setOpenEditDialog}
                currentCity={currentCity} />
        </div>

    )
}

export default Feed;