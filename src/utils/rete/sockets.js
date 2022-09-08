import Rete from "rete";

export var booleanSocket = new Rete.Socket("Boolean value");
export var numSocket = new Rete.Socket("Number value");
export var floatSocket = new Rete.Socket("Float value");
export var stringSocket = new Rete.Socket("String value");
export var arraySocket = new Rete.Socket("Array value");
export var anyTypeSocket = new Rete.Socket("Any type");
booleanSocket.combineWith(anyTypeSocket);
numSocket.combineWith(anyTypeSocket);
floatSocket.combineWith(anyTypeSocket);
stringSocket.combineWith(anyTypeSocket);
arraySocket.combineWith(anyTypeSocket);
anyTypeSocket.combineWith(booleanSocket);
anyTypeSocket.combineWith(numSocket);
anyTypeSocket.combineWith(floatSocket);
anyTypeSocket.combineWith(stringSocket);
anyTypeSocket.combineWith(arraySocket);
