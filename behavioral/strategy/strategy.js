/**
 * Strategy es un patrón de diseño de comportamiento que convierte un grupo
 * de comportamientos en objetos y los hace intercambiables dentro del objeto
 * de contexto original.
 *
 * El objeto original, llamado contexto, contiene una referencia a un objeto de
 * estrategia y le delega la ejecución del comportamiento. Para cambiar la forma
 * en que el contexto realiza su trabajo, otros objetos pueden sustituir el
 * objeto de estrategia actualmente vinculado, por otro.
 */
/**
 * El Context define la interfaz de interes al cliente.
 */
var Context = /** @class */ (function () {
    /**
     * Usualmente, el Context acepta una estrategia a traves del constructor,
     * pero tambien proporciona un setter para cambiar en tiempo de ejecución.
     */
    function Context(strategy) {
        this.strategy = strategy;
    }
    /**
     * Usualmente, el Contexto permite reemplazar un objeto Strategy en tiempo
     * de ejecución.
     */
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    /**
     * El Context delega parte del trabajo al objeto Strategy en lugar de
     * implementar múltiple versiones del algoritmo por sí solo.
     */
    Context.prototype.doSomeBusinessLogic = function () {
        var result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
        console.log(result);
    };
    return Context;
}());
/**
 * Las Estrategias concretas implementan el algoritmo mientras siguen la
 * interfaz de Strategy base. La interfaz los hace intercambiable en el Context.
 */
var ConcreteStrategyA = /** @class */ (function () {
    function ConcreteStrategyA() {
    }
    ConcreteStrategyA.prototype.doAlgorithm = function (data) {
        return data.sort();
    };
    return ConcreteStrategyA;
}());
var ConcreteStrategyB = /** @class */ (function () {
    function ConcreteStrategyB() {
    }
    ConcreteStrategyB.prototype.doAlgorithm = function (data) {
        return data.reverse();
    };
    return ConcreteStrategyB;
}());
// Ejecutando Strategy
var context = new Context(new ConcreteStrategyA());
console.log("Strategy se ordena normalmente.");
context.doSomeBusinessLogic();
context.setStrategy(new ConcreteStrategyB());
console.log("Strategy se ordena a la inversa.");
context.doSomeBusinessLogic();
