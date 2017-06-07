import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import AdminPage from './containers/AdminPage.jsx';


const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [

        {
            path: '/',
            component: LoginPage
        },

        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/home',
            component: HomePage
        },

        {
            path: '/signup',
            component: SignUpPage
        },

        {
            path: '/admin',
            component: AdminPage
        }

    ]
};

export default routes;
