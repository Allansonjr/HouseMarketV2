import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile }from'firebase/auth'
// import { get } from 'react-hook-form';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase.config.js'



const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const {name, email, password} = formData
	const navigate = useNavigate()
	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async e => {
		e.preventDefault()
		try{
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(
				auth, 
				email, 
				password
				)
			const user = userCredential.user
			updateProfile(auth.currentUser, {
				displayName: name,
			})
			const formDataCopy = {...formData}
			delete formDataCopy.password
			formDataCopy.timestamp = serverTimestamp()
			await setDoc(doc(db, 'users',user.uid), formDataCopy)
			navigate('/')
		} catch (error){
			console.log(error)
		}
	}
	return (
		<>
		<div className='pageContainer'>
			<header>
				<p className="pageHeader">Sign Up</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input 
					type='name'
					placeholder='Name'
					id='name'
					className='nameInput'
					value={name}
					onChange={onChange}
					/>
					<input 
					type='email'
					placeholder='Email'
					id='email'
					className='emailInput'
					value={email}
					onChange={onChange}
					/>
					<div className='passwordInputDiv'>
						<input 
						id='password'
						placeholder='Password'
						type={showPassword ? 'text' : 'password'}
						className="passwordInput"
						value={password}
						onChange={onChange} 
						/>
						<img src={visibilityIcon} 
						alt='show password' 
						className='showPassword'
						onClick={() => setShowPassword(prevState => !prevState) }
						/>
					</div>
					<div className='signInBar'>
						<p className='signInText'>Sign Up</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#ffff' width='36px' height='34px' />
						</button>
					</div>
				</form>
				<Link className='registerLink' to='/sign-in'>
					Sign In Instead
					</Link>
			</main>
		</div>
		</>
	)
}

export default SignIn