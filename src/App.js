import { Routes, Route } from 'react-router-dom'
import Main from './component/page/Main'
import Gpon from './component/page/gpon/Gpon'
import Ont from './component/page/ont/Ont'
import Olt from './component/page/olt/Olt'
import CreateOlt from './component/page/olt/CreateOlt'
import EditOlt from './component/page/olt/EditOlt'
import Pon from './component/page/pon/Pon'
import CreatePon from './component/page/pon/CreatePon'
import EditPon from './component/page/pon/EditPon'
import Odp from './component/page/odp/Odp'
import CreateOdp from './component/page/odp/CreateOdp'
import EditOdp from './component/page/odp/EditOdp'
import CreateGpon from './component/page/gpon/CreateGpon'
import EditGpon from './component/page/gpon/EditGpon'
import Costumer from './component/page/costumer/Costumer'
import CreateCostumer from './component/page/costumer/CreateCostumer'
import EditCostumer from './component/page/costumer/EditCostumer'
import Login from './component/Login'
import History from './component/page/log/History'
import Dismantle from './component/page/dismantle/Dismantle'
import { Create } from './component/installation/Create'
import { Edit } from './component/installation/Edit'


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main />} />
      <Route path='installation/create' element={<Create />} />
      <Route path='installation/edit/:id' element={<Edit />} />
      <Route path='gpon' element={<Gpon />} />
      <Route path='gpon/create' element={<CreateGpon />} />
      <Route path='gpon/edit' element={<EditGpon />} />
      <Route path='ont' element={<Ont />} />
      <Route path='olt' element={<Olt />} />
      <Route path='olt/create' element={<CreateOlt />} />
      <Route path='olt/edit/:id' element={<EditOlt />} />
      <Route path='pon' element={<Pon />} />
      <Route path='pon/create' element={<CreatePon />} />
      <Route path='pon/edit/:id' element={<EditPon />} />
      <Route path='odp' element={<Odp />} />
      <Route path='odp/create' element={<CreateOdp />} />
      <Route path='odp/edit/:id' element={<EditOdp />} />
      <Route path='costumer' element={<Costumer />} />
      <Route path='costumer/create' element={<CreateCostumer />} />
      <Route path='costumer/edit/:id' element={<EditCostumer />} />
      <Route path='log' element={<History />} />
      <Route path='dismantle' element={<Dismantle />} />
    </Routes>
  )
}

export default App