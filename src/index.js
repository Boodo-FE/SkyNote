import App from './app'
import config from './constant/index'
import Land from './objects/land/land'
import Role from './objects/role/role'
import './style/app.scss'

let app = new App()

app.add(new Land({
	color: config.blue
}))
app.add(new Role({
	color: config.red
}))

