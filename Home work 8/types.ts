export type TypedArrayConstructor =
    | Int8ArrayConstructor
    | Uint8ArrayConstructor
    | Int16ArrayConstructor
    | Uint16ArrayConstructor
    | Int32ArrayConstructor
    | Uint32ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor
    | BigInt64ArrayConstructor

export type TypedArray<p_constructor extends TypedArrayConstructor> = p_constructor extends Int8ArrayConstructor
    ? Int8Array
    : p_constructor extends Uint8ArrayConstructor
      ? Uint8Array
      : p_constructor extends Int16ArrayConstructor
        ? Int16Array
        : p_constructor extends Uint16ArrayConstructor
          ? Uint16Array
          : p_constructor extends Int32ArrayConstructor
            ? Int32Array
            : p_constructor extends Uint32ArrayConstructor
              ? Uint32Array
              : p_constructor extends Uint8ClampedArrayConstructor
                ? Uint8ClampedArray
                : p_constructor extends Float32ArrayConstructor
                  ? Float32Array
                  : p_constructor extends Float64ArrayConstructor
                    ? Float64Array
                    : p_constructor extends BigInt64ArrayConstructor
                      ? BigInt64Array
                      : Int8Array

export type Value<p_arrayConstructor> = p_arrayConstructor extends BigInt64ArrayConstructor ? bigint : number
