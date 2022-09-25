import React from 'react';

const EntrySelection = ({
	name,
	id,
	url,
	clss,
	index,
	toggleSelected,
	handleSelected,
}) => {
	return (
		<div className='d-flex flex-column justify-items-center mx-2'>
			<div
				name={name}
				id={id}
				onClick={handleSelected}
				className='entry-icon mx-auto'>
				<img
					index={index}
					onClick={toggleSelected}
					name={name}
					id={id}
					className={clss}
					src={url}
					alt=''
				/>
			</div>
			<div className='mx-auto'>
				<p className='my-1 entry-title'>{id}</p>
			</div>
		</div>
	);
};

export default EntrySelection;
