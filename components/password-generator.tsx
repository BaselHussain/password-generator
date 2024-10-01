"use client";
import { useState, ChangeEvent } from "react";
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button"

export default function GeneratePasswordComponent() {

const [length,setLength]=useState<number>(16)
const [includeUpperCase,setIncludeUpperCase]=useState<boolean>(true)
const [includeLowerrCase,setIncludeLowerCase]=useState<boolean>(true)
const [includeNumber,setIncludeNumber]=useState<boolean>(true)
const [includeSymbols,setIncludeSymbols]=useState<boolean>(true)
const [password,setPassword]=useState<string>("")


const handleLengthChange=(e:ChangeEvent<HTMLInputElement>)=>{
setLength(Number(e.target.value))
}

const handleCheckBoxChange=
(setter:(value:boolean)=>void)=>
    (checked:CheckedState):void=>{
if(typeof checked==="boolean"){
    setter(checked)
}
    }
    const generatePassword = (): void => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

let allChars=""
if(includeUpperCase) allChars+=uppercaseChars
if(includeLowerrCase ) allChars+=lowercaseChars
if(includeNumber) allChars+=numberChars
if(includeSymbols) allChars+=symbolChars
if(allChars===""){
    alert("Please select atleast one character")
}
let generatedPassword=""
for(let i=0;i<length;i++){
    const randomIndex=Math.floor(Math.random()*allChars.length)
    generatedPassword+=allChars[randomIndex]
}
     setPassword(generatedPassword)   
    }


    const copyToClipboard=()=>{
        navigator.clipboard.writeText(password).then(
            ()=>{
                alert("Password copied successfully.")
            },(err)=>{
                alert("Failed to copy password to clipboard.")
            }
        )
    }

return(
    <>
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#3636ff] to-[#96af09]">
<Card className="p-5 space-y-3 w-full max-w-md">
    <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">Password Generator</CardTitle>
        <CardDescription className=" text-center">Create a secure password with just avfew clicks</CardDescription>
    </CardHeader>
<CardContent className="space-y-4">
<div className="space-y-1">
    <Label htmlFor="length" className="font-bold">Password Length</Label>
   <Input
   id="length"
   type="number"
   min="8"
   max="32"
   value={length}
   onChange={handleLengthChange}
   className="focus:outline-none  border-2 border-black"
   />
</div>



<div className="space-y-2">
    <Label className="font-bold">Include:</Label>
    <div className="flex gap-2">
<Checkbox
id="uppercase"
checked={includeUpperCase}
onCheckedChange={handleCheckBoxChange(setIncludeUpperCase)}
/>
<Label>Uppercase letters</Label>
</div>
<div className="flex gap-2">
<Checkbox
id="lowercase"
checked={includeLowerrCase}
onCheckedChange={handleCheckBoxChange(setIncludeLowerCase)}
/>
<Label>Lowercase letters</Label>
</div>
<div className="flex gap-2">
<Checkbox
id="uppercase"
checked={includeNumber}
onCheckedChange={handleCheckBoxChange(setIncludeNumber)}
/>
<Label>Numbers</Label>
</div>
<div className="flex gap-2">
<Checkbox
id="uppercase"
checked={includeSymbols}
onCheckedChange={handleCheckBoxChange(setIncludeSymbols)}
/>
<Label>Symbols</Label>
</div>
</div>
<Button
onClick={generatePassword}
className="w-full rounded-xl font-bold">
    Generate Password
</Button>
<div className="space-y-1">
    <Label className="font-bold">Generated Password</Label>
    <div className="flex space-x-2">
    <Input
    readOnly
    className=" focus:outline-none  border-2 border-black"
    value={password}
    id="password"
    type="text"/>
    <Button
    className="rounded-xl"
    onClick={copyToClipboard}>
        Copy To Clipboard
    </Button>
    </div>
</div>
</CardContent>
</Card>
    </div>
    </>
)}