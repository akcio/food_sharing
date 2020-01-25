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
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import vkQr from '@vkontakte/vk-qr';

const osname = platform();

class SharedItemsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'share',
            items: [],
            fetching: true,
            activePanel: 'main',
            selectedItem: null
        };

        this.onRefresh = () => {
            this.setState({fetching: true});
            this.updateSharedItems();
        };

        this.onDelete = () => {
            this.setState({fetching: true});
            this.deleteItem();
            this.updateSharedItems();
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    async updateSharedItems() {
        if (this.props.fetchedUser == null) {
            console.error("No fetched user!");
            return;
        }
        let response = await FoodSharingAPI.getItemsByUserId(this.props.fetchedUser.id);
        // let response = await FoodSharingAPI.getNearby(1, 2);
        if (response.data != null) {
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

    async deleteItem() {
        console.log("delete");
    }

    getShortName(name) {
        if (name.length > 0)
            return name[0] + ".";
        else
            return "";
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="main" separator={false}>
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
                                            asideContent={<Icon24Dismiss style={{color: "#ff5147"}} onClick={this.onDelete}/>}
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
                <Panel id="detail" separator={false}>
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({activePanel: 'main'})}>{osname === IOS ?
                            <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                    >{this.state.selectedItem != null ? this.state.selectedItem.caption : "Ошибка"}</PanelHeader>
                    {this.state.selectedItem != null && this.state.selectedItem.image_url.length > 0 &&
                    <img alt={""} className={"ProductImage"}
                         src={this.state.selectedItem ? this.state.selectedItem.image_url : ""}/>
                    }
                    {this.state.selectedItem != null &&
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
                                    {this.state.selectedItem.category.name}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow header="Владелец">
                                    {this.props.fetchedUser != null &&
                                        <>{this.props.fetchedUser.first_name} {this.getShortName(this.props.fetchedUser.last_name)}</>
                                    }
                                    {this.props.fetchedUser == null &&
                                        <Spinner size="small" style={{marginTop: 20}}/>
                                    }
                                </InfoRow>
                            </Cell>
                            <CellButton>Показать на карте</CellButton>
                                {vkQr.createQR(JSON.stringify({'id':this.state.selectedItem.id, }), {
                                      qrSize: 256,
                                      isShowLogo: true
                                    })
                                }
                            <FormLayout>
                                <Button size="xl">Написать владельцу</Button>
                            </FormLayout>
                        </List>
                    </Group>
                    }
                    {this.state.selectedItem == null &&
                        <Spinner size="large" style={{marginTop: 20}}/>
                    }
                </Panel>
            </View>
        );
    }
}

export default SharedItemsView;