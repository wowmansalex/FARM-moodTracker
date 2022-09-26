import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const Moodbar = () => {
	let count = 0;
	if (localStorage.getItem('entries') !== null) {
		const entries = JSON.parse(localStorage.getItem('entries'));

		entries.map(item => {
			if (item.emoji == 'Angry') {
				count -= -3;
			} else if (item.emoji == 'Confused') {
				count -= -2;
			} else if (item.emoji == 'Meh') {
				count += 0;
			} else if (item.emoji == 'Smiling') {
				count += 1;
			} else if (item.emoji == 'Excited') {
				count += 2;
			}
		});

		console.log(count);
	}

	useEffect(() => {
		if (count < -2) {
			const setArrow = document.getElementById('angry');
			setArrow.className = 'active';
		} else if (count < -1 && count > -2) {
			const setArrow = document.getElementById('confused');
			setArrow.className = 'active';
		} else if (count < 0 && count >= -1) {
			const setArrow = document.getElementById('meh');
			setArrow.className = 'active';
		} else if (count >= 0 && count <= 2) {
			const setArrow = document.getElementById('smiling');
			setArrow.className = 'active';
		} else if (count > 3) {
			const setArrow = document.getElementById('excited');
			setArrow.className = 'active';
		}
	}, [count]);

	return (
		<div className='my-2 mx-2'>
			<h4>Moodbar</h4>
			<div className=' d-flex flex-row justify-content-center align-content-center'>
				<div className='moodbar rounded-4 row row-cols-5'>
					<div className='col mx-0 px-0'>
						<div className='moodbar-item angry'>1</div>
						<div
							id='angry'
							className='not-active'>
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
