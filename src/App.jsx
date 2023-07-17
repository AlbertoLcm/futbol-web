import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouter } from "./routers/AppRouter";
import { AuthProvider } from "./auth/providers/AuthProvider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import "./styles/App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AuthProvider>
          <main>
            <AppRouter />
          </main>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
