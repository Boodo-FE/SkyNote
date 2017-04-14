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
        console.log(1);
        that.bufferLength = tha.analyser.frequencyBinCount;
        that.dataArray = new Uint8Array(that.bufferLength);
      },
      function (err) {
        console.log("ERROR:", err);
      }
    );
  }

  getVoiceSize() {

    // 通过analyser获取音量
    console.log(this.dataArray);
    this.analyser.getByteFrequencyData(this.dataArray);
    let sum = this.dataArray.reduce((a, b) => a + b);
    this.volume = Math.round(sum / 500);

    console.log(this.volume);
    return this.volume;
  }

}

// volume表示音量大小
export default AudioAPI