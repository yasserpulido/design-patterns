/**
 * Observer (observador) es un patrón de diseño de comportamiento que permite
 * a un objeto notificar a otros objetos sobre cambios en su estado.
 *
 * El patrón Observer (observador) proporciona una forma de suscribirse y cancelar
 * la subscripción a estos eventos para cualquier objeto que
 * implementa una interfaz suscriptora.
 */

/**
 * La interfaz del Subject (sujeto) declara un conjunto de metodos para
 * manipular los subscriptores.
 */
interface Subject {
  // Adjunto un observador al Subject (sujeto).
  attach(observer: Observer): void;

  // Separa a un observador del Subject (sujeto).
  detach(observer: Observer): void;

  // Notifica a todos los observadores acerca de un evento.
  notify(): void;
}

/**
 * El Subject (sujeto) posee algún importante estado y notifica a los observadores
 * cuando el estado cambia.
 */
class ConcreteSubject implements Subject {
  /**
   * @type {number} Por el bien de la simplicidad, el estado del Subject (sujeto),
   * esencial para todos los subcriptores, es almacenado en esta variable.
   */
  public state: number;

  /**
   * @type {Observer[]} Lista de subscriptores. En la vida real, la lista
   * de subscriptores pueden ser almacenados mas comprensivamente (categorizado
   * por el tipo de evento, etc.).
   */
  private observers: Observer[] = [];

  /**
   * Los métodos de gestón de subscripciones.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);

    if (isExist) {
      return console.log("Subject (sujeto): observador ya fue adjunto.");
    }

    console.log("Subject (sujeto): observador adjuntado.");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1) {
      return console.log("Subject (sujeto): observador no existe.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject (sujeto): observador removido.");
  }

  /**
   * Dispara una actualizaciòn en cada subscriptor.
   */
  public notify(): void {
    console.log("Subject (sujeto): notificando observadores.");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * Usualmente, la lógica de subscripción es solo una fracción de qué
   * un Subject (sujeto) puede realmente hacer. Subjects (sujetos) communmente mantiene
   * algunas importantes lógica de negocio, que activa un método de
   * notificación cada vez que algo importante está a punto de suceder
   * (o después).
   */
  public someBusinessLogic(): void {
    console.log("Subject (sujeto): hago algo importante.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject (sujeto): mi estado ha cambiado a: ${this.state}`);
    this.notify();
  }
}

interface Observer {
  // Recibe actualización desde subject (sujeto).
  update(subject: Subject): void;
}

/**
 * Concrete Observers reaccionan a las actualizaciones emitidas
 * por el Subject (sujeto) al que se habían adjuntado.
 */
class ConcreteObserverA implements Observer {
  update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: reacciona a un evento.");
    }
  }
}

class ConcreteObserverB implements Observer {
  update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: reacciona a un evento.");
    }
  }
}

// Ejecutando Observer

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
