import { Link } from 'react-router-dom'

const Navbar = () =>{
const logout =()=>{
    window.localStorage.clear()
    window.localStorage.reload()

}
return (
    <header>
        <div className='container'>
            <Link to="/">
                <h1>Food Pals</h1>
            </Link>
            <Link to="/">
                <h2>Home</h2>
            </Link>
            <Link to="/">
                <h2>Manage</h2>
            </Link>
            <Link to="/" onClick={logout} >
                <h2>LogOut</h2>
            </Link>
            
        </div>
    </header>
)

}


export default Navbar;