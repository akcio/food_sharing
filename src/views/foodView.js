import React from 'react';
import ReactDOM from 'react-dom';
import {
    Cell, Div, Group, List, Panel, PanelHeader, Search, View, Button, FormLayout, CellButton, PullToRefresh, Spinner
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";

class FoodView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            fetching: true
        };

        this.onRefresh = () => {
            this.setState({ fetching: true });
            this.updateSharedItems();
        };

        this.onRefresh();
    }

    async updateSharedItems() {
        let response =  await FoodSharingAPI.getNearby(1, 2);
        this.setState( {
            items: response.data,
            fetching: false
        });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} >
                    <PanelHeader>Каталог</PanelHeader>
                    <Search />
                    <FormLayout>
                        {/*<Button size="xl">*/}
                        {/*    Задать фильтры*/}
                        {/*</Button>*/}
                    </FormLayout>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                    <Group>
                        <List>
                            {
                                this.state.items.length > 0 && this.state.items.map((item, index) => (
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
            </View>
        );
    }
}

export default FoodView;