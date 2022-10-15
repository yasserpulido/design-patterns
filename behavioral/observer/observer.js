/**
 * Observer (observador) es un patrón de diseño de comportamiento que permite
 * a un objeto notificar a otros objetos sobre cambios en su estado.
 *
 * El patrón Observer (observador) proporciona una forma de suscribirse y cancelar
 * la subscripción a estos eventos para cualquier objeto que
 * implementa una interfaz suscriptora.
 */
/**
 * El Subject (sujeto) posee algún importante estado y notifica a los observadores
 * cuando el estado cambia.
 */
var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        /**
         * @type {Observer[]} Lista de subscriptores. En la vida real, la lista
         * de subscriptores pueden ser almacenados mas comprensivamente (categorizado
         * por el tipo de evento, etc.).
         */
        this.observers = [];
    }
    /**
     * Los métodos de gestón de subscripciones.
     */
    ConcreteSubject.prototype.attach = function (observer) {
        var isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log("Subject (sujeto): observador ya fue adjunto.");
        }
        console.log("Subject (sujeto): observador adjuntado.");
        this.observers.push(observer);
    };
    ConcreteSubject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log("Subject (sujeto): observador no existe.");
        }
        this.observers.splice(observerIndex, 1);
        console.log("Subject (sujeto): observador removido.");
    };
    /**
     * Dispara una actualizaciòn en cada subscriptor.
     */
    ConcreteSubject.prototype.notify = function () {
        console.log("Subject (sujeto): notificando observadores.");
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    /**
     * Usualmente, la lógica de subscripción es solo una fracción de qué
     * un Subject (sujeto) puede realmente hacer. Subjects (sujetos) communmente mantiene
     * algunas importantes lógica de negocio, que activa un método de
     * notificación cada vez que algo importante está a punto de suceder
     * (o después).
     */
    ConcreteSubject.prototype.someBusinessLogic = function () {
        console.log("Subject (sujeto): hago algo importante.");
        this.state = Math.floor(Math.random() * (10 + 1));
        console.log("Subject (sujeto): mi estado ha cambiado a: ".concat(this.state));
        this.notify();
    };
    return ConcreteSubject;
}());
/**
 * Concrete Observers reaccionan a las actualizaciones emitidas
 * por el Subject (sujeto) al que se habían adjuntado.
 */
var ConcreteObserverA = /** @class */ (function () {
    function ConcreteObserverA() {
    }
    ConcreteObserverA.prototype.update = function (subject) {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log("ConcreteObserverA: reacciona a un evento.");
        }
    };
    return ConcreteObserverA;
}());
var ConcreteObserverB = /** @class */ (function () {
    function ConcreteObserverB() {
    }
    ConcreteObserverB.prototype.update = function (subject) {
        if (subject instanceof ConcreteSubject &&
            (subject.state === 0 || subject.state >= 2)) {
            console.log("ConcreteObserverB: reacciona a un evento.");
        }
    };
    return ConcreteObserverB;
}());
// Ejecutando Observer
var subject = new ConcreteSubject();
var observer1 = new ConcreteObserverA();
subject.attach(observer1);
var observer2 = new ConcreteObserverB();
subject.attach(observer2);
subject.someBusinessLogic();
subject.someBusinessLogic();
subject.detach(observer2);
subject.someBusinessLogic();
