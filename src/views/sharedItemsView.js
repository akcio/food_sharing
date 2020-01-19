import React from 'react';
import ReactDOM from 'react-dom';
import {Epic, Panel, PanelHeader, View} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";

class SharedItemsView extends React.Component {
    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} >
                    <PanelHeader>Поделился</PanelHeader>
                </Panel>
            </View>
        );
    }
}

export default SharedItemsView;