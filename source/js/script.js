let problem_settings = [2,3,20,100,false];
let lastGif = "";

loadproblem(problem_settings);

let nextQuestionNotOpen = true;

function keyPress (e) {
if(e.key === "Escape" && nextQuestionOpenNotOpen) {
    
}}

document.querySelectorAll(".choice").forEach(element => {
    element.addEventListener("click", function(){
        let side = this.id.replace("-choice","");
        let otherSide = "left";
        if(side == "left")
        {
            otherSide = "right";
        }

        if(this.getAttribute("data-bigger") == "yes")
        {
            scale_rotate(side);
            setupAfterScreen(gifPicker(true),"Good Job!","Play Again");
        }
        else
        {
            scale_rotate(otherSide);
            setupAfterScreen(gifPicker(false),"Nice Try","Play Again");
        }

        setTimeout(() => {
            document.getElementById("next-question").classList.add("visible");
            nextQuestionOpen = false;
            document.querySelector("#again-button").addEventListener("click", function(){
                scale_reset();
                loadproblem(problem_settings);
                document.getElementById("next-question").classList.remove("visible");
                nextQuestionOpen = true;
            }, {once : true});
          }, "3000"); 
    });
});

function setupAfterScreen(gif, message, button)
{
    document.getElementById("after-message").innerHTML = message;
    document.getElementById("again-button").innerHTML = button;
    document.getElementById("gif").setAttribute("src",gif);
    document.getElementById("gif").setAttribute("alt",message);
}

// function changePrompt(text)
// {
//     let content = "";
//     switch(text.length)
//     { 
//         case 1:
//             content = `${text[0]}`;
//             break;
//         case 2:
//             content = `${text[0]}<button>${text[1]}</button`;
//             break;
//         case 3:
//             content = `${text[0]}<button class='${text[2]}'>${text[1]}</button`;
//             break;
//         default:
//     }
//     document.getElementById("prompt").innerHTML = content;
//     return;
// }

function scale_reset()
{   
    document.getElementById("game").classList.remove("rotate-left");
    document.getElementById("game").classList.remove("rotate-right");
}

function scale_rotate(direction)
{
    scale_reset();
    if(["left","right"].includes(direction))
    {
        document.getElementById("game").classList.add("rotate-" + direction);
    }
}

function loadproblem(settings)
{
    const complexity_1 = settings[0];
    const complexity_2 = settings[1];
    const max_component = settings[2];
    const max_total = settings[3];
    const negatives = settings[4];

    // scale_reset();
    let bigger = "";
    let left = [];
    let right = [];
    do
    {
        let options = [generateMath(complexity_1, max_component, max_total, negatives),generateMath(complexity_2, max_component, max_total, negatives)];
        let r = Math.random();
        left = options[0];
        right = options[1];
        if (r > 0.49)
        {
            left = options[1];
            right = options[0];
        }
        bigger = whichOne(left,right);
    }
    while(bigger != "left" && bigger != "right");
    
    setupChoice("left",left, bigger);
    setupChoice("right",right, bigger);
    // Hide message
}

function setupChoice(side, side_data, bigger)
{
    let value = side_data[0];
    let text = side_data[1];
    let item = document.getElementById(side + "-choice");
    item.setAttribute("data-value", value);
    if(side == bigger)
    {
        item.setAttribute("data-bigger","yes");
    }
    else
    {
        item.setAttribute("data-bigger","no");
    }
    document.getElementById(side + "-choice-math").innerHTML = text;
}

function whichOne(left, right)
{
    if(left[0] > right[0])
    {
        return "left";
    }
    if(right[0] > left[0])
    {
        return "right";
    }
    return "none";
}

function generateMath(complexity, max_component, max_total, negatives)
{
    max_component = Math.abs(max_component);
    max_total = Math.abs(max_total);
    if(max_component == 0)
    {
        max_component = 10;
    }
    if(max_total == 0)
    {
        max_total = 10;
    }
    let min_component = 0;
    let min_total = 0;
    if(negatives)
    {
        min_component = max_component * -1;
        min_total = max_total * -1;
    }

    text = ""
    total = 0;
    do
    {
        let a = pickNumber(min_component, max_component);
        let b = pickNumber(min_component, max_component);
        let c = pickNumber(min_component, max_component);
        let d = pickNumber(min_component, max_component);
        let e = pickNumber(min_component, max_component);
        let f = pickNumber(min_component, max_component);
        switch(complexity)
        {
            case 1:
                total = a + b;
                text = `${a} + ${b}`;
                if (b < 0)
                {
                    text = `${a} - ${b * -1}`;
                }
                break;
            case 2:
                total = a * b;
                text = `${a} * ${b}`;
                break;
            case 3:
                total = a * (b + c);
                text = `${a} ( ${b} + ${c} )`;
                if (c < 0)
                {
                    text = `${a} ( ${b} - ${c * -1} )`;
                }
                break;
            case 4:
                total = a * (b + c) + d;
                text = `${a} ( ${b} + ${c} )`;
                if (c < 0)
                {
                    text = `${a} ( ${b} - ${c * -1} )`;
                }

                if(d >= 0)
                {
                    text += ` + ${d}`;
                }
                else
                {
                    text += ` - ${d * -1}`;
                }
                break;
            case 5:
                total = a * (b + c) + d * e;
                text = `${a} ( ${b} + ${c} )`;
                if (c < 0)
                {
                    text = `${a} ( ${b} - ${c * -1} )`;
                }

                if(d >= 0)
                {
                    text += ` + ${d}`;
                }
                else
                {
                    text += ` - ${d * -1}`;
                }

                text += ` ( ${e} )`
                break;
            case 6:
                total = a * (b + c) + d * (e + f);
                text = `${a} ( ${b} + ${c} )`
                if (c < 0)
                {
                    text = `${a} ( ${b} - ${c * -1} )`
                }

                if (d >= 0)
                {
                    text += ` + ${d}`
                }
                else
                {
                    text += ` - ${d * -1}`     
                }

                let text_a =  ` ( ${e} + ${f} )`;
                if (f < 0)
                {
                    text_a =  ` ( ${e} - ${f * -1} )`;
                }

                text += text_a
                break;
            default:
                total = a;
                text = `${a}`;
        }
        console.log("loop");
    }    
    while(total > max_total || total < min_total);

    return [total, text];
}

function pickNumber(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min);
}

function gifPicker(good) // Load celebratory gif or better luck next time giff
{
    if(good)
    {
        return "../images/gifs/good/" + gifPicker_good() + ".gif";
    }
    return "../images/gifs/bad/" + gifPicker_bad() + ".gif";
}

function gifPicker_good()
{
    const goodGifs = ["lisa-simpson","yes-girl","yes-thor","kim-hug","tony-fab","ms-marvel"];
    let gif = "";
    do
    {
        gif = goodGifs[pickNumber(0,goodGifs.length - 1)];
    }
    while(gif == lastGif);
    lastGif = gif;
    return gif;
}

function gifPicker_bad()
{
    const badGifs = ["doh","oh-no-girl","dwight","ugh-no","spiderman-no","pbs-soccer-fail"];
    let gif = "";
    do
    {
        gif = badGifs[pickNumber(0,badGifs.length - 1)];
    }
    while(gif == lastGif);
    lastGif = gif;
    return gif;
}