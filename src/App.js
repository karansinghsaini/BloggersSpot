import React from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Home from './components/blogs/home';
import Register from './components/register/register';
import Postregister from './components/register/post_register';
import Login from './components/login/login';
import Logout from './components/login/logout';
import Profile from './components/profile/profile';
import Updateprofile from './components/profile/Updateprofile';
import Menu from './components/navbar';
import Author from './components/authors';
import Blog from './components/blogs/new_blog';
import Detail from './components/blogs/blog_detail';


class App extends React.Component {
  // const [check, setCheck] = useState(false);

  // useEffect = () => {
  //   setCheck(this.props.reducer_state.check)
  // }

render(){
  return(
      <div className="App">
          <BrowserRouter>
          <Menu />
                  <Switch>
                      <Route exact path='/' component={Register} /> 
                      {/* { check && <Route exact path='/' component={Home} /> } */}
                      <Route exact path='/home' component={Home} />
                      
                      <Route path='/register' component={Register} />
                      <Route path='/success-register' component={Postregister} />


                      <Route path='/login' component={Login} />
                      <Route path='/logout' component={Logout} />
                      <Route path='/profile' render={(props) => <Profile {...props}/>} />
                      <Route path='/update-profile' component={Updateprofile} />
                      <Route path='/authors' component={Author} />
                      <Route path='/new-blog' component={Blog} />
                      <Route path='/authors' component={Author} />
                      <Route path='/blog-detail' render={(props) => <Detail {...props}/>} />
                  
                  </Switch>

          </BrowserRouter>
      </div>
  );
}
}

//Accessing the state of the reducer


export default (App);
