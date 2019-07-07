'use strict';

exports.register = async function (server) {

    const table = function(num) {
        var table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return table[num];
    };

    const hashCode = function(s) {
        let hash;

        for (let i = 0; i < s.length; i++) {
            hash = Math.imul(31, hash) + s.charCodeAt(i) | 0;
        }

        return hash;
    };

    const binaryTransfer = function(hash) {
        const stack = [];
        const sign = hash < 0 ? '-' : '';
        let num;
        let result = '';
        
        hash = Math.abs(hash);
        
        while (hash >= 61) {
            num = hash % 61;
            hash = Math.floor(hash / 61);
            stack.push(table(num));
        }
        
        if (hash > 0) {
            stack.push(table(hash));
        }
        
        for (let i = stack.length - 1; i >= 0; i--) {
            result += stack[i];
        } 
        
        return sign + result;
    };

    const generate = function(url) {
        const id = binaryTransfer(hashCode(url));
        return id.replace('-', 'Z');
    };

    server.expose('generate', generate);
};

exports.name = 'shorthash';
