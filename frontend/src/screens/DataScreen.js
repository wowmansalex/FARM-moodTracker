import React, { useState, useEffect } from 'react';

import NavigateModal from '../components/NavigateModal';
import DayToDayGraph from '../components/DayToDayGraph';
import Moodbar from '../components/Moodbar';

import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { getCurrentMood } from '../features/entry/entrySlice';
import MoodvsActivity from '../components/MoodvsActivity';
import MoodvsThought from '../components/MoodvsThought';

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
					<div className='row data-container mx-auto'>
						<div className='col-6'>
							<div className=''>
								<DayToDayGraph className='graph' />
							</div>
							<div className=''>
								<Moodbar />
							</div>
						</div>
						<div className='col-6'>
							<MoodvsActivity />
							<MoodvsThought />
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
