import App from './app'
import config from './constant/index'
import Land from './objects/land/land'
import Tree from './objects/land/tree'
import Role from './objects/role/role'
import './style/app.scss'

import Audio from './Audio'

let app = new App()

app.add(new Land({
	color: config.blue
}))
app.add(new Role({
	color: config.red
}))

app.add(new Tree())

