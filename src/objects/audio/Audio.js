/**
 * 使用方法：
 * 1. let audio = new Audio();
 * 2. audio.start() // 开始获取麦克风
 * 3. let voiceSize = audio.getVoiceSize(); // 获取音量大小
 */

class AudioAPI {
  constructor() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    // 音频分析工具
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 256;
  }

  // 启动
  start() {
    let that = this;
    navigator.getUserMedia(
      {audio: true},
      (stream) => {
        that.source = that.context.createMediaStreamSource(stream);
        that.source.connect(that.analyser);
        that.bufferLength = that.analyser.frequencyBinCount;
        that.dataArray = new Uint8Array(that.bufferLength);
      },
      function (err) {
        console.log("ERROR:", err);
      }
    );
  }

  getVoiceSize() {

    if (this.dataArray instanceof Uint8Array) {
      // 通过analyser获取音量
      this.analyser.getByteFrequencyData(this.dataArray);
      let sum = this.dataArray.reduce((a, b) => a + b);
      this.volume = Math.round(sum / 100);

      return this.volume;
    } else {
      return 0;
    }
  }

}

// volume表示音量大小
export default AudioAPI