"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
/**
 *  State Machine Class Mixin
 */
exports.useStateMachineMixin = (targetClass, { machine }) => {
    return class extends targetClass {
        constructor() {
            super(...arguments);
            this.machine = xstate_1.interpret(machine);
            this.send = this.machine.send;
        }
        connectedCallback() {
            this.machine.start();
            this.machine.onTransition((state) => {
                if (state.changed)
                    this.requestUpdate();
            });
            super.connectedCallback();
        }
        disconnectedCallback() {
            this.machine.stop();
            super.disconnectedCallback();
        }
    };
};
/**
 *  State Machine Decorator Factory
 */
exports.useStateMachine = (options) => (descriptor) => {
    if (typeof descriptor === 'function')
        return false;
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        finisher(targetClass) {
            return exports.useStateMachineMixin(targetClass, options);
        }
    };
};
exports.default = exports.useStateMachine;
//# sourceMappingURL=index.js.map