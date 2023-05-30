import axios from "axios";

import React, { useState } from "react";
import { saveAs } from 'file-saver';
import "./WaifuCreation.css";

export default function WaifuCreation() {

    const [prompt, updatePrompt] = useState();
    const [image, updateImage] = useState();
    const [steps, updateSteps] = useState(5);

    

    async function generateWaifu() {
        updateImage(null);
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt + steps}`);
        updateImage(result.data);
    }

    function downloadImage() {
        saveAs(`data:image/png;base64,${image}`, 'waifu.png')
    }
    

    return (
        <div>
            <h2>Infini-Waifu</h2>
        <div class="purchase">
            <div class="shirtConstruct">
                <div class="canvas">
                    <img class="shirtElem" src="1638427112t-shirt-png.webp" width="500px"/>
                    {
                    image ? (
                        <div>
                            <img class="waifuElem" src={`data:image/png;base64,${image}`}/>
                        </div>
                    ) : 
                    <div>
                        <img class="loadElem" src="loading.gif" width="40%"/>
                    </div>
                    }
                </div>
                
            </div>
            <div class="arguments">
                <h3>Unlimited Anime Women</h3>

                <textarea spellCheck="false" placeholder="describe your waifu" wrap="on" rows={3} onChange={(e) => updatePrompt(e.target.value) } maxLength={60} class=""/>
                <p>so you want a {prompt} waifu?</p>
                <div class="steps">
                    <input type="range" min="1" max="9" value={steps} onChange={(e) => updateSteps(e.target.value)}></input>
                    <p>in {steps} steps</p>
                </div>
                <button class="button-30" role="button" onClick={generateWaifu}>Generate</button>
                <div class="break"></div>
                <button class="button-30" role="button" onClick={downloadImage}>Buy!</button>
            </div>
        </div>
        </div>
    )

} 