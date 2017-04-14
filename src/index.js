import App from './app'
import config from './constant/index'
import Land from './objects/land/land'
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

let audio = new Audio();
audio.start();

setTimeout(function outputVoice() {
	console.log(2);

	let voiceSize = audio.getVoiceSize();
	let output = '';

	for (let i = 0; i < voiceSize; i += 1) {
		output += ' ';
	}
	console.log(`%c${output}`, 'background: #cccccc');

	setTimeout(outputVoice, 25);
}, 25);
