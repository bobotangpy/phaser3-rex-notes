## Introduction

A lite-weight bracket parser.

- Author: Rex
- Object

## Live demoes

- [Basic](https://codepen.io/rexrainbow/pen/bGwYNoX)
- [Color Bitmaptext](https://codepen.io/rexrainbow/pen/vYXWmMN)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bracket-parser)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbracketparserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbracketparserplugin.min.js', true);
    ```
- Add parser object
    ```javascript
    var parser = scene.plugins.get('rexbracketparserplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BracketParserPlugin from 'phaser3-rex-plugins/plugins/bracketparser-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBracketParser',
                plugin: BracketParserPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add parser object
    ```javascript
    var parser = scene.plugins.get('rexBracketParser').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import BracketParser from 'phaser3-rex-plugins/plugins/bracketparser.js';
    ```
- Add parser object
    ```javascript
    var parser = new BracketParser(config);
    ```

### Create instance

```javascript
var parser = scene.plugins.get('rexBracketParser').add({
    // brackets: '<>', // or ['<', '>']
    // valueConvert: true,
    // regex : {
    //     tag: '[a-z0-9-_.]+',
    //     value: '[ #a-z-_.0-9,]+'
    // }
});
```

- `brackets`: String of left-bracket and right-bracket.
    - A single string with 2 characters. Default value is `'<>'`.
    - A array with 2 strings
- `valueConvert` : A callback to convert values.
    - `true` : Defaule value converter
    - `false`, or `null` : Bypass string value.
    - Function object:
        ```javascript
        function(s) {
            return s;
        }
        ```
- `regex` :
    - `regex.tag` : Expression of parse tag. Default value is `'[a-z0-9-_.]+'`.
    - `regex.value` : Expression of parse value. Default value is `'[ #a-z-_.0-9,]+'`.

#### Tag and content

Assume that left-bracket and right-bracket is `'<>'`

- Tag-start : `'<TAG>'`
    - Tag-start with value : `'<TAG=value>'`
        - `value` : If `valueConvert` is `true`,
            - Number
            - Boolean
            - null
            - String: 
                - `'a'-'z'`, `'A'-'Z'`,
                - String mixin `0-9`
                - `'#'`, `'-'`, `'.'`
    - Tag-start with array values, separated via `','` : `'<TAG=value0,value1,value2>'`
- Tag-end : `'<\TAG>'`
- Content : Any string outside of tag-start, or tag-end.

### Start parsing

```javascript
parser.start(text);
```

These events will be emitted under this method

- Parsing start
    ```javascript
    parser.on('start', function(){ /* ... */ });
    ```
- Get a specific tag-start
    ```javascript
    parser.on('+' + TagName, function(value){ /* ... */ });
    ```
- Get any-tag-start
    ```javascript
    parser.on('+', function(tag, value){ /* ... */ });
    ```
- Get a specific tag-end
    ```javascript
    parser.on('-' + TagName, function(){ /* ... */ });
    ```
- Get any-tag-end
    ```javascript
    parser.on('-', function(tag){ /* ... */ });
    ```
- Get a content
    ```javascript
    parser.on('content', function(content){ /* ... */ });
    ```
- Parsing end
    ```javascript
    parser.on('complete', function(){ /* ... */ });
    ```

### Pause

```javascript
parser.pause();
```

Invoke this method during tag-start,tag-end, or content events to suspend parsing.

### Resume

```javascript
parser.next();
```

### Skip any-tag-start/any-tag-end event

```javascript
parser.skipEvent();
```

When getting a tag-start, or a tag-end event, parser will emitts 

- Tag-start : `'+TAG'`, then `'+'`
- Tag-end : `'-TAG'`, then `'-'`

Invoke this medthod under `'+TAG'`, or `'-TAG'` event to skip `'+'`, or `'-'` event.