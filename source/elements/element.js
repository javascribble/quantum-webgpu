import { Component, define } from '@javascribble/quantum';
import { element } from '../templates/element.js';

export class Element extends Component {
    constructor() {
        super(element);
    }
}

define(Element);