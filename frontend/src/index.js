import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './features/store';
import { Provider } from 'react-redux';

import './index.css';

import App from './App';

import Header from './components/Header';

import LogInScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewEntryScreen from './components/NewEntryScreen';
import DataScreen from './screens/DataScreen';
import MoodDataScreen from './screens/MoodDataScreen';
import ThoughtDataScreen from './screens/ThoughtDataScreen';
import PhysicalDataScreen from './screens/PhysicalDataScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<div>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route
						path='/'
						element={<App />}></Route>
					<Route
						path='/login'
						element={<LogInScreen />}></Route>
					<Route
						path='/register'
						element={<RegisterScreen />}></Route>
					<Route
						path='/profile'
						element={<ProfileScreen />}></Route>
					<Route
						path='/add-entry'
						element={<NewEntryScreen />}></Route>
					<Route
						path='/overview'
						element={<DataScreen />}></Route>
					<Route
						path='/mood-data'
						element={<MoodDataScreen />}></Route>
					<Route
						path='/thought-data'
						element={<ThoughtDataScreen />}></Route>
					<Route
						path='/physical-data'
						element={<PhysicalDataScreen />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	</Provider>
);
