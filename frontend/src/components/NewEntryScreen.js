import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createEntry } from '../features/entry/entrySlice';
import EntrySelection from './EntrySelection';

import toast, { Toaster } from 'react-hot-toast';

import {
	emotionOptions,
	activityOptions,
	thoughtOptions,
	physicalOptions,
} from '../constants/selectionOptions';
import { useNavigate } from 'react-router-dom';

const NewEntryScreen = () => {
	const dispatch = useDispatch();
	const message = useSelector(state => state.entries.message);
	const navigate = useNavigate();
	const [emoji, setEmoji] = useState('');
	const [activity, setActivity] = useState('');
	const [thought, setThought] = useState('');
	const [physical, setPhysical] = useState('');

	const [selected, setSelected] = useState(false);

	const toggleSelected = (event, index) => {
		if (index == event.target.index) {
			if (event.target.className == 'entry-image') {
				setSelected(true);
				event.target.className = 'entry-image-selected';
				if (event.target.name == 'emoji') {
					setEmoji(event.target.id);
				}
				if (event.target.name == 'activity') {
					if (!activity.includes(event.target.id)) {
						setActivity(prev => [...prev, event.target.id]);
					}
				} else if (event.target.name == 'thought') {
					if (!thought.includes(event.target.id)) {
						setThought(prev => [...prev, event.target.id]);
					}
				} else if (event.target.name == 'physical') {
					if (!physical.includes(event.target.id)) {
						setPhysical(prev => [...prev, event.target.id]);
					}
				}
			} else {
				event.target.className = 'entry-image';
				setSelected(false);
				if (event.target.name === 'activity') {
					activity.map(i => {
						if (i === event.target.id) {
							activity.splice(event.target.index, 1);
						}
					});
				} else if (event.target.name === 'thought') {
					thought.map(item => {
						if (item === event.target.id) {
							thought.splice(item, 1);
						}
					});
				} else if (event.target.name === 'physical') {
					physical.map(item => {
						if (item === event.target.id) {
							physical.splice(item, 1);
						}
					});
				}
			}
		}
	};

	const handleSelected = event => {
		console.log(emoji, activity, thought, physical);
	};

	const handleSubmit = event => {
		event.preventDefault();

		let form = {};
		form['emoji'] = emoji;
		form['activity'] = activity;
		form['thought'] = thought;
		form['physical'] = physical;
		console.log(form);
		dispatch(createEntry(form));
		navigate('/');
	};

	useEffect(() => {
		if (message !== null) {
			toast.success(message);
		}
	}, []);

	return (
		<div className='d-flex flex-column entry-container mx-auto my-3'>
			<Toaster />
			<form
				action=''
				onSubmit={handleSubmit}>
				<div className=''>
					<div className='mx-auto'>
						<p>How are you feeling?</p>
					</div>
					<div className='d-flex flex-row justify-content-around'>
						{emotionOptions.map((physical, index) => {
							return (
								<EntrySelection
									clss={'entry-image'}
									handleSelected={handleSelected}
									toggleSelected={toggleSelected}
									index={index}
									key={index}
									name={physical.name}
									id={physical.id}
									url={physical.url}
								/>
							);
						})}
					</div>
					<div className='mx-auto my-3'>
						<p>What did you do?</p>
					</div>
					<div className='d-flex flew-row justify-content-around'>
						{activityOptions.map((activity, index) => {
							return (
								<EntrySelection
									clss={'entry-image'}
									handleSelected={handleSelected}
									toggleSelected={toggleSelected}
									index={index}
									key={index}
									name={activity.name}
									id={activity.id}
									url={activity.url}
								/>
							);
						})}
					</div>
					<div className='mx-auto my-3'>
						<p>What's on your mind?</p>
					</div>
					<div className='d-flex flew-row justify-content-around'>
						{thoughtOptions.map((thought, index) => {
							return (
								<EntrySelection
									clss={'entry-image'}
									handleSelected={handleSelected}
									toggleSelected={toggleSelected}
									index={index}
									key={index}
									name={thought.name}
									id={thought.id}
									url={thought.url}
								/>
							);
						})}
					</div>
					<div className='mx-auto my-3'>
						<p>How you feel physically?</p>
					</div>
					<div className='d-flex flew-row justify-content-around'>
						{physicalOptions.map((physical, index) => {
							return (
								<EntrySelection
									clss={'entry-image'}
									handleSelected={handleSelected}
									toggleSelected={toggleSelected}
									index={index}
									key={index}
									name={physical.name}
									id={physical.id}
									url={physical.url}
								/>
							);
						})}
					</div>
				</div>
				<div>
					<button className='my-2 w-100 btn-light'>Add new entry</button>
				</div>
			</form>
		</div>
	);
};

export default NewEntryScreen;
