export function encrypt(text, shift) {
  let result = "";

  //loop through each caharacter in the text
  for (let i = 0; i < text.length; i++) {
        
      //get the character code of each letter
      let c = text.charCodeAt(i);
      // handle uppercase letters
      if(c >= 65 && c <=  90) {
          result += String.fromCharCode((c - 65 + shift) % 26 + 65); 

      // handle lowercase letters
      } else if(c >= 97 && c <= 122){
          result += String.fromCharCode((c - 97 + shift) % 26 + 97);

      // its not a letter, let it through
      } else {
          result += text.charAt(i);
      }

      console.log(result)
  }
  return result;
}

export function decrypt(text,shift){
  if(!shift) {
    return
  }
  console.log('decrypting... ', text, 'with shift:', shift)
  let result = "";
  shift = (26 - shift) % 26;
  console.log('shifting...', shift)
  result = encrypt(text,shift);
  return result;
}   