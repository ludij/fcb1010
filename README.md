# FCB1010

Web simulation of the [Behringer FCB1010](https://www.behringer.com/product.html?modelCode=P0089) made with [React Hooks](https://reactjs.org/docs/hooks-intro.html), [Typescript](https://www.typescriptlang.org/), [Web MIDI API](https://www.w3.org/TR/webmidi/) and [Emotion](https://emotion.sh/). This is a work in progress repository, created to further familiarize myself with these technologies. As the Web MIDI API is not a W3C standard yet, the FCB1010 web app only works in Chrome, Opera and Android.

## Getting Started

```
$ npm i
$ npm start
```

## Feature list

- [x] Create virtual FCB1010 surface
- [x] Implement MIDI Web API
- [x] Give pedals two modes: toggle and press
- [x] Make it possible to edit which MIDI messages the pedals send
- [ ] Add expression pedals functionality
- [ ] Style the edit modal and input fields
- [ ] Handle keyboard input, so it can be used to trigger the pedals
- [ ] Translate app state to a sysex message to send it to a hardware Behringer FCB1010
- [ ] Handle MIDI input and make it possible to import sysex messages
