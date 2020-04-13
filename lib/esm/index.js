import { interpret } from 'xstate';
/**
 *  State Machine Class Mixin
 */
export const useStateMachineMixin = (targetClass, { machine }) => {
    return class extends targetClass {
        constructor() {
            super(...arguments);
            this.machine = interpret(machine);
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
export const useStateMachine = (options) => (descriptor) => {
    if (typeof descriptor === 'function')
        return false;
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        finisher(targetClass) {
            return useStateMachineMixin(targetClass, options);
        }
    };
};
export default useStateMachine;
//# sourceMappingURL=index.js.map