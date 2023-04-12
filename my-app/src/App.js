import './App.css';
import Navbar from './compo/navbar';
import Footer  from './compo/Footer';
import Asking from './compo/Asking';
import  About  from './compo/AboutMe';
import Box from './compo/gptbox'
function App() {
  return(
    <div className='body'>
      <Navbar/>
      <Asking />

      <Box />
      <About />
      <Footer />

    </div>
    

  );
}

export default App;
