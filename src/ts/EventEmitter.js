import { Subject } from "rxjs";
import { filter, take, map } from "rxjs/operators";
var EventEmitter = (function () {
    function EventEmitter() {
        this.core = new Subject();
    }
    EventEmitter.prototype.on = function (key, callback) {
        return this.emitter(key).subscribe(callback);
    };
    EventEmitter.prototype.once = function (key, callback) {
        return this.emitter(key).pipe(take(1)).subscribe(callback);
    };
    EventEmitter.prototype.emitter = function (key) {
        return this.core.pipe(filter(function (data) { return data.name == key; })).pipe(map(function (val) { return val.data; }));
    };
    EventEmitter.prototype.emit = function (name, data) {
        this.core.next({ name: name, data: data });
    };
    return EventEmitter;
}());
export { EventEmitter };
//# sourceMappingURL=EventEmitter.js.map