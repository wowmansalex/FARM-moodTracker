import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const Moodbar = () => {
	const [mood, setMood] = useState('');
	const prevMood = useRef();

	let score = 0;
	const entries = JSON.parse(localStorage.getItem('entries'));

	if (entries !== null) {
		let count = entries.length;
		entries.map(item => {
			if (item.emoji == 'Angry') {
				score -= 3;
			} else if (item.emoji == 'Confused') {
				score -= 2;
			} else if (item.emoji == 'Meh') {
				score += 0;
			} else if (item.emoji == 'Smiling') {
				score += 1;
			} else if (item.emoji == 'Excited') {
				score += 2;
			}
		});

		score = score / count;

		console.log(score);
	}

	const toggleClass = id => {
		const arrow = document.getElementById(id);
		arrow.className = 'active';

		if (mood) {
			const prevArrow = document.createElement(prevMood.current);
			prevArrow.className = 'not-active';
		}
	};

	useEffect(() => {
		prevMood.current = mood;

		console.log(prevMood.current);

		if (score < 0) {
			setMood('angry');
			toggleClass('angry');
		} else if (score > 0 && score < 0.5) {
			setMood('confused');
			toggleClass('confused');
		} else if (score >= 0.5 && score <= 1) {
			setMood('meh');
			toggleClass('meh');
		} else if (score >= 1 && score <= 1.5) {
			setMood('smiling');
			toggleClass('smiling');
		} else if (score > 1.5) {
			setMood('excited');
			toggleClass('excited');
		}
	}, [mood]);

	return (
		<div className='my-2 mx-2'>
			<h4>Moodbar</h4>
			<div className=' d-flex flex-row justify-content-center align-content-center'>
				<div className='moodbar rounded-4 row row-cols-5'>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item angry'>1</div>
						<div
							id='angry'
							className={'not-active'}>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item confused'>1</div>
						<div
							id='confused'
							className='not-active'>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item meh'>1</div>
						<div
							id='meh'
							className='not-active'>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item smiling'>1</div>
						<div
							id='smiling'
							className='not-active'>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item excited'>1</div>
						<div
							id='excited'
							className='not-active'>
							<FontAwesomeIcon icon={faCaretUp} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Moodbar;
