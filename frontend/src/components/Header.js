import React, { useEffect } from 'react';

import { IconContext } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout, tokenValidation } from '../features/auth/authSlice';

const Header = () => {
	const { isAuthenticated } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logOut = () => {
		navigate('/login');
		dispatch(logout());
	};

	return (
		<div>
			<nav className='py-1 navbar navbar-expand-lg navbar-light bg-light'>
				{isAuthenticated || localStorage.getItem('access token') ? (
					<div className='row align-items-center'>
						<a
							className='navbar-brand'
							href='/'>
							<h4 className='header-brand mx-3'>The Mood Tracker</h4>
						</a>
						<nav className=' mx-2 py-1 navbar navbar-expand-lg navbar-light bg-light'>
							<ul className=' navbar-nav justify-content-between align-items-center'>
								<li className='nav-item active mx-1'>
									<a
										className='header-title'
										href='/overview'>
										Overview
									</a>
								</li>
								<li className='nav-item active mx-2'>
									<a
										className='header-title'
										href='/'>
										Mood
									</a>
								</li>
								<li className='nav-item active mx-2'>
									<a
										className='header-title'
										href=''>
										Thought
									</a>
								</li>
								<li className='nav-item active mx-2'>
									<a
										className='header-title'
										href=''>
										Physical
									</a>
								</li>
							</ul>
						</nav>
					</div>
				) : (
					<div className='row align-items-center'>
						<a
							className='navbar-brand'
							href='/'>
							<h4 className='header-brand  mx-3'>The Mood Tracker</h4>
						</a>
					</div>
				)}

				<div
					className='collapse navbar-collapse justify-content-end mx-3'
					id='navbarText'>
					{isAuthenticated || localStorage.getItem('access token') ? (
						<div>
							<ul className='navbar-nav justify-content-between align-items-center'>
								<li className='nav-item active mx-2'>
									<a href='/add-entry'>
										<button className='btn-light'>Add Entry</button>
									</a>
								</li>
								<li className='nav-item mx-2'>
									<a
										className='nav-link active'
										href='/profile'>
										<IconContext.Provider
											value={{
												color: '',
												size: '1.2rem',
												className: 'header-item ',
											}}>
											<div>
												<FaUserCircle />
											</div>
										</IconContext.Provider>
									</a>
								</li>
								<li className='nav-item active mx-2'>
									<a
										onClick={() => logOut()}
										className='header-item btn nav-link text-decoration-none align-self-center'>
										Log out
									</a>
								</li>
							</ul>
						</div>
					) : (
						<ul className='d-flex flex-row navbar-nav mr-auto'>
							<li className='nav-item active'>
								<a
									className='col nav-link mx-2 text-decoration-none'
									href='/login'>
									Log in
								</a>
							</li>
							<li className='col nav-item active'>
								<a
									href='/register'
									className='nav-link mx-2 text-decoration-none'>
									Register
								</a>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Header;
