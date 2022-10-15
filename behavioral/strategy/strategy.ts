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
 * La interfaz Strategy declara operaciones comunes a todas las versiones
 * comunes de algún algoritmo.
 */
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
 * El Context define la interfaz de interes al cliente.
 */
class Context {
  /**
   * @type {Strategy} El Context mantiene una referencia a uno de
   * los objetos Strategy. El Context no conoce la clase en concreto
   * de un Strategy. Deberia funcionar con todas las estrategias via
   * la interfaz Strategy.
   */
  private strategy: Strategy;

  /**
   * Usualmente, el Context acepta una estrategia a traves del constructor,
   * pero tambien proporciona un setter para cambiar en tiempo de ejecución.
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * Usualmente, el Contexto permite reemplazar un objeto Strategy en tiempo
   * de ejecución.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * El Context delega parte del trabajo al objeto Strategy en lugar de
   * implementar múltiple versiones del algoritmo por sí solo.
   */
  public doSomeBusinessLogic(): void {
    const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
    console.log(result);
  }
}

/**
 * Las Estrategias concretas implementan el algoritmo mientras siguen la
 * interfaz de Strategy base. La interfaz los hace intercambiable en el Context.
 */
class ConcreteStrategyA implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

// Ejecutando Strategy

const context = new Context(new ConcreteStrategyA());
console.log("Strategy se ordena normalmente.");
context.doSomeBusinessLogic();

context.setStrategy(new ConcreteStrategyB());
console.log("Strategy se ordena a la inversa.");
context.doSomeBusinessLogic();
