import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, PanelHeader, View, Group, List, Cell, InfoRow, CellButton, Header, Footer } from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";

class MoreView extends React.Component {
    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id} >
                    <PanelHeader>Дополнительно</PanelHeader>
                    <Group header={<Header>Аккаунт</Header>}>
                        <List>
                            <Cell>
                                <InfoRow header="Ваше имя">
                                    Имя Фамилия
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow header="Рейтинг">
                                    5.0
                                </InfoRow>
                            </Cell>
                        </List>
                    </Group>
                    <Group header={<Header>Настройки</Header>}>
                        <CellButton>Приватность</CellButton>
                        <CellButton>Уведомления</CellButton>
                    </Group>
                    <Group header={<Header>О приложении</Header>}>
                        <CellButton>Лицензионное соглашение</CellButton>
                        <CellButton>Правила</CellButton>
                    </Group>
                    <Footer>Версия приложения 0.0.0</Footer>
                </Panel>
            </View>
        );
    }
}

export default MoreView;



