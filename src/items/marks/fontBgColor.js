/* eslint-disable react/prop-types */
import React, {Component, PropTypes} from 'react';
import {marks, utils} from 'slate-plugins';
import ToolbarIcon from '../toolbarIcon';
import ColorPicker from '@canner/rc-color-picker';
import hexRgb from 'hex-rgb';
import "../../color-picker.css";
const {addMarkOverwrite} = marks;
const {haveMarks} = utils.have;
const {getMarkType} = utils.get;

export default class fontBgColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {},
      open: false
    };

    this.onChange = this.onChange.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  displayName = this.props.type || 'fontBgColor';

  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onChange(color) {
    let {state, onChange} = this.props;
    color.rgba = `rgba(${hexRgb(color.color).join(',')}, ${color.alpha / 100})`;
    this.setState({color});
    onChange(addMarkOverwrite(state, {type: this.displayName, data: color}));
  }

  onOpen() {
    this.setState({open: true});
  }

  onClose() {
    this.setState({open: false});
  }

  render() {
    const {icon, state, ...rest} = this.props;
    const isActive = haveMarks(state, this.displayName);
    let colorStyle = {};

    if (isActive) {
      const first = getMarkType(state, this.displayName).first().get('data');
      const color = first.get('color');
      const alpha = first.get('alpha');

      colorStyle = {
        fill: color,
        opacity: alpha
      };
    }

    return (
      <ColorPicker
        color="#000"
        defaultAlpha={80}
        onChange={this.onChange}
        onOpen={this.onOpen}
        onClose={this.onClose}>
        <ToolbarIcon
          colorStyle={colorStyle}
          type={this.displayName}
          icon={icon || 'Background'}
          onClick={e => e.preventDefault()}
          isActive={isActive}
          {...rest}
        />
      </ColorPicker>
    );
  }
}