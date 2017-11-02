import './assets/style.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav_Bar from './nav_bar';
import Side_Bar from './side_bar';
import Login from './login';

import Courses from './displays/courses';
import Your_Courses from './displays/your_courses';
import Your_Students from './displays/your_students';
import Students from './displays/students';
import Activity_Feed from './displays/activity_feed';
import Delete_Update_Students from './displays/delete_update_student'

import Add_Grade_Form from './forms/add_grade_form';
import Add_Student_Form from './forms/add_student_form';


import { sign_in, get_students } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.sign_in()
  }
  
  render() {
    if (!this.props.auth) {
      return (
        <div className='container login'>
          <div className='row'>
            <Login/>
          </div>
        </div>
      )
    }

    return (
        <div className='container'>
          <div className='row'>
            <Route path='/' component={Nav_Bar}/>
          </div>
          <div className='row'>
            <div className='col s2 side-bar'>
              <Route path='/' component={Side_Bar}/>
            </div>
            <div className='col s10'>
              <div className='row'>
                <Route path='/' component={Activity_Feed}/>
                <Route exact path='/' component={Students}/>
                <Route path='/add_student' component={Add_Student_Form} />
                <Route path='/add_student' component={Your_Students} />

                <Route path='/courses' component={Courses}/>
                <Route path='/courses' component={Your_Courses}/>

                <Route path='/grades' component={Add_Grade_Form}/>
                <Route exact path='/grades' component={Students}/>

                <Route path='/update_student' component={Delete_Update_Students}/>
              </div>
          </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.students.auth,
    all_studs: state.students.all_students
  }
}

export default connect(mapStateToProps, { sign_in, get_students })(App);
