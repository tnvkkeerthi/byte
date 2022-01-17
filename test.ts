interface Audi {
    drive: () => void;
  }
  
  interface Bmw {
    race: () => void;
  }
  
  const isAudi = (car: Audi | Bmw): car is Audi => {
    return (car as Audi).drive() !== undefined;
  };