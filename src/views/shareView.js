import React from 'react';
import ReactDOM from 'react-dom';
import {
    Panel, PanelHeader, View, Input, FormLayout, Textarea, Select, Checkbox, Link, File, Button
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

class ShareView extends React.Component {
    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel}>
                <Panel id={this.props.id}>
                    <PanelHeader>Поделиться</PanelHeader>
                    <FormLayout>
                        <Select top="Категория" placeholder="Выберите категорию">
                            <option value="shareView.js">Еда</option>
                            <option value="Drink">Напитки</option>
                        </Select>
                        <Input top="Название продукта" bottom="Не пишите в названии ключевые слова
                        &quot;Отдам&quot; или &quot;Обменяю&quot;, вместо этого укажите точное название, чтобы
                        остальным было проще найти ваше предложение."/>
                        <Textarea top="Описание"  bottom="Опишите ваш продукт как можно подробнее."/>
                        <File before={<Icon24Camera />} controlSize="xl">
                            Загрузить фото
                        </File>
                        <Checkbox>Я принимаю <Link>правила приложения</Link></Checkbox>
                        <Checkbox>Я принимаю условия <Link>лицензионного соглашения</Link></Checkbox>
                        <Button size="xl">Поделиться</Button>
                    </FormLayout>
                </Panel>
            </View>
        );
    }
}

export default ShareView;