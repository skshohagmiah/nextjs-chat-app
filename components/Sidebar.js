import Chats from "./Chats"
import Navbar from "./Navbar"
import Search from "./Search"
const Sidebar = ({user,dispatch}) => {
  return (
    <div className="flex-1 bg-gray-800 text-white/90">
        <Navbar user={user}/>
        <Search user={user}/>
        <Chats user={user} dispatch={dispatch}/>
    </div>
  )
}

export default Sidebar