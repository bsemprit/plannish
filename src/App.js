import React, { Component } from 'react';
import Expo from 'expo'
import Navigation from './app/navigation/routes';


class App extends Component {
	
	render() {
		return <Navigation />;
	}
}


export default Expo.registerRootComponent(App);