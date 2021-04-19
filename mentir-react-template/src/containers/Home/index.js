import SignIn from '../../components/SignIn';
import Layout from '../../hoc/Layout';
import SignUp from '../../components/SignUp';
import SearchFiles from './SearchFiles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export default function Home() {
    return (
        <Router>
            <Layout>
                <Switch>
                <Route exact path='/' component={SearchFiles}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='/signup' component={SignUp}/>
                </Switch>
            </Layout>
        </Router>
    )
}