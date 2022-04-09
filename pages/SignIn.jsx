import { useState } from 'react';
// import { useForm } from 'react-hook-form';
import { Link,  useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
	// TODO: Add useForm с подсказками 
	// const {register} = useForm() {
	// }
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const {email, password} = formData
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
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (userCredential.user) {
				// navigate('/')
				console.log(userCredential.user);
			}
		}catch(error) {
			console.log(error);
		}
	}
	return (
		<>
		<div className='pageContainer'>
			<header>
				<p className="pageHeader">Welcome Back!</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input 
					type='email'
					placeholder='Email'
					id='email'
					className='emailInput'
					// ref={register}
					value={email}
					onChange={onChange}
					/>
					<div className='passwordInputDiv'>
						<input 
						id='password'
						placeholder='Password'
						type={showPassword ? 'text' : 'password'}
						className="passwordInput"
						// ref={register}
						value={password}
						onChange={onChange} 
						/>
						<img src={visibilityIcon} 
						alt='show password' 
						className='showPassword'
						onClick={() => setShowPassword(prevState => !prevState) }
						/>
					</div>
					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password
					</Link>
					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#ffff' width='36px' height='34px' />
						</button>
					</div>
				</form>
				{/* Google Auth */}
				<Link className='registerLink' to='/sign-up'>
					Sign Up Instead
					</Link>
			</main>
		</div>
		</>
	)
}

export default SignIn