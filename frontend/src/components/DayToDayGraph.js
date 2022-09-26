import React from 'react';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const DayToDayGraph = () => {
	let timestamp = [];
	let data = [];
	if (localStorage.getItem('entries') !== null) {
		const entries = JSON.parse(localStorage.getItem('entries'));

		entries.map(item => {
			timestamp.push(
				new Date(item['date_created']).toLocaleDateString('en', {
					month: 'numeric',
					day: 'numeric',
				})
			);
		});

		entries.map(item => {
			if (item['emoji'] == 'Angry') {
				data.push(0);
			} else if (item['emoji'] == 'Confused') {
				data.push(1);
			} else if (item['emoji'] == 'Neutral') {
				data.push(2);
			} else if (item['emoji'] == 'Smiling') {
				data.push(3);
			} else if (item['emoji'] == 'Excited') {
				data.push(4);
			}
		});

		console.log(timestamp, data);
	}

	let chartData = {
		labels: timestamp,
		datasets: [
			{
				label: 'Mood by day',
				data: data,
				// you can set indiviual colors for each bar
				backgroundColor: ['rgb(47, 223, 131)'],
				borderColor: ['rgb(47, 223, 131)'],
				borderWidth: 1,
			},
		],
		options: {
			plugins: {},
			scales: {
				y: {
					min: 0,
					max: 5,
					ticks: {
						callback: function (value, index, ticks) {
							if (value == 0) {
								return 'angry';
							} else if (value == 1) {
								return 'confused';
							} else if (value == 2) {
								return 'meh';
							} else if (value == 3) {
								return 'smiling';
							} else if (value == 4) {
								return 'excited';
							}
						},
					},
				},
			},
		},
	};

	return (
		<div className='my-2 mx-2'>
			<h4>Mood flow in time</h4>
			<div>
				<Chart
					type='line'
					data={chartData}
					options={chartData.options}
				/>
			</div>
		</div>
	);
};

export default DayToDayGraph;
