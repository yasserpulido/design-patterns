/**
 * Singleton es un patrón de diseño creacional que nos
 * permite asegurarnos de que una clase tenga una única instancia,
 * a la vez que proporciona un punto de acceso global a dicha instancia.
 */

/**
 * La clase Singleton define los métodos "getInstance" que permite a los clientes
 * acceder a una única instancia singleton.
 */

class Singleton {
  private static instance: Singleton;

  /**
   * El constructor deberia siempre ser privado para prevenir
   * directamente la construcción llamando con el operador "new".
   */
  private constructor() {}

  /**
   * El método estático que controla el acceso a la instancia singleton.
   *
   * Esta implementación permite subclasificar la clase Singleton mientras
   * mantiene solo una instancia de cada subclase.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

// Ejecutando Singleton

function executeSingleton() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log(
      "Singleton funciona, ambas variables contienen la misma instancia."
    );
  } else {
    console.log(
      "Singleton no funciona, ambas variables contienen diferentes instancias."
    );
  }
}

executeSingleton();
