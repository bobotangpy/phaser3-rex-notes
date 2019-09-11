import UpdateTexture from './UpdateTexture.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const GetValue = Phaser.Utils.Objects.GetValue;

class Line extends RenderTexture {
    constructor(scene, config) {
        var lineStart = GetValue(config, 'start', undefined);
        var lineEnd = GetValue(config, 'end', undefined);
        var lineBody = GetValue(config, 'body', undefined);

        super(scene);
        this
            .setOrigin(0, 0.5)
            .setLineStartPosition(GetValue(lineStart, 'x', 0), GetValue(lineStart, 'y', 0))
            .setLineEndPosition(GetValue(lineEnd, 'x', 0), GetValue(lineEnd, 'y', 0))
            .setLineStartTexture(GetValue(lineStart, 'key', lineStart), GetValue(lineStart, 'frame', undefined), GetValue(lineStart, 'origin', undefined))
            .setLineEndTexture(GetValue(lineEnd, 'key', lineEnd), GetValue(lineEnd, 'frame', undefined), GetValue(lineEnd, 'origin', undefined))
            .setLineBodyTexture(GetValue(lineBody, 'key', lineBody), GetValue(lineBody, 'frame', undefined), GetValue(lineBody, 'width', undefined))

        this._tileSprite = undefined;

    }

    preDestroy() {
        if (this._tileSprite) {
            this._tileSprite.destroy();
            this._tileSprite = undefined;
        }
        super.preDestroy();
    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.redraw |= (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.redraw |= (this._y0 !== value);
        this._y0 = value;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.redraw |= (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.redraw |= (this._y1 !== value);
        this._y1 = value;
    }

    setLineStartPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    setLineEndPosition(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    setLineStartTexture(key, frame, origin) {
        if (origin === undefined) {
            origin = 0.5;
        }
        this.lineStartTexture = key;
        this.lineStartFrameName = frame;
        this.lineStartOrigin = origin;
        this.redraw = true;
        return this;
    }

    get lineStartFrame() {
        return this.scene.textures.getFrame(this.lineStartTexture, this.lineStartFrameName);
    }

    setLineEndTexture(key, frame, origin) {
        if (origin === undefined) {
            origin = 1;
        }
        this.lineEndTexture = key;
        this.lineEndFrameName = frame;
        this.lineEndOrigin = origin;
        this.redraw = true;
        return this;
    }

    get lineEndFrame() {
        return this.scene.textures.getFrame(this.lineEndTexture, this.lineEndFrameName);
    }

    setLineBodyTexture(key, frame, width) {
        this.lineBodyTexture = key;
        this.lineBodyFrameName = frame;
        this.lineBodyWidth = width;
        this.redraw = true;
        return this;
    }

    get lineBodyFrame() {
        return this.scene.textures.getFrame(this.lineBodyTexture, this.lineBodyFrameName);
    }

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateTexture();
        super.renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix);
    }

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateTexture();
        super.renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
    }
}

var methods = {
    updateTexture: UpdateTexture,
}
Object.assign(
    Line.prototype,
    methods,
);

export default Line;