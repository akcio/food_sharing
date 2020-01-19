import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import fetchJsonp from 'fetch-jsonp';
import EpicView from './views/epicView';
import FoodSharingAPI from './services/food_sharing_api'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			authToken : null,
			items : [],
			sharing: []
		};

		this.getItems = this.getItems.bind(this);
	}
	
	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken : e.detail.data.access_token });
					// this.getItems()
					connect.send("VKWebAppGetGeodata", {});
					break;
				case 'VKWebAppGeodataResult': {
					if (e.detail.data.available) {
						this.getSharedItems((e.detail.data.lat, e.detail.data.long))
					}
					else {
						console.log("Geo declined");
					}
						
					break;
				}
				case 'VKWebAppGeodataFailed': {
					console.log(e.detail.data);
					break;
				}
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppGetAuthToken", {"app_id": 7234568, "scope": "photos, friends"});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	getItems() {
		const ownerId = 124527492;
		let api = `https://api.vk.com/method/market.get?v=5.52&access_token=${this.state.authToken}&owner_id=-${ownerId}`
		fetchJsonp(api)
		.then(res => res.json())
		.then(data => this.setState({ items : data.response.items}))
		.catch(e => [])
	}

	async getSharedItems(lat, lon) {
		let items = await FoodSharingAPI.getNearby(lat, lon);
		console.log("----------------");
		console.log(items);
		this.setState({activePanel: "shared_items", sharing: items.data});
		console.log(this.sharing);
	}

	render() {
		return (
			<EpicView id="home" fetchedUser={this.state.fetchedUser} />
		);
	}
}

export default App;

