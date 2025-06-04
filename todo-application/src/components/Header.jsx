import '../App.css'
import Logout from './Logout';
const Header = () => {
let user="";
    try {
        user = localStorage.getItem("username") || "";
    } catch (error) {
        console.log(error)
    }

    return (
        <div className='bg-amber-300 p-4 relative'>
            <h1 className='text-xl text-left font-bold lg:text-center lg:text-3xl'>To-do Application</h1>
            <h3 className='text-left lg:text-center'>Manage your priorities</h3>
            {(user != "") ? <Logout username={user}/> : null}
        </div>
    )
}

export default Header;