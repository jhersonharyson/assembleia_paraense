import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types'

class ImageLoader extends Component {
    constructor(props){
        super(props)
    }
    state = {
        opacity: new Animated.Value(0),
    };

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: this.props.duration || 1000,
            useNativeDriver: true,
        }).start();
    };

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                }),
                            },
                        ],
                    },
                    this.props.style,
                ]}
            />
        );
    }
}

ImageLoader.defaultProps = {
    duration: 1000,
    style: PropTypes.any,
  };

ImageLoader.propTypes = {
    duration: PropTypes.number,
    style: PropTypes.any,
};

export default ImageLoader