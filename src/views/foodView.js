import React from 'react';
import ReactDOM from 'react-dom';
import {Cell, Div, Group, List, Panel, PanelHeader, Search, View} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";

class FoodView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items_local: []
        };
    }

    componentDidMount() {
        this.getSharedItems();
    }

    async getSharedItems() {
        let response =  await FoodSharingAPI.getNearby(1, 2);
        this.setState( {items_local: response.data});
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} >
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
                                    Пока никто не поделился едой, заходи позже!
                                </Div>
                            }
                        </List>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default FoodView;