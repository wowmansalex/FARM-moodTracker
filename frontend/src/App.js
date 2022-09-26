import React, { useEffect } from 'react';

import './App.css';

import DataScreen from './screens/DataScreen';

import LoginScreen from './screens/LogInScreen';

import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails, logout } from './features/auth/authSlice';
import { fetchEntries } from './features/entry/entrySlice';

import { validateToken } from './constants/validateToken';
import { useNavigate } from 'react-router-dom';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector(state => state.auth);

	const logOut = () => {
		navigate('/login');
		dispatch(logout());
	};

	useEffect(() => {
		const AuthVerify = () => {
			if (localStorage.getItem('access token') !== null) {
				const token = JSON.stringify(localStorage.getItem('access token'));
				if (token == null) {
					console.log('No token found');
					navigate('/login');
				} else if (token) {
					const checkIfValid = validateToken(token);

					if (checkIfValid) {
						console.log('Token still valid');
					} else {
						logOut();
					}
				}
			}
		};

		AuthVerify();

		dispatch(getUserDetails());
		dispatch(fetchEntries());
	}, []);

	return (
		<div className='general'>
			{isAuthenticated || localStorage.getItem('access token') ? (
				<div className='d-flex flex-column container'>
					<DataScreen className='' />
				</div>
			) : (
				<LoginScreen />
			)}
		</div>
	);
}

export default App;
