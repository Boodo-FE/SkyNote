import App from './app'
import config from './constant/index'
import Land from './objects/land/land'
import Role from './objects/role/role'
import Star from './objects/sky/star'
import Sun from './objects/sky/sun'
import Boy from './objects/boy/boy'
import './style/app.scss'

import Audio from './objects/audio/Audio'

let app = new App()

app.add(new Land({
    color: config.blue
}))
app.add(new Role({
    color: config.red
}))
app.add(new Star({
    color: config.yellow
}))

app.add(new Sun({
    color1: config.red,
    color2: config.yellow
}))
app.add(new Boy({
    color: 0xf7d9aa,
    size: 4,
    pt: [20, 90, 30]
}))