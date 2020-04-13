/**
 * StateMachine decorator and mixin
 * adds machine and send properties and triggers render cycle when state changes
 */
import { LitElement } from 'lit-element';
export declare type Constructor<T> = new (...args: unknown[]) => T;
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
export declare const useStateMachineMixin: (targetClass: Constructor<LitElement>, { machine }: OptionTypes) => Constructor<LitElement>;
/**
 *  State Machine Decorator Factory
 */
export declare const useStateMachine: (options: OptionTypes) => (descriptor: ClassDescriptor) => false | {
    kind: "class";
    elements: ClassElement[];
    finisher(targetClass: Constructor<LitElement>): Constructor<LitElement>;
};
export default useStateMachine;
