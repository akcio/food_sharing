import React from 'react';
import {Panel, PanelHeader, Spinner, View } from '@vkontakte/vkui';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import FoodSharingAPI from "../services/food_sharing_api";

class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            fetching: true,
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
        let response = await FoodSharingAPI.getNearby(1, 1);
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
        const position = [this.state.lat, this.state.lon];

        const mapStyle = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        };

        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} separator={false}>
                    <PanelHeader>Карта</PanelHeader>
                    <YMaps onApiAvaliable={ymaps => this.handleApiAvaliable(ymaps)}>
                        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} style={mapStyle}>
                        {
                            this.state.items.length > 0 && this.state.items.map((item, index) => (
                                <Placemark
                                    key={index}
                                    defaultGeometry={[item.lat, item.lon]}
                                    onClick={()=>{console.log(item)}}
                                />
                            ))
                        }
                        </Map>
                    </YMaps>
                </Panel>
            </View>
        );
    }
}

export default MapView;