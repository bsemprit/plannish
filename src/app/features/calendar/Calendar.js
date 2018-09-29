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
		let today = moment();
		this.state = {
			today,
			selectedStartDate: null,
			day: today.clone().startOf('month'),
			customDatesStyles: [],
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onMonthChange = this.onMonthChange.bind(this);
		this.setCustomDateColors();
	}
	
	static navigationOptions = {
		title: 'Calendar',
	};
	
	onDateChange(date) {
		console.log(date);
		this.setState({
			selectedStartDate: date,
		});
	}
	
	onMonthChange(date) {
		console.log("month", date);
		this.setState({
			day: date.clone().startOf('month'),
		});
	}
	
	setCustomDateColors() {
		const newState = this.state;
		const day = moment(newState.day);
		const lastDayOfMonth = moment(day).endOf('month').subtract(1, "days");
		// console.log("date", this.state.day, day, Object.keys(lastDayOfMonth));
		let startDay = day.clone();
		for(let i = 0; i <= lastDayOfMonth.format('DD'); i++) {
			newState.customDatesStyles.push({
				date: startDay.clone(),
				// Random colors
				style: {backgroundColor: '#1e9cc3'},
				textStyle: {color: 'white'}, // sets the font color
				containerStyle: [],
			});
			startDay.add(1, 'day');
		}
	}
	
	render() {
		const { selectedStartDate, day } = this.state;
		const startDate = selectedStartDate ? selectedStartDate.toString() : day.toString();
		const today = new Date();
		const selectedDay = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
		const selectedDayOfWeek = moment(startDate).format("dddd");
		console.log("this.stae", this.state);
		return (
			<View style={styles.container}>
				<CalendarPicker
					todayTextStyle={{fontWeight: 'bold'}}
					todayBackgroundColor={'transparent'}
					customDatesStyles={this.state.customDatesStyles}
					minDay={1}
					onDateChange={this.onDateChange}
					onMonthChange={this.onMonthChange}
				/>
				
				<View>
					<Text>{ startDate }</Text>
					<Text>{ selectedDayOfWeek }</Text>
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