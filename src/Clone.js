class Clone {

  constructor( source ){
    this.bufferSource = [];
    this.bufferTarget = [];
  }

  dup( source ){
    try{
      switch( true ){
        case ( source == null || typeof source != `object` ): return source;
        case ( source instanceof RegExp ):                    return new RegExp( source );
        case ( source instanceof Date ):                      return new Date( source );
        case ( source instanceof Array ):                     return this.dupArray( source );
        case ( source instanceof Object ):                    return this.dupObject( source );
      }
    }catch( e ){
      console.warn( `JS.Clone: object ${ source.constructor.name } was not cloned` );
      return source;
    }
  }

  duplicate( source, target, dupPropsMethod ){
    let index = this.bufferSource.indexOf( source );
    if( index >= 0 ) return this.bufferTarget[ index ];
    this.bufferSource.push( source );
    this.bufferTarget.push( target );
    this[ dupPropsMethod ]( source, target );
    return target;
  }

  dupArray( source ){
    return this.duplicate( source, [], `dupArrayProps` );
  }

  dupObject( source ){
    return this.duplicate( source, new source.constructor(), `dupObjectProps` );
  }

  dupArrayProps( source, target ){
    for( let i = 0, l = source.length; i < l; i++ ) target[i] = this.dup( source[i] );
    return target;
  }

  dupObjectProps( source, target ){
    for( let attr in source ) if( source.hasOwnProperty( attr ) ) target[ attr ] = this.dup( source[ attr ] );
    return target;
  }

}


export default function( source ){
  return ( new Clone ).dup( source );
}
