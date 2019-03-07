var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { SceneManager } from "./SceneManager";
export function Scene(options) {
    return function (target) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(params)) || this;
                if (options.name)
                    Scene.manager.scenes[options.name] = _this;
                return _this;
            }
            class_1.prototype.resolve = function (name) {
                Scene.manager.active = name;
            };
            class_1.prototype.render = function () {
                return options.template(this);
            };
            return class_1;
        }(target));
    };
}
Scene.manager = new SceneManager();
export function Portal() {
    var secret;
    return function (target, key) {
        secret = target[key];
        var getter = function () { return secret; };
        var setter = function (next) {
            secret = next;
            Scene.manager.render();
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
export function Follower(object) {
    return function (target, key) {
        object.subscribe(function (val) {
            target[key] = val;
        });
    };
}
//# sourceMappingURL=Scene.js.map