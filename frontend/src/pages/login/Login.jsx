import React, {useState, useContext} from 'react'
import { LoginForm } from '../../components/LoginForm'
import { RegForm } from '../../components/RegForm'
import { NavbarLogin } from './NavbarLogin'
import { AuthorizationContext } from '../../context/AuthorizationProvider'
import { createUserAPI } from '../../services/usersAPI'
 
export const Login = () => {
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const {login} = useContext(AuthorizationContext)
	const [registerState, setRegisterState] = useState("login")

	async function submitLogin(event) {
            event.preventDefault()
		console.log(email)
		console.log(password)
		
            if (!email || !password) {
                  console.log("Nesuvesti duomenys")
                  return
            }
		try {
			await login(email, password)
		}
		catch (error) {
			setEmail("")
            	setPassword("")
		}
      }

	async function submitRegister() {
			await createUserAPI(name, email, password)
	}

	function clear() {
            setName("")
            setEmail("")
            setPassword("")
      }

  	return (
    
    	<div className='position-relative h-100 v-100 mt-5 overflow-hidden'>
      	<NavbarLogin registerState={registerState} setRegisterState={setRegisterState} clear={clear} />
		{registerState === "login" ? (
				<LoginForm 	email={email}
						password={password}
						setEmail={setEmail} 
						setPassword={setPassword} 
						submitLogin={submitLogin}
				/>
			) : ( <RegForm 	name={name}
						email={email} 
						password={password} 
						setName={setName} 
						setEmail={setEmail} 
						setPassword={setPassword}
						clear={clear} 
						submitRegister={submitRegister}
						setRegisterState={setRegisterState}/>)}
      	
      </div>
  	)
}
