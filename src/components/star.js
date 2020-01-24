import React from 'react';

class Star extends React.Component {
    render() {
        let starStyle = {
            color: "#ff5147"
        };

        return (
            <span style={starStyle}>*</span>
        );
    }
}

export default Star;