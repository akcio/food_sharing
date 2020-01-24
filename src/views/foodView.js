import React from 'react';
import {
    Cell,
    Div,
    Group,
    List,
    Panel,
    PanelHeader,
    Search,
    View,
    Button,
    FormLayout,
    CellButton,
    PullToRefresh,
    Spinner,
    PanelHeaderButton,
    IOS,
    platform,
    InfoRow, Link
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import connect from '@vkontakte/vk-connect';

const osname = platform();

class FoodView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            fetching: true,
            activePanel: 'main',
            selectedItem: null,
            fetchedUserId: null,
            fetchedUserInfo: null,
        };

        this.onRefresh = () => {
            this.setState({fetching: true});
            this.updateSharedItems();
        };
        this.cellOnClickFunction = this.cellOnClickFunction.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    getShortName(name) {
        if (name.length > 0)
            return name[0] + ".";
        else
            return "";
    }

    async cellOnClickFunction(item) {
        this.setState({
            activePanel: 'detail',
            selectedItem: item,
            fetchedUserInfo: null
        });
        let res = await connect.sendPromise('VKWebAppCallAPIMethod', {
            "method": "users.get",
            "request_id": "userInfo_"+item.user_id.toString().replace(' ', ""),
            "params": {
                "user_ids": item.user_id,
                "v":"5.103",
                "access_token":this.props.authToken
            }
        }).then(function (response) {
            return response.response[0];
        }).catch(function(reason) {
            console.error(reason);
        });
        this.setState({
            fetchedUserInfo: res
        });
    }

    async updateSharedItems() {
        let response = await FoodSharingAPI.getNearby(1, 2);
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

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="main" separator={false}>
                    <PanelHeader>Каталог</PanelHeader>
                    <Search/>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                        <Group>
                            <List>
                                {
                                    this.state.items.length > 0 && this.state.items.map((item, index) => (
                                        <Cell
                                            onClick={() => this.cellOnClickFunction(item)}
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
                                {
                                    this.state.items.length === 0 && this.state.fetching === true &&
                                    <Spinner size="large" style={{marginTop: 20}}/>
                                }
                                {
                                    this.state.items.length === 0 && this.state.fetching === false &&
                                    <Div>
                                        Никто еще не поделился едой. Станьте <Link>первым</Link>!
                                    </Div>
                                }
                            </List>
                        </Group>
                    </PullToRefresh>
                </Panel>
                <Panel id="detail" separator={false}>
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({activePanel: 'main'})}>{osname === IOS ?
                            <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                        noShadow="true"
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
                                    {this.state.fetchedUserInfo != null &&
                                        <span>{this.state.fetchedUserInfo.first_name} {this.getShortName(this.state.fetchedUserInfo.last_name)}</span>
                                    }
                                    {this.state.fetchedUserInfo == null &&
                                        <Spinner size="small" style={{marginTop: 20}}/>
                                    }
                                </InfoRow>
                            </Cell>
                            <CellButton>Показать на карте</CellButton>
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

export default FoodView;