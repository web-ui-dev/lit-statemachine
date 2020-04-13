/**
 * StateMachine decorator and mixin
 * adds machine and send properties and triggers render cycle when state changes
 */
import { LitElement } from 'lit-element';
import { interpret } from 'xstate';

export type Constructor<T> = new (...args: unknown[]) => T;

export interface ClassDescriptor {
    kind: 'class';
    elements: ClassElement[];
    finisher: <T>(targetClass: Constructor<T>) => undefined | Constructor<T>;
}

export interface ClassElement {
    kind: 'field' | 'method';
    key: PropertyKey;
    placement: 'static' | 'prototype' | 'own';
    initializer?: () => void;
    extras?: ClassElement[];
    finisher?: <T>(targetClass: Constructor<T>) => undefined | Constructor<T>;
    descriptor?: PropertyDescriptor;
}

export interface OptionTypes {
    machine: any;
}

/**
 *  State Machine Class Mixin
 */
export const useStateMachineMixin = (
    targetClass: Constructor<LitElement>,
    { machine }: OptionTypes
): Constructor<LitElement> => {
    return class extends targetClass {
        machine = interpret(machine);

        send = this.machine.send;

        connectedCallback() {
            this.machine.start();

            this.machine.onTransition((state: any) => {
                if (state.changed) this.requestUpdate();
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
export const useStateMachine = (options: OptionTypes) => (descriptor: ClassDescriptor) => {
    if (typeof descriptor === 'function') return false;

    const { kind, elements } = descriptor;

    return {
        kind,
        elements,
        finisher(targetClass: Constructor<LitElement>) {
            return useStateMachineMixin(targetClass, options);
        }
    };
};

export default useStateMachine;
