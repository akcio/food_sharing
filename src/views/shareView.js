import React from 'react';
import {
    Panel, PanelHeader, View, Input, FormLayout, Textarea, Select, Checkbox, Link, File, Button, Alert, Footer
} from '@vkontakte/vkui';
import FoodSharingAPI from "../services/food_sharing_api";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import StarText from "../components/starText";

class ShareView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            caption: '',
            description: '',
            regulations: false,
            license: false,
            popout: null
        };

        this.ErrorType = {
            UNKNOWN_ERROR: 1,
            NOT_FILLED: 2
        };

        this.shareItem = () => {
            // TODO Add true parameters!
            if (this.props.fetchedUser != null) {
                this.addItem(this.props.fetchedUser.id, this.state.caption, this.state.description, 1, 1, 1, "https://s3.amazonaws.com/tinycards/image/60cacd94bfbd3795f72912ec254efb38", new Date());
            } else {
                console.error("No fetched user!");
                this.openFailPopout(this.ErrorType.UNKNOWN_ERROR);
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.openSuccessPopout = this.openSuccessPopout.bind(this);
        this.openFailPopout = this.openFailPopout.bind(this);
        this.closePopout = this.closePopout.bind(this);
    }

    async addItem(vk_id, in_caption, in_description, latitude, longitude, in_price, imageURL, in_expire) {
        if (this.state.caption.length > 0 && this.state.regulations && this.state.license) {
            let response = await FoodSharingAPI.shareItem(vk_id, in_caption, in_description, latitude, longitude, in_price, imageURL, in_expire);
            if (response.resourceId && response.resourceId !== -1) {
                this.openSuccessPopout();
                this.setState({
                    caption: '',
                    description: '',
                    regulations: false,
                    license: false,
                });
            } else {
                this.openFailPopout(this.ErrorType.UNKNOWN_ERROR);
            }
        } else {
            this.openFailPopout(this.ErrorType.NOT_FILLED);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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

    openFailPopout(errorType) {
        this.setState({ popout:
                <Alert
                    actions={[{
                        title: 'Ок',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={this.closePopout}
                >
                    { errorType === this.ErrorType.UNKNOWN_ERROR &&
                        <h2>Ой, что-то пошло не так</h2>
                    }
                    {errorType === this.ErrorType.UNKNOWN_ERROR &&
                        <p>При добавлении товара произошла ошибка. Приносим свои извенения, попробуйте еще раз.</p>
                    }
                    {errorType === this.ErrorType.NOT_FILLED &&
                        <h2>Заполнены не все обязательные поля</h2>
                    }
                    {errorType === this.ErrorType.NOT_FILLED &&
                        <p>Пожалуйста, заполните все поля, обозначенные символом <StarText/>.</p>
                    }
                </Alert>
        });
    }

    closePopout () {
        this.setState({ popout: null });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.props.activePanel} popout={this.state.popout}>
                <Panel id={this.props.id} separator={false}>
                    <PanelHeader>Поделиться</PanelHeader>
                    <FormLayout>
                        <Select top={<StarText>Категория</StarText>} placeholder="Выберите категорию">
                            <option value="shareView.js">Еда</option>
                            <option value="Drink">Напитки</option>
                        </Select>
                        <Input
                            type="text"
                            top={<StarText>Название продукта</StarText>}
                            bottom="Не пишите в названии ключевые слова
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
                        <File top={<StarText>Фото</StarText>} before={<Icon24Camera />} bottom="Фото должно быть четким
                         и качественным, на снимке должен присутствовать товар, указанный в объявлении." controlSize="xl">
                            Загрузить фото
                        </File>
                        <Checkbox
                            type="checkbox"
                            name="regulations"
                            checked={this.state.regulations}
                            onChange={this.handleInputChange}
                        ><StarText>Я принимаю <Link>правила приложения</Link></StarText></Checkbox>
                        <Checkbox
                            type="checkbox"
                            name="license"
                            checked={this.state.license}
                            onChange={this.handleInputChange}
                        ><StarText>Я принимаю условия <Link>лицензионного соглашения</Link></StarText></Checkbox>
                        <Button size="xl" onClick={this.shareItem}>Поделиться</Button>
                    </FormLayout>
                    <Footer>Символом <StarText/> помечены обязательные поля</Footer>
                </Panel>
            </View>
        );
    }
}

export default ShareView;