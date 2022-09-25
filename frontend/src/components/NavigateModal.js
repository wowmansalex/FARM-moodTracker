import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NavigateModal({ show, setShow }) {
	const navigate = useNavigate();

	return (
		<>
			<Alert
				show={show}
				variant='success'>
				<Alert.Heading>We need more info to get started</Alert.Heading>
				<p>Go to your profile page to enter the information</p>
				<hr />
				<div className='d-flex justify-content-end'>
					<Button
						onClick={() => setShow(false)}
						variant='outline-danger mx-2'>
						No thanks
					</Button>
					<Button
						onClick={() => navigate('/profile')}
						variant='outline-success'>
						To the profile page
					</Button>
				</div>
			</Alert>

			{!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
		</>
	);
}

export default NavigateModal;
