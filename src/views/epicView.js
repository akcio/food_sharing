import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon24Market from '@vkontakte/icons/dist/24/market';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import FoodSharingAPI from "../services/food_sharing_api";
import ShareView from "./shareView";
import MapView from "./mapView";
import SharedItemsView from "./sharedItemsView";
import MoreView from "./moreView";
import FoodView from "./foodView";

class EpicView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStory: 'foodView',
		};
		this.onStoryChange = this.onStoryChange.bind(this);
	}

	onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story });
	}

	render() {
		return (
			<Epic activeStory={this.state.activeStory} tabbar={
				<Tabbar>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'foodView'}
						data-story="foodView"
						text="Каталог"
					><Icon24Market /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'mapView'}
						data-story="mapView"
						text="Карта"
					><Icon24Place /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'shareView'}
						data-story="shareView"
						text="Поделиться"
					><Icon24Add /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'sharedItemsView'}
						data-story="sharedItemsView"
						text="Моя еда"
					><Icon24Home /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'moreView'}
						data-story="moreView"
						text="Ещё"
					><Icon24Reorder /> </TabbarItem>
				</Tabbar>
			}>
				<FoodView id="foodView" activePanel="foodView" />
				<MapView id="mapView" activePanel="mapView" />
				<ShareView id="shareView" activePanel="shareView" />
				<SharedItemsView id="sharedItemsView" activePanel="sharedItemsView" />
				<MoreView id="moreView" activePanel="moreView" />
			</Epic>
		);
	}
}

export default EpicView;