import React, { Component } from 'react';
import Expo from 'expo'
import { StyleSheet, View } from 'react-native';
import Planish from './app/basics/Planish';
import { Font } from 'expo';
import CaviarDreams from './app/assets/styling/Caviar-Dreams/CaviarDreams.ttf';


class App extends Component {
	
	state = {
		fontLoaded: false,
	};
	
	componentDidMount() {
		Font.loadAsync({
			'CaviarDreams': CaviarDreams,
		}).then(() => {
			this.setState({ fontLoaded: true });
		});
		
	}
	
	render() {
		return this.state.fontLoaded ? (
			<View style={styles.container}>
				<Planish />
			</View>
		) : null;
	}
}


const styles = StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : '#bbb',
		alignItems : 'center',
		justifyContent : 'center',
	},
});


export default Expo.registerRootComponent(App);