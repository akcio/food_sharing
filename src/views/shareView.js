import React from 'react';
import {
    Panel, PanelHeader, View, Input, FormLayout, Textarea, Select, Checkbox, Link, File, Button, Alert
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

class ShareView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            caption: '',
            description: '',
            popout: null
        };

        this.shareItem = () => {
            // TODO Add true parameters!
            this.addItem(1, this.state.caption, this.state.description, 1, 1, 1, "https://s3.amazonaws.com/tinycards/image/60cacd94bfbd3795f72912ec254efb38", new Date());
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.openSuccessPopout = this.openSuccessPopout.bind(this);
        this.openFailPopout = this.openFailPopout.bind(this);
        this.closePopout = this.closePopout.bind(this);
    }

    async addItem(vk_id, in_caption, in_description, latitude, longitude, in_price, imageURL, in_expire) {
        let response = await FoodSharingAPI.shareItem(vk_id, in_caption, in_description, latitude, longitude, in_price, imageURL, in_expire);
        if (response.resourceId && response.resourceId !== -1) {
            this.openSuccessPopout();
            this.setState( {
                caption: '',
                description: ''
            });
        } else {
            this.openFailPopout();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    openSuccessPopout() {
        this.setState({ popout:
                <Alert
                    actions={[{
                        title: 'Хорошо',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={this.closePopout}
                >
                    <h2>Вы поделились вашей едой с остальными</h2>
                    <p>Перейдите на вкладку <Link>Моя Еда</Link>, чтобы увидеть все выложенные товары.</p>
                    <p>Не забудьте закрыть объявление, после того как отдадите продукт!</p>
                </Alert>
        });
    }

    openFailPopout() {
        this.setState({ popout:
                <Alert
                    actions={[{
                        title: 'Ок',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={this.closePopout}
                >
                    <h2>Ой, что-то пошло не так</h2>
                    <p>При добавлении товара произошла ошибка. Приносим свои извенения, попробуйте еще раз.</p>
                </Alert>
        });
    }

    closePopout () {
        this.setState({ popout: null });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel} popout={this.state.popout}>
                <Panel id={this.props.id}>
                    <PanelHeader>Поделиться</PanelHeader>
                    <FormLayout>
                        <Select top="Категория" placeholder="Выберите категорию">
                            <option value="shareView.js">Еда</option>
                            <option value="Drink">Напитки</option>
                        </Select>
                        <Input
                            type="text"
                            top="Название продукта"
                            ottom="Не пишите в названии ключевые слова
                            &quot;Отдам&quot; или &quot;Обменяю&quot;, вместо этого укажите точное название, чтобы
                            остальным было проще найти ваше предложение."
                            name="caption"
                            value={this.state.caption}
                            onChange={this.handleInputChange}
                        />
                        <Textarea
                            top="Описание"
                            bottom="Опишите ваш продукт как можно подробнее."
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                        <File before={<Icon24Camera />} controlSize="xl">
                            Загрузить фото
                        </File>
                        <Checkbox>Я принимаю <Link>правила приложения</Link></Checkbox>
                        <Checkbox>Я принимаю условия <Link>лицензионного соглашения</Link></Checkbox>
                        <Button size="xl" onClick={this.shareItem}>Поделиться</Button>
                    </FormLayout>
                </Panel>
            </View>
        );
    }
}

export default ShareView;