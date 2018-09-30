import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import moment from 'moment';

import CalendarPicker from 'react-native-calendar-picker';

function createFakeEvents() {
	const startDay = moment().startOf('month');
	const lastDayOfMonth = moment(startDay).endOf('month').subtract(1, "days");
	const fakeEvents = new Map();
	fakeEvents.set(startDay.format('L'), {
			events: [{
				color: "#e547e6",
				title: "MLK celebration",
				timeFrame: [startDay, startDay.endOf("day")],
				reminders: [],
				repeat: {
					repeats: false,
					times: [],
				},
				importance: ""
			}]
		});
	for (i=0; i < lastDayOfMonth.format('DD'); i++) {
		const day = startDay.add(1, 'day');
		const nextDay = {
			events: [{
				color: "#e547e6",
				title: "Reading",
				timeFrame: [day, day.endOf("day")],
				reminders: [],
				repeat: {
					repeats: false,
					times: [],
				},
				importance: ""
			},
				{
					color: "#7b46e6",
					title: "Coding",
					timeFrame: [day, day.endOf("day")],
					reminders: [],
					repeat: {
						repeats: true,
						times: [{
							years: 1,
						}],
					},
					importance: "!!"
				}]
		};
		
		if( i % 2 === 0) {
			nextDay.events.push({
				color: "#56e6e4",
				title: "Do a Sun Salutation",
				timeFrame: [day, day.set({h: 6, m: 30})],
				reminders: [],
				repeat: {
					repeats: true,
					times: [{
						days: 2,
					}],
				},
				importance: "!!"
			})
		}
		fakeEvents.set(day.format('L'), nextDay);
	}
	return fakeEvents;
};


class Calendar extends Component {
	
	constructor(props) {
		super(props);
		let today = moment();
		this.state = {
			today,
			selectedStartDate: null,
			day: today.clone().startOf('month'),
			customDatesStyles: [],
			days: this.props.days || createFakeEvents(),
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
		// console.log("month", monthdate);
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
		// console.log("here", this.state.days);
		for(let i = 0; i <= lastDayOfMonth.format('DD'); i++) {
			const dayEvent = this.state.days.get(startDay.format('L'));
			const eventColors = dayEvent.events.map((event) => {return event.color});
			console.log("eventColors", eventColors);
			let style = {};
			switch (eventColors.length) {
				case 1:
					style.backgroundColor = eventColors[0];
					break;
				case 2:
					style.backgroundColor = eventColors[1];
					break;
					// style.background = `linear-gradient( 90deg, ${eventColors[0]}, ${eventColors[1]} )`; TODO: Find calendar that can support multiple colors or create own
				case 3:
					style.backgroundColor = eventColors[2];
					break;
					// style.background = `linear-gradient( -45deg,${eventColors[0]},${eventColors[0]} 33%,${eventColors[1]} 34%,${eventColors[1]} 66%,${eventColors[2]} 67%)`;
				default:
			}
			newState.customDatesStyles.push({
				date: startDay.clone(),
				// Random colors
				style,
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
		// console.log("this.stae", createFakeEvents());
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