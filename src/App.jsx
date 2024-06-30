import { useState } from 'react';
import './App.css';

import { AssetManager } from "./api/asset/AssetManager"

function App() {
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");

    const NitroManager = new AssetManager();

    const handleNitroFile = async (e) => {
        const uploadedFile = e.target.files[0];

        if (uploadedFile) {
            try {
                const result = await NitroManager.downloadAsset(uploadedFile);
                const fileName  = uploadedFile.name.replace('.nitro', '');
                if(result) {
                    const collection = NitroManager.getCollection(fileName);
                    setImage(collection.baseTexture.resource.url)
                }
            } catch (err) {
                console.error('Error downloading asset:', err);
            }
        }

        setFile('')
    };

    return (
        <>
            <div>
                <input type='file' onChange={handleNitroFile} value={ file } accept='.nitro'/>
                <br/>
                <img src={ image } />
            </div>
        </>
    );
}

export default App;
