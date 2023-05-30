import {
  Input,
  Button,
  Stack, 
  Image,
  Center,
  
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { saveAs } from 'file-saver';

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  const downloadImage = () => {
    saveAs(`data:image/png;base64,${image}`, 'waifu.png') // Put your image url here.
  }

  const compileShirt = () => {
    
  }

  return (
      <div>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        
        {loading ? (
          <Stack>
            
          </Stack>
        ) : image ? (
          <Center>
            <div id="ImageWrapper">
              <Image src="1638427112t-shirt-png.webp" width="40px"/>
              <Image src={`data:image/png;base64,${image}`} boxShadow="lg" style={{ marginTop: "-400px", width: "80%" }}/>
            <Button onClick={downloadImage} marginTop={"30px"}>Download!</Button>
            </div>
          </Center>
          
        ) : null}
      </div>
  );
};

export default App;