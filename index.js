import bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import ed25519 from "ed25519-hd-key";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("server is working");
})

app.use('/nemo', (req,res)=>{
    if(req.body.mnemonic == 1){
        const mnemonic = bip39.generateMnemonic();
        res.send({mnemonic});
    }
})

app.use('/api', (req, res)=>{   
    if(req.body.choice == "create") {
        console.log("inside if");
        const keys = [];
        const rootSeed = bip39.mnemonicToSeedSync(req.body.mnemonic);
        let i = req.body.count;
            const derivationPath = `m/44'/501'/${i}'/0'`;
            const derivedSeed = ed25519.derivePath(derivationPath, rootSeed.toString("hex")).key;
            const keyPair = Keypair.fromSeed(derivedSeed);
            keys.push(keyPair);
            i = i+1;
        const pKey = Buffer.from(keys[0]._keypair.publicKey).toString('hex');
        const sKey = Buffer.from(keys[0]._keypair.secretKey).toString('hex');
        
        res.send({pKey, sKey, i});
    }
    else{
        console.log("inside else");
        const keys = [];
        const mnemonic = req.body.mnemonic;
        const rootSeed = bip39.mnemonicToSeedSync(mnemonic);
        let i = req.body.count;
        for(let j=i; j<i+4; j++){
            const derivationPath = `m/44'/501'/${j}'/0'`;
            const derivedSeed = ed25519.derivePath(derivationPath, rootSeed.toString("hex")).key;
            const keyPair = Keypair.fromSeed(derivedSeed);
            let pKey = Buffer.from(keyPair._keypair.publicKey).toString('hex');
            let sKey = Buffer.from(keyPair._keypair.secretKey).toString('hex');
            keys.push({pKey, sKey, j });
        }
        res.send(keys);
    }

})
app.listen(3000);
