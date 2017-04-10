import App from './app'
import Cube from './objects/cube'

let app = new App()
app.add(new Cube({
  width: 5,
  height: 5,
  depth: 5,
  color: 0x102951
}))