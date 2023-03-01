import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { CityType } from '../App';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


type SearchAppBarProps = {
    setCities: ((value: CityType[]) => void),
    setNumberOfPages: ((value: number) => void)
}
const SearchAppBar = (props: SearchAppBarProps) => {

    const handleSearchSubmit = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchText = ((event.target as HTMLInputElement).value);
            const request = {
                method: 'GET'
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_CITIES}/search?name=${searchText}&page=0&size=20`, request);
            const jsonData = await response.json()
            props.setCities(jsonData.cityDtoList);
            props.setNumberOfPages(jsonData.totalPages -1 )
        }

    }, [props])

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" noWrap sx={{ textAlign: "left" }}>
                    City list
                </Typography>
                <Box sx={{ mx: 'auto', flexGrow: 0.2 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ mx: 5, width: '100%' }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={handleSearchSubmit}
                        />
                    </Search>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default SearchAppBar;