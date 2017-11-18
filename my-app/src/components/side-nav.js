import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_in, sign_out } from '../actions'; //signin and signout actionss
import ScrollLock from 'react-scrolllock';//npm install react-scrolllock
import Md_Close from 'react-icons/lib/md/close'//npm instal react-icons
import Md_Menu from 'react-icons/lib/md/menu'

class Side_Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            back_drop_hide: false,
            nav_in: false 
        }
    }

    render_login() {
        
        return <li className="nav-item"><a href=''>Logout</a></li>
    }

    handle_logout() {
        this.props.sign_out()
    }

    open_nav() {
        this.setState({
            nav_in: true,
            back_drop_hide: true
        })
        
    }
    close_nav() {
        debugger
        this.setState({
            back_drop_hide: false,
            nav_in: false
        }) 
    }
    
    backdrop_click() {
        this.setState({
            back_drop_hide: false,
            nav_in: false
        })
        console.log('hello everyone')
    }

    render() {
        return (
            <div className='side-menu-conatianer'>
                {this.state.back_drop_hide?  <ScrollLock/> : ''}
                <div onClick={() => this.open_nav()} className={`ham-icon ${this.state.nav_in ? 'hide':''}`}>
                    <Md_Menu/>
                </div>
                <div onClick={()=> this.backdrop_click()}className={this.state.back_drop_hide ? '':'hide'} id='side-backdrop'>
                </div>
                <div id='side-nav' className={`${this.state.nav_in ? 'side-trans': 'side-trans-out'}`}>
                    <span onClick={ () => {this.close_nav()}}><Md_Close/></span>
                    <ul id="side-menu">
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/" className=""> Home </Link>
                        </li>              
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/my-students" className="">Students</Link>
                        </li>
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/my-courses" className="">Courses</Link>
                        </li>
                        <li className='side-nav-item'>
                            <Link onClick={ ()=> this.close_nav()} to='/my-assignments' className=''>Assignments</Link>
                        </li>
                        <li className='side-nav-item'>
                            <Link onClick={ ()=> this.close_nav()} to='/my-grades' className=''>Grades</Link>
                        </li>
                        <li className='side-nav-item'>
                            <Link onClick={ ()=> this.handle_logout} to='/' className=''>Logout</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, { sign_out, sign_in })(Side_Nav);