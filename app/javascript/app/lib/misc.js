export const classNames = function(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const CsrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export const titleize = (word)=> word.charAt(0).toUpperCase() + word.slice(1)

export const toSentence = (array_)=>{
  const array = [].concat(array_);
  if(array.length <= 1) return array[0];
  else if(array.length == 2) return array.join(", and ")
  else{
    const last_value = array.pop();
    return array.join(", ") + ", and " + last_value;
  }
}