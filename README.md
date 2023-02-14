# resource-loader

simple image & audio file loader for web apps.


## Install

```sh
$ yarn add https://github.com/eudpna/resource-loader
```

## How to use

```ts
import { ResourceLoader } from '@eudpna/resource-loader'

const loader = new ResourceLoader

loader.load('/images/someimage.png')
.then((r) => {
    r.resource // HTML Image Element
})

loader.load('/audios/someaudio.mp3')
.then((r) => {
    r.resource.play() // Howl.play()
})

loader.percent // current loading percentage (integer 0-100)
```

using [howler.js](https://github.com/goldfire/howler.js).