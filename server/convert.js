import fs from "node:fs";
import wav from "node-wav";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

const filePath = "./tmp/audio.mp4";
const outputPath = filePath.replace(".mp4", ".wav");

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo o video...");

    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath) //Ler o arquivo que está no outputPath
        const fileDecoded = wav.decode(file) // Decodificar o arquivo

        const audioData = fileDecoded.channelData[0] // Selecionando arquivo de audio no channel 0
        const floatArray = new Float32Array(audioData) // simplifica o Array, para ser mais fácil de ler

        console.log("Vídeo convertido com sucesso!")
        resolve(floatArray)

        fs.unlinkSync(outputPath) // remove o arquivo da pasta 
      })
      .on("error", (error) => {
        console.log("Error ao converter o arquivo", error);
        reject(error);
      })
      .save(outputPath);
  });
