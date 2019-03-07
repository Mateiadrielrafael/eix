var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { EventEmitter } from "./EventEmitter";
var SyncEmitter = (function () {
    function SyncEmitter() {
        this.core = {};
    }
    SyncEmitter.prototype.on = function (key, callback) {
        if (!this.core[key])
            this.core[key] = [];
        this.core[key].push(callback);
    };
    SyncEmitter.prototype.once = function (key, callback) {
        var _this = this;
        if (!this.core[key])
            this.core[key] = [];
        var func = function (data) {
            callback(data);
            _this.core[key].splice(_this.core[key].indexOf(func), 1);
        };
        this.core[key].push(func);
    };
    SyncEmitter.prototype.emit = function (name, data) {
        this.core[name].forEach(function (val) { return val(data); });
    };
    SyncEmitter.prototype.toAsync = function () {
        var e_1, _a;
        var emitter = new EventEmitter();
        for (var i in this.core)
            try {
                for (var _b = __values(this.core[i]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var j = _c.value;
                    emitter.on(i, j);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        return emitter;
    };
    return SyncEmitter;
}());
export { SyncEmitter };
//# sourceMappingURL=SyncEventEmitter.js.map