import App from './app'
import config from './constant/index'
import Land from './objects/land/land'
import Role from './objects/role/role'
import Sky from './objects/sky/sky'
import Bubbles from './objects/sky/bubble'

import './style/app.scss'

let app = new App()

app.add(new Land({
	color: config.blue
}))
app.add(new Role({
	color: config.red
}))
app.add(new Sky())
app.add(new Bubbles())

