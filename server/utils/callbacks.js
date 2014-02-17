'use strict';

module.exports = function () {
    var methods =  Array.prototype.slice.call(arguments, 0),
        context = methods[0],
        index = 0,
        params,
        next,
        end;

    next = function () {
        index = index + 1;
        if (methods[index]) {
            methods[index].apply(context, params);
        }
    };

    end = function () {
        index = 0;
    };

    methods[methods.length] = end;

    return function () {
        params = Array.prototype.slice.call(arguments, 0);
        params[params.length] = next;
        next();
    };
};