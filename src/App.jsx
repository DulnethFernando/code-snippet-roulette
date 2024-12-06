import { ThemeProvider, createTheme } from '@mui/material/styles'
import Roulette from './components/Roulette'
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino';

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h6: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    body1: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.1rem',
    },
    code: {
      fontFamily: '"JetBrains Mono", monospace',
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        code: {
          fontFamily: '"JetBrains Mono", monospace',
        },
        pre: {
          fontFamily: '"JetBrains Mono", monospace',
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #3f51b5 30%, #757de8 90%)',
          boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      }}>
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ py: 1 }}>
            <CasinoIcon sx={{ mr: 2, fontSize: '2rem' }} />
            <Typography variant="h6" component="div">
              CodeSnippet Roulette
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Roulette />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
