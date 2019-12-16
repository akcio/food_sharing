import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Cell, List, PanelHeader, Group, Div } from '@vkontakte/vkui';

class SharedItems extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        let { 
			id, items 
        } = this.props
        
        return (
            <Panel id={id}>
				<PanelHeader>Поблизости, готовы поделиться:</PanelHeader>
				<Group>
					<List>
						{
							items.length > 0 && items.map((item, index) => (
								<Cell 
									key={index}
									before={
										<img 
											style={{ 
												width: 40, 
												height : 40, 
												margin : 10 
											}} 
											src={item.image_url}
										/>
									}
									multiline
									description={item.description}
								>
								{item.caption}, {item.price}, Растояние: {item.distance}м
								</Cell>
							))
						}
						{
							items.length == 0 &&
							<Div>
								Хм, сегодня все жадные...
							</Div>
						}
					</List>
				</Group>
			</Panel>
        );
    }

}

export default SharedItems;