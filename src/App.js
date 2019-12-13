import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import fetchJsonp from 'fetch-jsonp';
import Home from './panels/Home';
import FoodSharingAPI from './services/food_sharing_api'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			authToken : null,
			items : []
		};

		this.getItems = this.getItems.bind(this)
	}
	
	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken : e.detail.data.access_token });
					this.getItems()
					break;
				case 'VKWebAppGeodataResult':
					console.log(e.detail.data);
					if (e.detail.data.available)
					    console.log("Request start")
						console.log(FoodSharingAPI.getNearby(e.detail.data.lat, e.detail.data.long))
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send("VKWebAppGetGeodata", {});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppGetAuthToken", {"app_id": 7234568, "scope": "market, photos, friends"});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	getItems() {
		const ownerId = 124527492
		let api = `https://api.vk.com/method/market.get?v=5.52&access_token=${this.state.authToken}&owner_id=-${ownerId}`
		fetchJsonp(api)
		.then(res => res.json())
		.then(data => this.setState({ items : data.response.items}))
		.catch(e => [])
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" items={this.state.items} fetchedUser={this.state.fetchedUser} go={this.go} />
			</View>
		);
	}
}

export default App;

