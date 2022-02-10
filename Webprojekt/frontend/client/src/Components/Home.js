import * as React from 'react';
import './Home.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Copyright im Footer erstellen 
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Ebuy Company
    </Typography>
  );
}

// Array für Bilder
const cards = [1, 2, 3, 4, 5, 6, 7, 8];

// Such- Button 
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


// Footer
const footers = [
  {title: <a href="https://www.planb.net/">Unternehmen</a>,
    description: [<a href="https://www.planb.net/">Team</a>, 
    <a href="https://www.planb.net/">Geschichte</a>, 
    <a href="https://www.planb.net/">Kontakt</a>, 
    <a href="https://www.planb.net/">Standort</a>,],},
  {title: <a href="https://www.planb.net/"> Produkte</a>,
    description: [<a href="https://www.planb.net/">Kategorien</a>,
      <a href="https://www.planb.net/">Neue Produkte</a>,
      <a href="https://www.planb.net/">Eigene Artikel</a>,],},
  {title: <a href="https://www.planb.net/">Sozial Media</a>,
    description: [<a href="https://www.planb.net/">Twitter</a>, 
    <a href="https://www.planb.net/">Instargram </a>, 
    <a href="https://www.planb.net/">Facebook</a>, 
    <a href="https://www.planb.net/">LinkedIn</a>],},
  {title: <a href="https://www.planb.net/">Richtlinien</a>,
    description: [<a href="https://www.planb.net/">Datenschutz</a>, 
    <a href="https://www.planb.net/">Impressum</a>],}];

function Home() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="#468a84" noWrap sx={{ flexGrow: 1 }}>
            EBUY
          </Typography>
          <Button to='./CreateArtikel' component={Link}> Meine Artikel
            </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Suche ..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h2" align="center" color="#76aeb2" component="p">
          Willkommen bei Ebuy! 
        </Typography>
      </Container>

{/*Produkt Vorschau*/}
      <Container sx={{ py: 2 }} maxWidth="none">
          <Grid container spacing={7}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={4} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Artikel
                    </Typography>
                    <Typography>
                      Beschreibung des Artikels!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Bieten</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


     
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </React.Fragment>
  );
}

// Export der Komponente 
export default Home;

