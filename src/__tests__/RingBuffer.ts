import RingBuffer from "@code/RingBuffer";

test("RingBuffer", function () {
    const buffer = new RingBuffer<number>();
    let result = buffer.pop();
    console.log("Result: ", result);
    let peek = buffer.pop();
    console.log("Peek: ", peek);

    buffer.push(5);
    result = buffer.pop();
    console.log("Result: ", result);
    expect(result).toEqual(5);

    result = buffer.pop();
    console.log("Result: ", result);
    expect(result).toEqual(undefined);

    buffer.push(42);
    buffer.push(9);

    result = buffer.pop();
    console.log("Result: ", result);
    expect(result).toEqual(42);

    result = buffer.pop();
    console.log("Result: ", result);
    expect(result).toEqual(9);

    result = buffer.pop();
    console.log("Result: ", result);
    expect(result).toEqual(undefined);

    buffer.push(42);
    buffer.push(9);
    buffer.push(12);
    
    peek = buffer.get(2);
    console.log("Peek: ", peek);
    expect(peek).toEqual(12);
    
    peek = buffer.get(1);
    console.log("Peek: ", peek);
    expect(peek).toEqual(9);
    
    peek = buffer.get(0);
    console.log("Peek: ", peek);
    expect(peek).toEqual(42);


    buffer.push(38);
    buffer.push(340);
    buffer.push(6);
    console.log(buffer)

    peek = buffer.get(0);
    console.log("Peek: ", peek);
    expect(peek).toEqual(42);
    
    peek = buffer.get(1);
    console.log("Peek: ", peek);
    expect(peek).toEqual(9);
    
    peek = buffer.get(2);
    console.log("Peek: ", peek);
    expect(peek).toEqual(12);
    
    peek = buffer.get(3);
    console.log("Peek: ", peek);
    expect(peek).toEqual(38);
    
    peek = buffer.get(4);
    console.log("Peek: ", peek);
    expect(peek).toEqual(340);
    
    peek = buffer.get(5);
    console.log("Peek: ", peek);
    expect(peek).toEqual(6);

});


