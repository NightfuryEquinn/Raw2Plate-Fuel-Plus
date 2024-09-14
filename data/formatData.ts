export const capitalizeWords = ( word: string ) => {
  return word
    .toLowerCase() 
    .split( ' ' ) 
    .map( ( text ) => text.charAt( 0 ).toUpperCase() + text.slice( 1 ) ) 
    .join( ' ' )
}