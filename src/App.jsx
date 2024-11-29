import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import Registro from './components/Registro';
import Restablecer from './components/Restablecer';
import RegistroAdmin from './components/RegistroAdmin';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null);
  const [iduser, setiduser] = useState("");
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser} setiduser={setiduser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user} iduser={iduser}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/retablecer' element={<Restablecer/>}></Route>
        <Route path='/registroAdmin' element={<RegistroAdmin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

// function Navigation(){
//   return <nav>
//     <ul>
//       <li>
//         <Link to="/userHome">userHome</Link>
//       </li>
//       <li>
//         <Link to="/adminHome">adminHome</Link>
//       </li>
//     </ul>
//   </nav>
// }

export default App
