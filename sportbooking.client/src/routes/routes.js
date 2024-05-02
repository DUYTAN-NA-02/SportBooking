import Login from '../pages/Login/index'
import Register from '../pages/Register/index'
import Home from '../pages/Home/index'
import About from '../pages/About/index'
import NotFound from '../pages/NotFound/index'
import Court from '../pages/Court/index'

// Layout components
import Auth from '../layouts/Auth/index'
import Blank from '../layouts/Blank/index'
import Main from '../layouts/Main/index'

const publicRoutes = [
    { path: "/", page: Home, layout: Main },
    { path: "/login", page: Login, layout: Auth },
    { path: "/register", page: Register, layout: Auth },
    { path: "/about", page: About, layout: Blank },
    { path: "/Court/:courtId", page: Court, layout: Main },
    { path: "*", page: NotFound, layout: Blank }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }