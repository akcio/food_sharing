import React from 'react';
import {
    Panel,
    PanelHeader,
    View,
    Group,
    List,
    Cell,
    InfoRow,
    CellButton,
    Header,
    Footer,
    PanelHeaderButton,
    platform,
    IOS,
    Switch,
    Div
} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

class MoreView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'main',
        };
    }

    render() {
        return (
            <View id={this.props.id} activePanel={ this.state.activePanel }>
                <Panel id="main" separator={false}>
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
                        {/*<CellButton onClick={() => this.setState({ activePanel: 'privacy' })}>Приватность</CellButton>*/}
                        <CellButton onClick={() => this.setState({ activePanel: 'notifications' })}>Уведомления</CellButton>
                    </Group>
                    <Group header={<Header>О приложении</Header>}>
                        <CellButton onClick={() => this.setState({ activePanel: 'license' })}> Лицензионное соглашение</CellButton>
                        <CellButton onClick={() => this.setState({ activePanel: 'regulations' })}>Правила</CellButton>
                    </Group>
                    <Footer>Версия приложения 0.0.0</Footer>
                </Panel>
                {/*<Panel id="privacy" separator={false}>*/}
                {/*    <PanelHeader*/}
                {/*        left={<PanelHeaderButton onClick={() => this.setState({ activePanel: 'main' })}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}*/}
                {/*    >Приватность</PanelHeader>*/}
                {/*    <Group>*/}
                {/*        <List>*/}
                {/*            <Cell asideContent={<Switch />}>*/}
                {/*                Показывать имя полностью*/}
                {/*            </Cell>*/}
                {/*        </List>*/}
                {/*    </Group>*/}
                {/*</Panel>*/}
                <Panel id="notifications" separator={false}>
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({ activePanel: 'main' })}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                    >Уведомления</PanelHeader>
                    <Group>
                        <List>
                            <Cell asideContent={<Switch />}>
                                Уведомлять о закрытии объявления
                            </Cell>
                        </List>
                    </Group>
                </Panel>
                <Panel id="license" separator={false}>
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({ activePanel: 'main' })}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                    >Лицензионное соглашение</PanelHeader>
                    <Div>
                        Лицензионное соглашение.
                    </Div>
                </Panel>
                <Panel id="regulations" separator={false}>
                    <PanelHeader
                        left={<PanelHeaderButton onClick={() => this.setState({ activePanel: 'main' })}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}
                    >Правила</PanelHeader>
                    <Div>
                        Правила использования приложения Food Sharing.
                    </Div>
                </Panel>
            </View>
        );
    }
}

export default MoreView;



