class VoiceAPI {
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

        let bufferLength = that.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        setInterval(function () {
          that.analyser.getByteFrequencyData(dataArray);
          let sum = dataArray.reduce((a, b) => a + b);
          that.volume = sum;
        }, 25);
      },
      function (err) {
        console.log("ERROR:", err);
      }
    );
  }

}

// volume表示音量大小
export default VoiceAPI