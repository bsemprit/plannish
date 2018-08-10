import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Planish from '../../../basics/Planish';
import { Font } from 'expo';
import CaviarDreams from '../../../assets/styling/Caviar-Dreams/CaviarDreams.ttf';
const timer = require('react-native-timer');

class WelcomeScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
		};
		this.navigateTo = this.navigateTo.bind(this);
		
	}
	
	componentDidMount() {
		Font.loadAsync({
			'CaviarDreams': CaviarDreams,
		}).then(() => {
			this.setState({ fontLoaded: true });
		});
		
		timer.setTimeout(this.props.nextScreen.toFrom, this.navigateTo, 5000);
	}
	
	componentWillUnMount() {
		if(timer.timeoutExists(this.props.nextScreen.toFrom)) {
			timer.clearTimeout(this.props.nextScreen.toFrom);
		}
	}
	
	navigateTo() {
		const { navigate } = this.props.navigation;
		navigate(this.props.nextScreen.navigateTo);
	}
	
	render() {
		return this.state.fontLoaded ? (
			<View style={styles.container}>
				<Planish />
			</View>
		) : null;
	}
}

// WelcomeScreen.propTypes = {
// 	navigation: React.Proptypes.func,
// 	nextScreen: React.Proptypes.string,
// };

WelcomeScreen.defaultProps = {
	nextScreen: { navigateTo: 'CalendarMonth', toFrom: 'WelcomeToCalendar'}
	
};


const styles = StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : '#bbb',
		alignItems : 'center',
		justifyContent : 'center',
	},
});


export default WelcomeScreen;