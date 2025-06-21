import { Container, CssBaseline } from '@mui/material';
import MovieContent from './components/MovieContent';
import TopBar from './TopBar';


function App() {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Container>
          <MovieContent />
      </Container>
    </>
  )
}

export default App
