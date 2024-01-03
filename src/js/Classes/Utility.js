/*
 * @copyright 2023 Passwords App
 *
 * @author Marius David Wieschollek
 * @license AGPL-3.0
 *
 * This file is part of the Passwords App
 * created by Marius David Wieschollek.
 */
import UtilityService from '@js/Services/UtilityService';

const handler = {
    get(target, prop, receiver) {
        const value = target[prop];
        if(value instanceof Function) {
            return function(...args) {
                console.trace(`Utility.${prop}() is deprecated and will be removed. Use UtilityService instead`, args);
                return value.apply(this === receiver ? target:this, args);
            };
        }
        return value;
    }
};

let Utility = new Proxy(UtilityService, handler);

/**
 * @deprecated
 */
export default Utility;