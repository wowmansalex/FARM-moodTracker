import React, { useState, useEffect } from 'react';

import NavigateModal from '../components/NavigateModal';
import NewEntryScreen from '../components/NewEntryScreen';

import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { getCurrentMood } from '../features/entry/entrySlice';

const EntryScreen = () => {
	const [show, setShow] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errorMessage = useSelector(state => state.auth.errorMessage);
	const message = useSelector(state => state.auth.message);

	useEffect(() => {
		dispatch(getCurrentMood());

		if (message !== null) {
			toast.success(message);
		}
	}, []);

	const currentMood = useSelector(state => state.entries.currentMood);

	return (
		<div className='container my-3'>
			{errorMessage === null ? (
				<div>
					<Toaster />
					<div className='container'>
						<div className='d-flex flex-column '>
							<div className='mx-auto'></div>
							<i className='icon icon-brain' />
							<div className='mx-auto'></div>
						</div>
						<div className='d-flex flex-column '>
							<div className='mx-auto my-4'></div>
						</div>
					</div>
				</div>
			) : (
				<NavigateModal
					show={show}
					setShow={setShow}
				/>
			)}
		</div>
	);
};

export default EntryScreen;
