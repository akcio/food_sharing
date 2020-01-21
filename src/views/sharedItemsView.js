import React from 'react';
import {
    Panel,
    PanelHeader,
    Spinner,
    View,
    TabsItem,
    Group,
    Tabs,
    PullToRefresh,
    List,
    Cell,
    Div, PanelHeaderButton, IOS, InfoRow, CellButton, FormLayout, Button, platform, Link
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

class SharedItemsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'share',
            items: [],
            fetching: true,
            activePanel: 'main',
            selectedItem: undefined
        };

        this.onRefresh = () => {
            this.setState({fetching: true});
            this.updateSharedItems();
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    async updateSharedItems() {
        let response = await FoodSharingAPI.getItemsByUserId(1);
        if (response.data) {
            this.setState({
                items: response.data,
                fetching: false
            });
        } else {
            console.error("No response error:", response);
            this.setState({
                items: [],
                fetching: false
            });
        }
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="main">
                    <PanelHeader>Моя еда</PanelHeader>
                    <Group>
                        <Tabs>
                            <TabsItem
                                onClick={() => this.setState({activeTab: 'share'})}
                                selected={this.state.activeTab === 'share'}
                            >Поделился</TabsItem>
                            <TabsItem
                                onClick={() => this.setState({activeTab: 'ask'})}
                                selected={this.state.activeTab === 'ask'}
                            >Попросил</TabsItem>
                        </Tabs>
                    </Group>
                    {this.state.activeTab === 'share' &&
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                        <Group>
                            <List>
                                {
                                    this.state.items.length > 0 && this.state.items.map((item, index) => (
                                        <Cell
                                            onClick={() => this.setState({
                                                activePanel: 'detail',
                                                selectedItem: item
                                            })}
                                            key={index}
                                            before={
                                                <img alt={""}
                                                     style={{
                                                         width: 40,
                                                         height: 40,
                                                         margin: 10
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
                            </List>
                        </Group>
                        {
                            this.state.items.length === 0 && this.state.fetching === true &&
                            <Spinner size="large" style={{marginTop: 20}}/>
                        }
                        {
                            this.state.items.length === 0 && this.state.fetching === false &&
                            <Div>
                                Вы еще ни с кем не поделились едой. Начните <Link>прямо сейчас</Link>!
                            </Div>
                        }
                    </PullToRefresh>
                    }
                    {this.state.activeTab === 'ask' &&
                    <Spinner size="large" style={{marginTop: 20}}/>
                    }
                </Panel>
                <Panel id="detail">
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({activePanel: 'main'})}>{osname === IOS ?
                            <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                        after=""
                    >{this.state.selectedItem !== undefined ? this.state.selectedItem.caption : "Ошибка"}</PanelHeader>
                    {this.state.selectedItem !== undefined && this.state.selectedItem.image_url.length > 0 &&
                    <img alt={""} className={"ProductImage"}
                         src={this.state.selectedItem ? this.state.selectedItem.image_url : ""}/>
                    }
                    {this.state.selectedItem !== undefined &&
                    <Group>
                        <List>
                            <Cell>
                                <InfoRow header="Продукт">
                                    {this.state.selectedItem.caption}
                                </InfoRow>
                            </Cell>
                            {this.state.selectedItem.description.length > 0 &&
                            <Cell>
                                <InfoRow header="Описание">
                                    {this.state.selectedItem.description}
                                </InfoRow>
                            </Cell>
                            }
                            <Cell>
                                <InfoRow header="Категория">
                                    Категория продукта
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow header="Владелец">
                                    Имя Ф.
                                </InfoRow>
                            </Cell>
                            <CellButton>Показать на карте</CellButton>
                            <FormLayout>
                                <Button size="xl">Написать владельцу</Button>
                            </FormLayout>
                        </List>
                    </Group>
                    }
                    {this.state.selectedItem === undefined &&
                    <Spinner size="large" style={{marginTop: 20}}/>
                    }
                </Panel>
            </View>
        );
    }
}

export default SharedItemsView;