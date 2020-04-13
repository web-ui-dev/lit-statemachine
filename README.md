[![npm][npm]][npm-url]
[![node][node]][node-url]
[![license][license]][license-url]

# lit-statemachine
StateMachine for Web Components, simplified integration of Xstate with LitElement. Use it as decorator if you're in a typescript evironment or use it as ES6 class mixin if you want to use in a JS environment.

## Install

```
npm i -S @web-ui/lit-statemachine
```

## ESM/CJS 

```
// ES6
import { useStateMachine, useStateMachineMixin } from '@web-ui/lit-statemachine';
```

```
// CJS
const { useStateMachine, useStateMachineMixin } = require('@web-ui/lib/lit-statemachine');
```

## Usage

[live code example][decorator-example]

### As a mixin example 

```JS
import { LitElement, html, css, customElement } from "lit-element";
import { useStateMachineMixin } from "@web-ui/lit-statemachine";

// Below state machine can be moved into external file
import { Machine, assign } from "xstate";
const increment = ({ count }) => count + 1;
const decrement = ({ count }) => count - 1;
const counterMachine = Machine({
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) },
      },
    },
  },
});

// UI component
export default class MyCounter extends useStateMachineMixin(LitElement, {
  machine: counterMachine,
}) {
  static get styles() {
    return css`
      span {
        width: 4rem;
        display: inline-block;
        text-align: center;
        font-size: 200%;
      }

      button {
        width: 4rem;
        height: 4rem;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
        font-size: 200%;
      }
    `;
  }

  render() {
    const { state, send } = this.machine;

    return html`
      <button @click="${() => send("DEC")}">-</button>
      <span>${state.context.count}</span>
      <button @click="${() => send("INC")}">+</button>
    `;
  }
}

customElements.define("my-counter", MyCounter);
```

### As a decorator example:

```TS
import { LitElement, html, css, customElement } from "lit-element";
import { useStateMachine } from '@web-ui/lit-statemachine';

// Below state machine can be moved into external file
import { Machine, assign } from "xstate";
const increment = ({ count }) => count + 1;
const decrement = ({ count }) => count - 1;

const counterMachine = Machine({
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) },
      },
    },
  },
});

// UI component
@customElement('my-counter')
@useStateMachine({ machine: counterMachine })
export default class MyCounter extends LitElement {
  render() {
    const { state, send } = this.machine;

    return html`
      <button @click="${() => send("DEC")}">-</button>
      <span>${state.context.count}</span>
      <button @click="${() => send("INC")}">+</button>
    `;
  }
}
```
> Note: since the @customElement decorator works as static method to register element before class initiated, it has be added before the @useStateMachine()


[npm]: https://img.shields.io/npm/v/@web-ui/lit-statemachine.svg
[npm-url]: https://npmjs.com/package/@web-ui/lit-statemachine
[node]: https://img.shields.io/node/v/@web-ui/lit-statemachine.svg
[node-url]: https://nodejs.org/
[license]: https://img.shields.io/npm/l/lit-statemachine.svg
[license-url]: https://opensource.org/licenses/MIT
[decorator-example]: https://webcomponents.dev/edit/lfw1Jj98crKaGEvbAjDg