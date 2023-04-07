import { Component } from 'react';
import css from "../App.module.css";

export class ContactsList extends Component {
  render() {
    const { children } = this.props;
    return <ul className={css.list}>{children}</ul>;
  }
}
