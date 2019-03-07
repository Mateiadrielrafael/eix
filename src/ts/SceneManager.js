var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { render, html } from "lit-html";
var InvalidSceneNameError = new Error("The scene you are trying to render doesnt exist");
var SceneManager = (function () {
    function SceneManager() {
        this.main = document.getElementById("main");
        this.scenes = {};
    }
    SceneManager.prototype.render = function () {
        if (this.activeElement && this.scenes[this.activeElement])
            render(this.scenes[this.activeElement].render(), this.main);
        else
            render(html(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), this.main);
        if (this.activeElement && !this.scenes[this.activeElement])
            throw InvalidSceneNameError;
    };
    Object.defineProperty(SceneManager.prototype, "active", {
        get: function () {
            return this.activeElement;
        },
        set: function (value) {
            this.activeElement = value;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    return SceneManager;
}());
if (!document)
    throw new Error("document does not exist");
export { SceneManager };
var templateObject_1;
//# sourceMappingURL=SceneManager.js.map