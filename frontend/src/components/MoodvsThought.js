import React from 'react';

const MoodvsThought = () => {
	const entries = JSON.parse(localStorage.getItem('entries'));

	let neg_thought = [];
	let pos_thought = [];
	if (entries !== null) {
		entries.map(item => {
			if (item.emoji == 'Angry' || item.emoji == 'Confused') {
				if (item.thought.length > 1) {
					item.thought.map(item => {
						if (!neg_thought.includes(item)) {
							neg_thought.push(item);
						}
					});
				} else {
					if (!neg_thought.includes(item.activity[0])) {
						neg_thought.push(item.activity[0]);
					}
				}
			} else if (item.emoji == 'Smiling' || item.emoji == 'Excited') {
				if (item.thought.length > 1) {
					item.thought.map(item => {
						if (!pos_thought.includes(item)) {
							pos_thought.push(item);
						}
					});
				} else {
					if (!pos_thought.includes(item.activity[0])) {
						pos_thought.push(item.activity[0]);
					}
				}
			}
		});
	}

	return (
		<div className='my-2 mx-2'>
			<h4>Mood vs Thought</h4>
			<div className='row'>
				<div className='col'>
					<div>Negative</div>
					<div>
						{neg_thought.map((thought, index) => {
							return <div key={index}>{thought}</div>;
						})}
					</div>
				</div>

				<div className='col'>
					<div>Positive</div>
					<div>
						{pos_thought.map((thought, index) => {
							return <div key={index}>{thought}</div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoodvsThought;
