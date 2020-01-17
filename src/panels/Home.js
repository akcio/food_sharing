import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import { Panel, PanelHeader, Epic, Tabbar, TabbarItem, View, Button, List, Div, Group, Cell  } from '@vkontakte/vkui';
import Icon24Market from '@vkontakte/icons/dist/24/market';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import FoodSharingAPI from "../services/food_sharing_api";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStory: 'food',
			items_local: []
		};
		this.onStoryChange = this.onStoryChange.bind(this);
		this.getSharedItems = this.getSharedItems.bind(this);
	}

	componentDidMount() {
		this.getSharedItems();
	}

	onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story });
		if (this.state.activeStory === 'food') {
			this.getSharedItems();
		}
	}

	async getSharedItems() {
		let response =  await FoodSharingAPI.getNearby(1, 2);
		this.setState( {items_local: response.data});
	}

	render() {

		// let {
		// 	id,
		// 	items
		// } = this.props;

		return (
			// <Panel id={id}>
			// 	<PanelHeader>{windowName}</PanelHeader>
			// 	<Group>
			// 		<List>
			// 			{
			// 				items.length > 0 && items.map((item, index) => (
			// 					<Cell
			// 						key={index}
			// 						before={
			// 							<img
			// 								style={{
			// 									width: 40,
			// 									height : 40,
			// 									margin : 10
			// 								}}
			// 								src={item.thumb_photo}
			// 							/>
			// 						}
			// 						multiline
			// 						description={item.description}
			// 					>
			// 					{item.title}, {item.price.amount} {item.price.currency.name}
			// 					</Cell>
			// 				))
			// 			}
			// 			{
			// 				items.length === 0 &&
			// 				<Div>
			// 					Хм, но мы не нашли товаров.
			// 				</Div>
			// 			}
			// 		</List>
			// 	</Group>
			// </Panel>

			<Epic activeStory={this.state.activeStory} tabbar={
				<Tabbar>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'food'}
						data-story="food"
						text="Еда"
					><Icon24Market /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'map'}
						data-story="map"
						text="Карта"
					><Icon24Place /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'search'}
						data-story="search"
						text="Поиск"
					><Icon24Search /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'notifications'}
						data-story="notifications"
						text="Уведомлен."
					><Icon24Notification /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'more'}
						data-story="more"
						text="Ещё"
					><Icon24Reorder /> </TabbarItem>
				</Tabbar>
			}>
				<View id="food" activePanel="food">
					<Panel id="food">
						<PanelHeader>Еда</PanelHeader>
						<Group>
							<List>
								{
									this.state.items_local.length > 0 && this.state.items_local.map((item, index) => (
										<Cell
											key={index}
											before={
												<img
													style={{
														width: 40,
														height : 40,
														margin : 10
													}}
													src={item.image_url}
												/>
											}
											description={item.description}
											multiline
										>
											{item.caption}
										</Cell>
									))
								}
								{
									this.state.items_local.length === 0 &&
									<Div>
										Хм, но мы не нашли товаров.
									</Div>
								}
							</List>
						</Group>
					</Panel>
				</View>
				<View id="map" activePanel="map">
					<Panel id="map">
						<PanelHeader>Карта</PanelHeader>
					</Panel>
				</View>
				<View id="search" activePanel="search">
					<Panel id="search">
						<PanelHeader>Поиск</PanelHeader>
					</Panel>
				</View>
				<View id="notifications" activePanel="notifications">
					<Panel id="notifications">
						<PanelHeader>Уведомл.</PanelHeader>
					</Panel>
				</View>
				<View id="more" activePanel="more">
					<Panel id="more">
						<PanelHeader>Прочее</PanelHeader>
					</Panel>
				</View>
			</Epic>
		);
	}
}

// Home.propTypes = {
// 	id: PropTypes.string.isRequired,
// 	go: PropTypes.func.isRequired,
// 	fetchedUser: PropTypes.shape({
// 		photo_200: PropTypes.string,
// 		first_name: PropTypes.string,
// 		last_name: PropTypes.string,
// 		city: PropTypes.shape({
// 			title: PropTypes.string,
// 		}),
// 	}),
// };

export default Home;