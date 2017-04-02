import React from 'react';

export default class Contacts extends React.PureComponent {
  handleClick = () => {
    const {onClick, contact:{id}} = this.props;
    if (onClick) {
      onClick(id);
    }
  };
  render() {
    let {selected, contact: {name}} = this.props;
    return (
      <div className={`contacts__item  ${selected ? 'contacts__item--active':''}`} onClick={this.handleClick}>
        {name}
      </div>
    )
  }
};
