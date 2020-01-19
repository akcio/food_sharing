import React from 'react';
import ReactDOM from 'react-dom';
import {Epic, Panel, PanelHeader, Spinner, View} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";

class SharedItemsView extends React.Component {
    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} >
                    <PanelHeader>Моя еда</PanelHeader>
                    <Spinner size="large" style={{ marginTop: 20 }} />
                </Panel>
            </View>
        );
    }
}

export default SharedItemsView;