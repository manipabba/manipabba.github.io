+++
categories = ["projects"]
coders = []
date = 2020-06-19T23:00:00Z
description = "Neural Network Implementation of Flappy Bird"
github = ["https://github.com/manipabba/Neural_Network_Flappy_Bird"]
image = "tensorflow_logo.svg"
title = "Neural Network Flappy Bird"
type = "post"
[[tech]]
logo = "/JavaScript_logo.svg"
name = "JavaScript"
url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
[[tech]]
logo = "/tensorflow_logo.svg"
name = "TensorFlow"
url = "https://www.tensorflow.org/"
[[tech]]
logo = "/p5js_logo.svg"
name = "P5.js"
url = "https://p5js.org/"
+++
### [Game Website](https://manipabba.github.io/Neural_Network_Flappy_Bird/)
This program utilizes Tensorflow.js to train a "bird" to play the game flappy bird automatically. The neural networks representing a bird's actions/brain are trained via a genetic algorithm, where populations of birds are trained at a time. The algorithm selects top performing birds based on a fitness value and breeds a new generation with permutations to further train the neural networks. Graphics are done with the P5.js library. The website is built with vanila JavaScript. (with HTML and CSS)

This website allows you to see the training of a bird in real time, as well as see a pre-trained model play the game. 

![Game Training](/nn_fbird_training.png)
Screenshot of a generation of birds training
