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
    InfoRow
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

class FoodView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            fetching: true,
            activePanel: 'main',
            selectedItem: undefined
        };

        this.onRefresh = () => {
            this.setState({ fetching: true });
            this.updateSharedItems();
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    async updateSharedItems() {
        let response = await FoodSharingAPI.getNearby(1, 2);
        this.setState( {
            items: response.data,
            fetching: false
        });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="main" separator={false} >
                    <PanelHeader>Каталог</PanelHeader>
                    <Search />
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
                                this.state.items.length === 0  && this.state.fetching === true &&
                                <Spinner size="large" style={{ marginTop: 20 }} />
                            }
                            {
                                this.state.items.length === 0 && this.state.fetching === false &&
                                <Div>
                                    Пока никто не поделился едой, заходи позже!
                                </Div>
                            }
                        </List>
                    </Group>
                    </PullToRefresh>
                </Panel>
                <Panel id="detail">
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({ activePanel: 'main' })}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                        after=""
                    >{ this.state.selectedItem !== undefined ? this.state.selectedItem.caption : "Ошибка" }</PanelHeader>
                    { this.state.selectedItem !== undefined && this.state.selectedItem.image_url.length > 0 &&
                        <img alt={""} className={"ProductImage"} src={this.state.selectedItem ? this.state.selectedItem.image_url : ""}/>
                    }
                    { this.state.selectedItem !== undefined &&
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
                    { this.state.selectedItem === undefined &&
                        <Spinner size="large" style={{ marginTop: 20 }} />
                    }
                </Panel>
            </View>
        );
    }
}

export default FoodView;