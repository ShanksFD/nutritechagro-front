import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { theme } from './theme.js';
import Routes from './routes';
import './config/firebase.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
