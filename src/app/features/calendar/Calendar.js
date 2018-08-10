import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import moment from 'moment';

import CalendarPicker from 'react-native-calendar-picker';

class Calendar extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedStartDate: null,
		};
		this.onDateChange = this.onDateChange.bind(this);
		let today = moment();
		let day = today.clone().startOf('month');
		this.customDatesStyles = [];
		while(day.add(1, 'day').isSame(today, 'month')) {
			this.customDatesStyles.push({
				date: day.clone(),
				// Random colors
				style: {backgroundColor: '#'+('#00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)},
			});
		}
	}
	
	static navigationOptions = {
		title: 'Calendar',
	};
	
	onDateChange(date) {
		this.setState({
			selectedStartDate: date,
		});
	}
	
	render() {
		const { selectedStartDate } = this.state;
		const startDate = selectedStartDate ? selectedStartDate.toString() : '';
		const today = new Date();
		return (
			<View style={styles.container}>
				<CalendarPicker
					todayTextStyle={{fontWeight: 'bold'}}
					todayBackgroundColor={'transparent'}
					customDatesStyles={this.customDatesStyles}
					minDate={today}
					onDateChange={this.onDateChange}
				/>
				
				<View>
					<Text>SELECTED DATE:{ startDate }</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
});

export default Calendar;