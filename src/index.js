import Vue from 'vue/dist/vue.js';
import Konva from "konva";
import _ from 'lodash';
import './index.css';
import catImage from "./cat.png";
import backImage from "./c1080.jpg";

var fontSizes = [88, 58, 45];

function renderText(text, layer, x, y) {
    var fontID = 1;
    
    var tempText = new Konva.Text({
        text: text,
        fontSize: fontSizes[fontID],
        fontFamily: 'Lato,YouYuan',
        fill: '#ffd700',
        align: 'center',
        verticalAlign :'middle'
    });
    if (x == 0) {
        tempText.x((1080-tempText.width())/2);
        tempText.y(y)
    }
    if (y == 0){
        tempText.x(x)
        tempText.y((1080-tempText.height())/2+90);
    }
    layer.add(tempText);
}

function renderStage(width, height) {
    return new Konva.Stage({
        container: 'canvas',
        width: width,
        height: height,
    });
}

function renderBackground(width, height, radius) {
    var img = new Image();
    img.src = backImage;
    var rect = new Konva.Image({
        x: 0,
        y: 0,
        width: width,
        height: height,
        image: img
    });
    return rect;
}

function downloaduri(uri, name) {
    var link = document.createElement('a');
    link.download = name + '.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

var sticker = new Vue({
    el: '#main',
    data: {
        text: [
            '新春大吉',
            '这是上联',
            '这是下联'
        ],
        dataUrl: ''
    },
    created: function () {
        this.addText()
        this.addText()
        this.addText()
    },
    mounted:function () {
        this.addText()
        this.addText()
        this.addText()
    },
    watch: {
        text: function (val) {
            this.addText()
        }
    },
    computed:{
        textRight: function(){
            var text = this.text[1];
            return text.replace(/(.{1})/g,"$1\r\n");
        },
        textLeft: function(){
            var text = this.text[2];
            return text.replace(/(.{1})/g,"$1\r\n");
        }
    },
    methods: {
        addText() {
            var textTop = this.text[0];
            var textRight = this.textRight;
            var textLeft = this.textLeft;
            // 创建stage
            var size = [1080, 1080, 60];
            var stage = renderStage(size[0], size[1]);
            // 加载图层1
            var layer = new Konva.Layer();
            // 加载边框
            var rect = renderBackground(size[0], size[1], size[2]);
            layer.add(rect);
            renderText(textTop, layer, 0, 160);
            renderText(textRight, layer, 900,0);
            renderText(textLeft, layer, 130,0);
            stage.add(layer);
            var config = {
                mineType: 'image/jpeg',
                quality: 1
            }
            this.dataUrl = document.getElementsByTagName('canvas')[0].toDataURL('image/jpeg');
        },
        downloadImg() {
            var dataUrl = this.dataUrl;
            var name = "煎蛋春联"+this.text[0];
            downloaduri(dataUrl, name);

        }
    }
})