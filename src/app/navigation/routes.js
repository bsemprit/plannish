import {
	createStackNavigator,
} from 'react-navigation';

import WelcomeScreen from '../features/home/screens/Welcome';
import CalendarMonth from '../features/calendar/Calendar';

const Navigation = createStackNavigator(
	{
		Welcome: { screen: WelcomeScreen },
		CalendarMonth: { screen: CalendarMonth },
	},
	{
		initialRouteName: 'CalendarMonth',
	}
);

export default Navigation;