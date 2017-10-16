import './assets/style.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Students from './students';
import Activity_Feed from './activity_feed';
import Nav_Bar from './nav_bar';
import Side_Bar from './side_bar';
import Your_Students from './your_students';
import Login from './login';
import Add_Student_Form from './add_student_form';
import Courses from './courses';


import Test from './test_comp'


class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Nav_Bar/>
        </div>
        <div className='row'>
          <div className='col-2 side-bar'>
            <Side_Bar/>
          </div>
          <div className='col-10'>
            <div className='row'>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/' component={Activity_Feed}/>
            </Switch>
            <Route exact path='/' component={Students}/>
            <Route path='/add_student' component={Add_Student_Form} />
            <Route path='/add_student' component={Your_Students} />
            <Route path='/courses' component={Courses}/>
            </div>
         </div>
        </div>
      </div>
    );
  }
}

export default App;
