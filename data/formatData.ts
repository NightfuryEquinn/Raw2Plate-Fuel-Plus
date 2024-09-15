export const capitalizeWords = ( word: string ) => {
  if ( word ) {
    return word
      .toLowerCase() 
      .split( ' ' ) 
      .map( ( text ) => text.charAt( 0 ).toUpperCase() + text.slice( 1 ) ) 
      .join( ' ' )
  }

  return ""
}