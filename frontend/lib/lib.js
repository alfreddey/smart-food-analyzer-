import * as tf from "@tensorflow/tfjs";

const img = {
  classify: function (model, imgTensor) {
    const predictions = model.predict(imgTensor);

    return predictions;
  },
  topKPred: async function (predictions, len) {
    const pred = await predictions.data();
    const topK = [...pred]
      .map((val, i) => ({ i, prediction: val }))
      .sort((a, b) => b.prediction - a.prediction)
      .slice(0, len);

    return topK;
  },
  prepare: function (imgElem, IMG_SHAPE) {
    const imgTensor = tf.browser
      .fromPixels(imgElem)
      .resizeBilinear(IMG_SHAPE)
      .toFloat()
      .expandDims();

    return imgTensor;
  },
};

export { img };
