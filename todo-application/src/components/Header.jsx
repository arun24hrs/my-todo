import '../App.css'
import Logout from './Logout';
const Header = ({user}) => {

    console.log(user, "header")

    return (
        <div className='bg-amber-300 p-4 relative'>
            <h1 className='text-3xl text-center'>To-do Application</h1>
            <h3 className='text-center'>Manage your priorities</h3>
            {user ? <Logout username={user}/> : null}
        </div>
    )
}

export default Header;