import Detail from '../views/pages/Detail'
import Favorite from '../views/pages/Favorite'
import Home from '../views/pages/Home'

const Routes = {
    '/': Home,
    '/detail/:id': Detail,
    '/favorite': Favorite
}

export default Routes
