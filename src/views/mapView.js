import React from 'react';
import {Panel, PanelHeader, Spinner, View } from '@vkontakte/vkui';

class MapView extends React.Component {
    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} separator={false}>
                    <PanelHeader>Карта</PanelHeader>
                    <Spinner size="large" style={{ marginTop: 20 }} />
                </Panel>
            </View>
        );
    }
}

export default MapView;