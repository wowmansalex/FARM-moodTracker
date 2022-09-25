import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
	getUserDetails,
	uploadProfilePicture,
	updateUserDetails,
} from '../features/auth/authSlice';

import toast, { Toaster } from 'react-hot-toast';

const ProfileScreen = () => {
	const [fileSelected, setFileSelected] = useState();
	const message = useSelector(state => state.auth.message);
	const errorMessage = useSelector(state => state.auth.errorMessage);

	const dispatch = useDispatch();

	const fileHandler = event => {
		setFileSelected(event.target.files[0]);

		console.log(event.target.files[0]);
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log(fileSelected);
		dispatch(uploadProfilePicture(fileSelected));
	};

	let userDetails = '';

	if (localStorage.getItem('user_details') !== null) {
		userDetails = JSON.parse(localStorage.getItem('user_details'));
	}

	let newDob = '';

	if (userDetails.dob) {
		newDob = userDetails.dob.substring(0, 10);
	}

	const [formInput, setFormInput] = useState({
		name: userDetails.name || '',
		dob: userDetails.newDob || '',
		gender: userDetails.gender || '',
	});

	const handleChange = event => {
		setFormInput({ ...formInput, [event.target.name]: event.target.value });
		console.log(formInput);
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		formInput.dob = new Date(formInput.dob).toISOString();
		dispatch(updateUserDetails(formInput));
	};

	useEffect(() => {
		if (message) {
			toast(message);
		} else if (errorMessage) {
			toast.error(errorMessage);
		}
	}, [message, errorMessage]);

	return (
		<div className=' my-3 mx-auto container-profile'>
			<Toaster />
			<h3 className='title'>Your Profile</h3>
			<div className='d-flex flex-column '>
				{userDetails.profile_picture == null ? (
					<img
						className='profile-picture mx-auto my-3'
						src='https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
					/>
				) : (
					<img
						className='profile-picture mx-auto my-3'
						src={userDetails.profile_picture}
						alt=''
					/>
				)}
				<form
					action=''
					className='d-flex flex-row upload-btn justify-content-center align-items-center'>
					<input
						onChange={fileHandler}
						name='file'
						type='file'
						accept='.jpeg, .png, .jpg'
					/>
					<button
						type='submit'
						onClick={handleSubmit}
						className='btn-light-profile'>
						Upload
					</button>
				</form>
			</div>
			<div className='my-3'>
				<form
					action=''
					onSubmit={handleFormSubmit}>
					<div className='row'>
						<label
							htmlFor=''
							className='col-3 form-label'>
							Name
						</label>
						<input
							onChange={handleChange}
							name='name'
							value={formInput.name || userDetails.name}
							className='col form-control'
							type='text'
						/>
					</div>
					<div className='row my-4'>
						<label
							htmlFor=''
							className='col-3 form-label'>
							Email
						</label>
						<input
							onChange={handleChange}
							name='email'
							value={formInput.email || userDetails.email}
							className='col form-control'
							type='text'
						/>
					</div>
					<div className='row my-4'>
						<label
							htmlFor=''
							className='col-3 form-label'>
							Date of Birth
						</label>
						<input
							onChange={handleChange}
							name='dob'
							value={formInput.dob || userDetails.dob}
							className='col form-control'
							type='date'
						/>
					</div>
					<div className='row my-4'>
						<label
							htmlFor=''
							className='col-3 form-label'>
							Gender
						</label>
						<input
							onChange={handleChange}
							name='gender'
							value={formInput.gender || userDetails.gender}
							className='col form-control'
							type='text'
						/>
					</div>
					<div className='row'>
						<button className='col btn-light '>Save</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileScreen;
