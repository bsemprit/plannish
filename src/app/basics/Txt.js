import React, { Component } from 'react';
import { Text } from 'react-native';

class Txt extends Component {
	
	render() {
		return (
			<Text style={{ fontSize : this.props.fontSize, fontFamily : this.props.fontFamily }}>
				{ this.props.children }
			</Text>
		);
	}
}

Txt.defaultProps = {
	fontSize : 20,
	fontFamily : 'CaviarDreams',
};

export default Txt;