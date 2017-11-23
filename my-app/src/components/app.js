import './assets/style.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav_Bar from './nav_bar';
import Side_Bar from './side_bar';
import Login from './login';

import Activity_Feed from './displays/activity_feed';

import App_Form from './forms/app_form';
import Display_Table from './displays/display_table';

import { sign_in, get_students } from '../actions';

import Side_Nav from './side-nav';
import Modal from './student_modal';

/**
 * @class 
 * @classdesc Holds forms, tables, and navigation links
 */
class App extends Component {
    /**
     * @function componentWillMount
     * @returns verifiys if the user is signed in previously
     * verify across every component the user 
     * has a profile and is signed in through the 
     */
  componentWillMount() {
    this.props.sign_in()
  }
  
  render() {
    debugger
    if (!this.props.auth) 
      return <Login/>

    return (
        <div>
          <Modal/>
          <div className='row'>
            <Side_Nav/>
            
            <Route path='/' component={Nav_Bar}/>
          </div>
          <div className='row'>
            <div className='col-2 side-bar'>
              <Route path='/' component={Side_Bar}/>
            </div>
            <div className='col-10 main-background'>
              <div className='row'>
                <Route path='/' component={Activity_Feed}/>
                <Route path='/my-students' component={App_Form} />
                <Route path='/my-courses' component={App_Form} />
                <Route path='/my-assignments' component={App_Form} />
                <Route path='/my-grades' component={App_Form}/>
              </div>
              <Route path='/' component={Display_Table}/>
            </div>
          </div>
        </div>
    );
  }
}

/**
 * @function mapStateToProps
 * @param {Object} state 
 * @returns adds state auth to props to verify user login 
 * @returns adds state array all_studs to props to create table home table
 */
function mapStateToProps(state) {
  return {
    auth: state.students.auth,
    all_studs: state.students.all_students
  }
}

export default connect(mapStateToProps, { sign_in, get_students })(App);
