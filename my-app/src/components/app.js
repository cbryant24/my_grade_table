import './assets/style.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Students from './students';
import Activity_Feed from './activity_feed';
import Nav_Bar from './nav_bar';
import Side_Bar from './side_bar';
import Your_Students from './your_students';
import Login from './login';
import Add_Student_Form from './add_student_form';
import Courses from './courses';
import Your_Courses from './your_courses';
import Add_Grade_Form from './add_grade_form';

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
            <div className='col-2 side-bar'>
              <Route path='/' component={Side_Bar}/>
            </div>
            <div className='col-10'>
              <div className='row'>
                <Route path='/' component={Activity_Feed}/>
                <Route exact path='/' component={Students}/>
                <Route path='/add_student' component={Add_Student_Form} />
                <Route path='/add_student' component={Your_Students} />

                <Route path='/courses' component={Courses}/>
                <Route path='/courses' component={Your_Courses}/>

                <Route path='/grades' component={Add_Grade_Form}/>
                <Route exact path='/grades' component={Students}/>
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
