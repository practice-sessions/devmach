import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'



const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }

    const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
       setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, email, password })
       }
    }
    
    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
          <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e => onSubmit(e)} className="form">
        <div className="form-group">
          <input 
           type="text"
           name='name'
           placeholder="Name" 
           value={name} onChange={e => onChange(e)} 
            
           />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          name='email'
          placeholder="Email Address"  value={email}  
          onChange={e => onChange(e)}  
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input 
          type="password"
          name='password'
          placeholder="Password" 
          value={password} 
          onChange={e => onChange(e)}  
          />
        </div>
        <div className="form-group">
          <input 
          type="password" 
          name='password2'
          placeholder="Confirm Password" value={password2} 
          onChange={e => onChange(e)}  
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>  
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, register })(Register)




// const onSubmit = async e => {
//     e.preventDefault()
//     if (password !== password2) {
//         console.log('Passwords do not match')
//     } else {
//        const newUser = {
//            name,
//            email,
//            password
//        }
       
//        try {
//            const config = {
//                headers: {
//                    'Content-Type':'application/json'
//                }
//            }
//            const body = JSON.stringify(newUser)

//            const res = await axios.post('/api/users', body, config)
//            console.log(res)
//        } catch (err) {
//           console.error(err.response.data) 
//        }
//     }    
// }