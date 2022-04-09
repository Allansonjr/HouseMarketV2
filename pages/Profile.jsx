import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
const Profile = () => {
	const [user, setUser] = useState(null)
	const auth = getAuth()
	useEffect(() => {
		setUser(auth.currentUser)
	}, [auth.currentUser] )
		console.log(user)
	return (
		user ? <h1>{user.displayName}</h1> : 'Not Logged in'
	)
}

export default Profile