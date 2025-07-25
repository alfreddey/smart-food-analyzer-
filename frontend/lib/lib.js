import * as tf from "@tensorflow/tfjs";

const img = {
  classify: function (model, imgTensor) {
    const predictions = model.predict(imgTensor);

    return predictions;
  },
  topKPred: function (predictions, len) {
    const pred = predictions.arraySync();
    const topK = pred[0]
      .map((val, i) => ({ i, prediction: val }))
      .sort((a, b) => b.prediction - a.prediction)
      .slice(0, len);

    return topK;
  },
  prepare: function (imgElem, IMG_SHAPE) {
    const imgTensor = tf.browser
      .fromPixels(imgElem)
      .resizeBilinear(IMG_SHAPE)
      .div(127.5)
      .sub(1)
      .expandDims();

    return imgTensor;
  },
};

export { img };
