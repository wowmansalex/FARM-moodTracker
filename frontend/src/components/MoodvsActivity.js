import React from 'react';

const MoodvsActivity = () => {
	const entries = JSON.parse(localStorage.getItem('entries'));

	let neg_act = [];
	let pos_act = [];
	if (entries !== null) {
		entries.map(item => {
			if (item.emoji == 'Angry' || item.emoji == 'Confused') {
				if (item.activity.length > 1) {
					item.activity.map(item => {
						if (!neg_act.includes(item)) {
							neg_act.push(item);
						}
					});
				} else {
					if (!neg_act.includes(item.activity[0])) {
						neg_act.push(item.activity[0]);
					}
				}
			} else if (item.emoji == 'Smiling' || item.emoji == 'Excited') {
				if (item.activity.length > 1) {
					item.activity.map(item => {
						if (!pos_act.includes(item)) {
							pos_act.push(item);
						}
					});
				} else {
					if (!pos_act.includes(item.activity[0])) {
						pos_act.push(item.activity[0]);
					}
				}
			}
		});
	}

	return (
		<div className='my-2 mx-2'>
			<h4>Mood vs Activity</h4>
			<div className='row'>
				<div className='col'>
					<div>Negative</div>
					<div>
						{neg_act.map((activity, index) => {
							return <div key={index}>{activity}</div>;
						})}
					</div>
				</div>

				<div className='col'>
					<div>Positive</div>
					<div>
						{pos_act.map((activity, index) => {
							return <div key={index}>{activity}</div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoodvsActivity;
