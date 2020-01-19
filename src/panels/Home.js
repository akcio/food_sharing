import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Home.css';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, PanelHeader, Epic, Tabbar, TabbarItem, View, List, Div, Group, Cell, FixedLayout, Search, CellButton,
	Header, InfoRow, Footer, Tabs, TabsItem, Input, FormLayoutGroup, FormLayout, Textarea, Select, Checkbox, Link,
	File, Button } from '@vkontakte/vkui';
import Icon24Market from '@vkontakte/icons/dist/24/market';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
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
						text="Каталог"
					><Icon24Market /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'map'}
						data-story="map"
						text="Карта"
					><Icon24Place /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'share'}
						data-story="share"
						text="Поделиться"
					><Icon24Add /></TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'search'}
						data-story="search"
						text="Моя еда"
					><Icon24Home /></TabbarItem>
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
						<PanelHeader>Каталог</PanelHeader>
							<Search />
						<Group>
							<List>
								{
									this.state.items_local.length > 0 && this.state.items_local.map((item, index) => (
										<Cell
											key={index}
											before={
												<img alt={""}
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
										Есть увы нечего, заходи позже!
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
				<View id="share" activePanel="share">
					<Panel id="share">
						<PanelHeader>Поделиться</PanelHeader>

						<FormLayout>
							<Select top="Категория" placeholder="Выберите категорию">
								<option value="Food">Еда</option>
								<option value="Drink">Напитки</option>
							</Select>
							<Input top="Название продукта" bottom="Не пишите в названии ключевые слова наподобие
							&quot;Отдам&quot; или &quot;Обменяю&quot;, вместо этого укажите точное название, чтобы
							остальным было проще найти ваше предложение."/>
							<Textarea top="Описание"  bottom="Опишите ваш продукт как можно подробнее."/>
							<File before={<Icon24Camera />} controlSize="xl">
								Загрузить фото
							</File>
							<Checkbox>Я принимаю условия <Link>лицензионного соглашения</Link></Checkbox>
							<Button size="xl">Поделиться</Button>
						</FormLayout>
					</Panel>
				</View>
				<View id="search" activePanel="search">
					<Panel id="search">
						<PanelHeader>Моя еда</PanelHeader>
						<Group title="Вкладки-кнопки">
							<Tabs type="buttons">
								<TabsItem
									onClick={() => this.setState({ activeTab2: 'all' })}
									selected={this.state.activeTab2 === 'all'}
								>
									Поделился
								</TabsItem>
								<TabsItem
									onClick={() => this.setState({ activeTab2: 'user' })}
									selected={this.state.activeTab2 === 'user'}
								>
									Отдал
								</TabsItem>
							</Tabs>
						</Group>
					</Panel>
				</View>
				<View id="more" activePanel="more">
					<Panel id="more">
						<PanelHeader>Дополнительно</PanelHeader>
						<Group header={<Header>Аккаунт</Header>}>
							<List>
								<Cell>
									<InfoRow header="Ваше имя">
										Имя Фамилия
									</InfoRow>
										</Cell>
										<Cell>
									<InfoRow header="Рейтинг">
										5.0
									</InfoRow>
								</Cell>
							</List>
						</Group>
						<Group header={<Header>Настройки</Header>}>
							<CellButton>Приватность</CellButton>
							<CellButton>Уведомления</CellButton>
						</Group>
						<Group header={<Header>О приложении</Header>}>
							<CellButton>Лицензионное соглашение</CellButton>
							<CellButton>Правила</CellButton>
						</Group>
						<Footer>Версия приложения 0.0.0</Footer>
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