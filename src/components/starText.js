import React from 'react';

class StarText extends React.Component {
    render() {
        let starStyle = {
            color: "#ff5147"
        };

        return (
            <span>{this.props.children} <span style={starStyle}>*</span></span>
        );
    }
}

export default StarText;