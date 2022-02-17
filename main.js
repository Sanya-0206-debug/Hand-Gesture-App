prediction1=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 99,
    flip_horizontal:false
});
camera=document.getElementById("camera");

Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        console.log(data_uri);
    });
};
console.log('ml5 version:', ml5.version );
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6AHk8JFRw/model.json',modelLoded);

function modelLoded(){
    console.log('Model Loded!');
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, result)
{
    if (error) {
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById('result_emotion_name').innerHTML = result[0].label;
        prediction1=result[0].label;
        speak(); 
        if(result[0].label=='Cool'){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
        }
        if(result[0].label=='Good Job'){
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if(result[0].label=='Victory'){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
    }
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction1;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}