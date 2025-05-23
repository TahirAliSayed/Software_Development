
const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const gridGallery = document.querySelector(".gallery-grid");


const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");

//Check for system preference or saved theme
(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark").matches;
    const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    document.body.classList.toggle("dark-theme", isDarkTheme);
    themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

//switch bw light and dark themes
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
    themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon"; 
};

themeToggle.addEventListener("click",toggleTheme);

//Random prompts

const setRandom = () => {
        const egPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
        promptInput.value = egPrompt;
        promptInput.focus();

}

promptBtn.addEventListener("click",setRandom);



//Handle Form Submission

const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedModel = modelSelect.value;
    const selectedCount = parseInt(countSelect.value) || 1;
    const selectedRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();
    console.log(selectedModel, selectedCount, selectedRatio, promptText);   
    generateImages(selectedModel, selectedCount, selectedRatio, promptText);
}

promptForm.addEventListener("submit",handleFormSubmit);

//Generate Image Cards
const generateImages = (selectedModel, selectedCount, selectedRatio, promptText) =>{
    gridGallery.innerHTML="";

    for(let i = 0;i <selectedCount; i++){
        gridGallery.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${selectedRatio}">
                    <div class="status-container">
                        <div class="spinner"></div>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p class="status-text">Generating...</p> 
                    </div>  
                </div>`;
    }
    generateImagesAI(selectedModel, selectedCount, selectedRatio, promptText);
};


//Calculate width/height based on selected Ratio
    const getImageDimensions = (selectedRatio, baseSize = 512) =>{
        const [width, height] = selectedRatio.split("/").map(Number);
        const scaleFactor = baseSize / Math.sqrt(width*height);

        let calcHeight = Math.round(height*scaleFactor);
        let calcWidth = Math.round(width*scaleFactor);
        //Ensure dimensions are multiples of 16(AI model requirememts)
        calcHeight = Math.floor(calcHeight/16)*16;
        calcWidth = Math.floor(calcWidth/16)*16;

        return{width: calcWidth, height:calcHeight};
    };
//Replace spinner with actual Image
const updateImageCard = (imgIndex, imgUrl) => {
    const imgCard = document.getElementById(`img-card-${imgIndex}`);
    if(!imgCard) return;
    imgCard.classList.remove("loading");
    imgCard.innerHTML = `<img src="${imgUrl}" class="result-img" />
                        <div class="img-overlay">
                            <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}.png>
                                <i class="fa-solid fa-download"></i>
                            </a>
                        </div>`;
};

//Send Request To hugging Face Api for image generation
const generateImagesAI = async (selectedModel,selectedCount,selectedRatio,promptText) =>{
    const MODEL_URL=`https://api-inference.huggingface.co/models/${selectedModel}`;
    const {width,height} = getImageDimensions(selectedRatio);

    //array of image generating promises
    const imagePromises = Array.from({length: selectedCount}, async(_, i ) =>{
        //send request to AI model API
        try{
        const response = await fetch(MODEL_URL,{
            headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
                "x-use-cache": "false",
			},
			method: "POST",
			body: JSON.stringify({
                inputs: promptText,
                parameters: {width,height},
                
            }),
        });
        if(!response.ok) throw new Error((await response.json())?.error);
        const result = await response.blob();
        updateImageCard(i, URL.createObjectURL(result));
        }
    catch(error){
        console.log("error");
    }
});
    await Promise.allSettled(imagePromises);
};


    

    









